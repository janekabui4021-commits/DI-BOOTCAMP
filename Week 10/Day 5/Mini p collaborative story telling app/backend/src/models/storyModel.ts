import type { Contributor, Story, StoryComment, User } from '@fable/types';
import { pool } from '../db/pool.js';

interface StoryRow {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_username: string;
  author_email: string;
  created_at: Date;
  updated_at: Date;
}

interface ContributorRow {
  contributor_id: number;
  user_id: number;
  username: string;
  email: string;
}

interface CommentRow {
  id: number;
  story_id: number;
  content: string;
  author_id: number;
  author_username: string;
  author_email: string;
  created_at: Date;
}

function mapStory(
  row: StoryRow,
  contributors: Contributor[] = [],
  comments: StoryComment[] = [],
): Story {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    author: { id: row.author_id, username: row.author_username, email: row.author_email },
    contributors,
    comments,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

async function getCommentsForStories(storyIds: number[]): Promise<Map<number, StoryComment[]>> {
  const result = await pool.query<CommentRow>(
    `SELECT c.id, c.story_id, c.content, c.created_at,
       u.id AS author_id, u.username AS author_username, u.email AS author_email
     FROM comments c JOIN users u ON u.id = c.author_id
     WHERE c.story_id = ANY($1::int[])
     ORDER BY c.created_at`,
    [storyIds],
  );
  const commentsByStory = new Map<number, StoryComment[]>();
  for (const row of result.rows) {
    const comments = commentsByStory.get(row.story_id) ?? [];
    comments.push({
      id: row.id,
      content: row.content,
      author: { id: row.author_id, username: row.author_username, email: row.author_email },
      createdAt: row.created_at.toISOString(),
    });
    commentsByStory.set(row.story_id, comments);
  }
  return commentsByStory;
}

async function getContributorsForStories(storyIds: number[]): Promise<Map<number, Contributor[]>> {
  const result = await pool.query<ContributorRow>(
    `SELECT c.id AS contributor_id, u.id AS user_id, u.username, u.email, c.story_id
     FROM contributors c
     JOIN users u ON u.id = c.user_id
     WHERE c.story_id = ANY($1::int[])
     ORDER BY u.username`,
    [storyIds],
  );
  const contributors = new Map<number, Contributor[]>();
  for (const row of result.rows as (ContributorRow & { story_id: number })[]) {
    const list = contributors.get(row.story_id) ?? [];
    list.push({
      contributorId: row.contributor_id,
      id: row.user_id,
      username: row.username,
      email: row.email,
    });
    contributors.set(row.story_id, list);
  }
  return contributors;
}

const storySelect = `SELECT s.id, s.title, s.content, s.author_id,
  u.username AS author_username, u.email AS author_email, s.created_at, s.updated_at
  FROM stories s JOIN users u ON u.id = s.author_id`;

export async function getStoriesForUser(userId: number): Promise<Story[]> {
  const result = await pool.query<StoryRow>(
    `${storySelect}
     WHERE s.author_id = $1 OR EXISTS (
       SELECT 1 FROM contributors c WHERE c.story_id = s.id AND c.user_id = $1
     )
     ORDER BY s.updated_at DESC`,
    [userId],
  );
  const byStory = await getContributorsForStories(result.rows.map((story) => story.id));
  const comments = await getCommentsForStories(result.rows.map((story) => story.id));
  return result.rows.map((row) => mapStory(
    row,
    byStory.get(row.id) ?? [],
    comments.get(row.id) ?? [],
  ));
}

export async function getStoryById(id: number): Promise<Story | undefined> {
  const result = await pool.query<StoryRow>(`${storySelect} WHERE s.id = $1`, [id]);
  const row = result.rows[0];
  if (!row) return undefined;
  const byStory = await getContributorsForStories([id]);
  const comments = await getCommentsForStories([id]);
  return mapStory(row, byStory.get(id) ?? [], comments.get(id) ?? []);
}

export async function createStory(
  title: string,
  content: string,
  authorId: number,
): Promise<Story> {
  const result = await pool.query<StoryRow>(
    `WITH inserted AS (
       INSERT INTO stories (title, content, author_id)
       VALUES ($1, $2, $3)
       RETURNING *
     )
     SELECT inserted.id, inserted.title, inserted.content, inserted.author_id,
       u.username AS author_username, u.email AS author_email,
       inserted.created_at, inserted.updated_at
     FROM inserted JOIN users u ON u.id = inserted.author_id`,
    [title, content, authorId],
  );
  return mapStory(result.rows[0]!);
}

export async function updateStory(
  id: number,
  title: string,
  content: string,
): Promise<Story | undefined> {
  await pool.query(
    `UPDATE stories SET title = $2, content = $3, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [id, title, content],
  );
  return getStoryById(id);
}

export async function updateStoryContent(
  id: number,
  content: string,
): Promise<{ content: string; updatedAt: string } | undefined> {
  const result = await pool.query<{ content: string; updated_at: Date }>(
    `UPDATE stories SET content = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING content, updated_at`,
    [id, content],
  );
  const row = result.rows[0];
  if (!row) return undefined;
  return { content: row.content, updatedAt: row.updated_at.toISOString() };
}

export async function deleteStory(id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM stories WHERE id = $1 RETURNING id', [id]);
  return result.rowCount === 1;
}

export async function canEditStory(storyId: number, userId: number): Promise<boolean> {
  const result = await pool.query(
    `SELECT 1 FROM stories s WHERE s.id = $1 AND (
       s.author_id = $2 OR EXISTS (
         SELECT 1 FROM contributors c WHERE c.story_id = s.id AND c.user_id = $2
       )
     )`,
    [storyId, userId],
  );
  return result.rowCount === 1;
}

export async function addContributor(storyId: number, userId: number): Promise<Contributor | undefined> {
  const result = await pool.query<ContributorRow>(
    `INSERT INTO contributors (story_id, user_id)
     VALUES ($1, $2)
     ON CONFLICT (story_id, user_id) DO NOTHING
     RETURNING id AS contributor_id`,
    [storyId, userId],
  );
  const contributorId = result.rows[0]?.contributor_id;
  const contributor = await pool.query<User>(
    'SELECT id, username, email FROM users WHERE id = $1',
    [userId],
  );
  const user = contributor.rows[0];
  if (!user) return undefined;
  const existing = contributorId
    ? contributorId
    : await pool.query<{ id: number }>(
        'SELECT id FROM contributors WHERE story_id = $1 AND user_id = $2',
        [storyId, userId],
      ).then((query) => query.rows[0]?.id);
  return existing ? { ...user, contributorId: existing } : undefined;
}

export async function getContributors(storyId: number): Promise<Contributor[]> {
  const result = await pool.query<ContributorRow>(
    `SELECT c.id AS contributor_id, u.id AS user_id, u.username, u.email
     FROM contributors c JOIN users u ON u.id = c.user_id
     WHERE c.story_id = $1 ORDER BY u.username`,
    [storyId],
  );
  return result.rows.map((row) => ({
    contributorId: row.contributor_id,
    id: row.user_id,
    username: row.username,
    email: row.email,
  }));
}

export async function deleteContributor(contributorId: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM contributors WHERE id = $1 RETURNING id', [contributorId]);
  return result.rowCount === 1;
}

export async function isStoryAuthorForContributor(
  contributorId: number,
  userId: number,
): Promise<boolean> {
  const result = await pool.query(
    `SELECT 1 FROM contributors c JOIN stories s ON s.id = c.story_id
     WHERE c.id = $1 AND s.author_id = $2`,
    [contributorId, userId],
  );
  return result.rowCount === 1;
}

export async function getStoryAuthorId(storyId: number): Promise<number | undefined> {
  const result = await pool.query<{ author_id: number }>(
    'SELECT author_id FROM stories WHERE id = $1',
    [storyId],
  );
  return result.rows[0]?.author_id;
}

export async function createComment(
  storyId: number,
  authorId: number,
  content: string,
): Promise<StoryComment> {
  const result = await pool.query<{ id: number; content: string; created_at: Date }>(
    `INSERT INTO comments (story_id, author_id, content)
     VALUES ($1, $2, $3)
     RETURNING id, content, created_at`,
    [storyId, authorId, content],
  );
  const row = result.rows[0]!;
  const authorResult = await pool.query<User>(
    'SELECT id, username, email FROM users WHERE id = $1',
    [authorId],
  );
  const author = authorResult.rows[0];
  if (!author) throw new Error('Comment author no longer exists.');
  return {
    id: row.id,
    content: row.content,
    author,
    createdAt: row.created_at.toISOString(),
  };
}

export async function getCommentAuthorId(commentId: number): Promise<{
  authorId: number;
  storyId: number;
} | undefined> {
  const result = await pool.query<{ author_id: number; story_id: number }>(
    'SELECT author_id, story_id FROM comments WHERE id = $1',
    [commentId],
  );
  const row = result.rows[0];
  return row ? { authorId: row.author_id, storyId: row.story_id } : undefined;
}

export async function updateComment(commentId: number, content: string): Promise<StoryComment | undefined> {
  const result = await pool.query<CommentRow>(
    `UPDATE comments c SET content = $2
     FROM users u
     WHERE c.id = $1 AND u.id = c.author_id
     RETURNING c.id, c.story_id, c.content, c.created_at,
       u.id AS author_id, u.username AS author_username, u.email AS author_email`,
    [commentId, content],
  );
  const row = result.rows[0];
  return row ? {
    id: row.id,
    content: row.content,
    author: { id: row.author_id, username: row.author_username, email: row.author_email },
    createdAt: row.created_at.toISOString(),
  } : undefined;
}

export async function deleteComment(commentId: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING id', [commentId]);
  return result.rowCount === 1;
}
