import type { RequestHandler } from 'express';
import { publishExternalStoryContent } from '../liveCollaboration.js';
import { asyncHandler } from '../helpers/asyncHandler.js';
import { HttpError } from '../helpers/httpError.js';
import { requireId, requireText } from '../helpers/validation.js';
import {
  canEditStory,
  createStory,
  deleteStory,
  getStoryAuthorId,
  getStoriesForUser,
  updateStory,
} from '../models/storyModel.js';

export const listStories: RequestHandler = asyncHandler(async (request, response) => {
  response.json(await getStoriesForUser(request.user!.id));
});

export const createStoryController: RequestHandler = asyncHandler(async (request, response) => {
  const title = requireText(request.body?.title, 'Title', 255);
  const content = requireText(request.body?.content, 'Content', 100_000);
  const story = await createStory(title, content, request.user!.id);
  response.status(201).json(story);
});

export const updateStoryController: RequestHandler = asyncHandler(async (request, response) => {
  const storyId = requireId(request.params.id);
  const existingAuthorId = await getStoryAuthorId(storyId);
  if (!existingAuthorId) throw new HttpError(404, 'Story not found.');
  if (!(await canEditStory(storyId, request.user!.id))) {
    throw new HttpError(403, 'You are not allowed to edit this story.');
  }

  const title = requireText(request.body?.title, 'Title', 255);
  const content = requireText(request.body?.content, 'Content', 100_000);
  const story = await updateStory(storyId, title, content);
  if (!story) throw new HttpError(404, 'Story not found.');
  await publishExternalStoryContent(story.id, story.content, story.updatedAt, {
    id: request.user!.id,
    username: request.user!.username,
  });
  response.json(story);
});

export const deleteStoryController: RequestHandler = asyncHandler(async (request, response) => {
  const storyId = requireId(request.params.id);
  const authorId = await getStoryAuthorId(storyId);
  if (!authorId) throw new HttpError(404, 'Story not found.');
  if (authorId !== request.user!.id) {
    throw new HttpError(403, 'Only the story author can delete this story.');
  }
  await deleteStory(storyId);
  response.status(204).end();
});
