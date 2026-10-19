export const ADD_CATEGORY = 'todos/addCategory';
export const SELECT_CATEGORY = 'todos/selectCategory';
export const ADD_TODO = 'todos/addTodo';
export const TOGGLE_TODO = 'todos/toggleTodo';
export const REMOVE_TODO = 'todos/removeTodo';

export const addCategory = (name) => ({
  type: ADD_CATEGORY,
  payload: name,
});

export const selectCategory = (categoryId) => ({
  type: SELECT_CATEGORY,
  payload: categoryId,
});

export const addTodo = (categoryId, text) => ({
  type: ADD_TODO,
  payload: { categoryId, text },
});

export const toggleTodo = (categoryId, todoId) => ({
  type: TOGGLE_TODO,
  payload: { categoryId, todoId },
});

export const removeTodo = (categoryId, todoId) => ({
  type: REMOVE_TODO,
  payload: { categoryId, todoId },
});
