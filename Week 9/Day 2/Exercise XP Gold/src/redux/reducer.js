import {
  ADD_CATEGORY,
  ADD_TODO,
  REMOVE_TODO,
  SELECT_CATEGORY,
  TOGGLE_TODO,
} from './actions.js';

export const initialState = {
  selectedCategoryId: 'work',
  nextCategoryId: 1,
  nextTodoId: 1,
  categories: [
    { id: 'work', name: 'Work', icon: '◷', todos: [] },
    { id: 'personal', name: 'Personal', icon: '♡', todos: [] },
    { id: 'learning', name: 'Learning', icon: '⌘', todos: [] },
    { id: 'shopping', name: 'Shopping', icon: '⌑', todos: [] },
  ],
};

export function categoryTodoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY: {
      const name = action.payload.trim();
      if (!name || state.categories.some(
        (category) => category.name.toLowerCase() === name.toLowerCase(),
      )) {
        return state;
      }

      const id = `category-${state.nextCategoryId}`;
      return {
        ...state,
        selectedCategoryId: id,
        nextCategoryId: state.nextCategoryId + 1,
        categories: [...state.categories, { id, name, icon: '✳', todos: [] }],
      };
    }

    case SELECT_CATEGORY:
      return state.categories.some((category) => category.id === action.payload)
        ? { ...state, selectedCategoryId: action.payload }
        : state;

    case ADD_TODO: {
      const { categoryId, text: rawText } = action.payload;
      const text = rawText.trim();
      const categoryExists = state.categories.some((category) => category.id === categoryId);
      if (!categoryExists || !text) return state;

      return {
        ...state,
        nextTodoId: state.nextTodoId + 1,
        categories: state.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                todos: [...category.todos, { id: state.nextTodoId, text, completed: false }],
              }
            : category,
        ),
      };
    }

    case TOGGLE_TODO: {
      const { categoryId, todoId } = action.payload;
      const category = state.categories.find((item) => item.id === categoryId);
      if (!category || !category.todos.some((todo) => todo.id === todoId)) return state;

      return {
        ...state,
        categories: state.categories.map((item) =>
          item.id === categoryId
            ? {
                ...item,
                todos: item.todos.map((todo) =>
                  todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
                ),
              }
            : item,
        ),
      };
    }

    case REMOVE_TODO: {
      const { categoryId, todoId } = action.payload;
      const category = state.categories.find((item) => item.id === categoryId);
      if (!category || !category.todos.some((todo) => todo.id === todoId)) return state;

      return {
        ...state,
        categories: state.categories.map((item) =>
          item.id === categoryId
            ? { ...item, todos: item.todos.filter((todo) => todo.id !== todoId) }
            : item,
        ),
      };
    }

    default:
      return state;
  }
}
