import type { RequestHandler } from 'express';
import { asyncHandler } from '../helpers/asyncHandler.js';
import { HttpError } from '../helpers/httpError.js';
import { requireId } from '../helpers/validation.js';
import { findUserById } from '../models/userModel.js';
import {
  addContributor,
  canEditStory,
  deleteContributor,
  getContributors,
  getStoryAuthorId,
  isStoryAuthorForContributor,
} from '../models/storyModel.js';

export const addContributorController: RequestHandler = asyncHandler(async (request, response) => {
  const storyId = requireId(String(request.body?.story_id ?? ''));
  const userId = requireId(String(request.body?.user_id ?? ''));
  const authorId = await getStoryAuthorId(storyId);
  if (!authorId) throw new HttpError(404, 'Story not found.');
  if (authorId !== request.user!.id) {
    throw new HttpError(403, 'Only the story author can invite contributors.');
  }
  if (userId === authorId) throw new HttpError(400, 'The story author is already a contributor.');
  if (!(await findUserById(userId))) throw new HttpError(404, 'User not found.');

  const contributor = await addContributor(storyId, userId);
  if (!contributor) throw new HttpError(500, 'The contributor could not be added.');
  response.status(201).json(contributor);
});

export const listContributorsController: RequestHandler = asyncHandler(async (request, response) => {
  const storyId = requireId(request.params.story_id);
  if (!(await getStoryAuthorId(storyId))) throw new HttpError(404, 'Story not found.');
  if (!(await canEditStory(storyId, request.user!.id))) {
    throw new HttpError(403, 'You are not allowed to view this story’s contributors.');
  }
  response.json(await getContributors(storyId));
});

export const deleteContributorController: RequestHandler = asyncHandler(async (request, response) => {
  const contributorId = requireId(request.params.id);
  if (!(await isStoryAuthorForContributor(contributorId, request.user!.id))) {
    throw new HttpError(403, 'Only the story author can remove this contributor.');
  }
  await deleteContributor(contributorId);
  response.status(204).end();
});
