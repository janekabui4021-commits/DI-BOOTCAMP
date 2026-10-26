import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Story } from '@fable/types';

interface StoriesState {
  items: Story[];
  status: 'idle' | 'loading' | 'ready';
  error: string | null;
}

const initialState: StoriesState = {
  items: [],
  status: 'idle',
  error: null,
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    storiesLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    storiesLoaded(state, action: PayloadAction<Story[]>) {
      state.items = action.payload;
      state.status = 'ready';
      state.error = null;
    },
    storyUpserted(state, action: PayloadAction<Story>) {
      const index = state.items.findIndex((story) => story.id === action.payload.id);
      if (index < 0) state.items.unshift(action.payload);
      else state.items[index] = action.payload;
    },
    storyContentSynced(
      state,
      action: PayloadAction<{ storyId: number; content: string; updatedAt: string }>,
    ) {
      const story = state.items.find((item) => item.id === action.payload.storyId);
      if (story) {
        story.content = action.payload.content;
        story.updatedAt = action.payload.updatedAt;
      }
    },
    storyRemoved(state, action: PayloadAction<number>) {
      state.items = state.items.filter((story) => story.id !== action.payload);
    },
    storyContributorsUpdated(
      state,
      action: PayloadAction<{ storyId: number; contributors: Story['contributors'] }>,
    ) {
      const story = state.items.find((item) => item.id === action.payload.storyId);
      if (story) story.contributors = action.payload.contributors;
    },
    storyCommentAdded(
      state,
      action: PayloadAction<{ storyId: number; comment: Story['comments'][number] }>,
    ) {
      const story = state.items.find((item) => item.id === action.payload.storyId);
      if (story) story.comments.push(action.payload.comment);
    },
    storyCommentUpdated(
      state,
      action: PayloadAction<{ storyId: number; comment: Story['comments'][number] }>,
    ) {
      const story = state.items.find((item) => item.id === action.payload.storyId);
      const index = story?.comments.findIndex((item) => item.id === action.payload.comment.id) ?? -1;
      if (story && index >= 0) story.comments[index] = action.payload.comment;
    },
    storyCommentRemoved(state, action: PayloadAction<{ storyId: number; commentId: number }>) {
      const story = state.items.find((item) => item.id === action.payload.storyId);
      if (story) story.comments = story.comments.filter((item) => item.id !== action.payload.commentId);
    },
    storiesFailed(state, action: PayloadAction<string>) {
      state.status = 'ready';
      state.error = action.payload;
    },
  },
});

export const {
  storiesLoading,
  storiesLoaded,
  storyUpserted,
  storyContentSynced,
  storyRemoved,
  storyContributorsUpdated,
  storyCommentAdded,
  storyCommentUpdated,
  storyCommentRemoved,
  storiesFailed,
} = storiesSlice.actions;
export default storiesSlice.reducer;
