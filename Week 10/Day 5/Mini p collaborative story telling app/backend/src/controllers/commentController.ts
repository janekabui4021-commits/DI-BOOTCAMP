import type { RequestHandler } from 'express';
import { asyncHandler } from '../helpers/asyncHandler.js';
import { HttpError } from '../helpers/httpError.js';
import { requireId, requireText } from '../helpers/validation.js';
import {
  canEditStory,
  createComment,
  deleteComment,
  getCommentAuthorId,
  getStoryAuthorId,
  getStoryById,
  updateComment,
} from '../models/storyModel.js';

export const listCommentsController: RequestHandler = asyncHandler(async (request, response) => {
  const storyId = requireId(request.params.storyId);
  if (!(await canEditStory(storyId, request.user!.id))) {
    throw new HttpError(404, 'Story not found.');
  }
  const story = await getStoryById(storyId);
  if (!story) throw new HttpError(404, 'Story not found.');
  response.json(story.comments);
});

export const createCommentController: RequestHandler = asyncHandler(async (request, response) => {
  const storyId = requireId(request.params.storyId);
  if (!(await canEditStory(storyId, request.user!.id))) {
    throw new HttpError(404, 'Story not found.');
  }
  const content = requireText(request.body?.content, 'Comment', 2000);
  const comment = await createComment(storyId, request.user!.id, content);
  response.status(201).json(comment);
});

export const updateCommentController: RequestHandler = asyncHandler(async (request, response) => {
  const commentId = requireId(request.params.id);
  const comment = await getCommentAuthorId(commentId);
  if (!comment) throw new HttpError(404, 'Comment not found.');
  if (comment.authorId !== request.user!.id) {
    throw new HttpError(403, 'Only the comment author can edit this comment.');
  }
  const content = requireText(request.body?.content, 'Comment', 2000);
  const updated = await updateComment(commentId, content);
  if (!updated) throw new HttpError(404, 'Comment not found.');
  response.json(updated);
});

export const deleteCommentController: RequestHandler = asyncHandler(async (request, response) => {
  const commentId = requireId(request.params.id);
  const comment = await getCommentAuthorId(commentId);
  if (!comment) throw new HttpError(404, 'Comment not found.');
  const storyAuthorId = await getStoryAuthorId(comment.storyId);
  if (comment.authorId !== request.user!.id && storyAuthorId !== request.user!.id) {
    throw new HttpError(403, 'You are not allowed to delete this comment.');
  }
  await deleteComment(commentId);
  response.status(204).end();
});
