import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actions.js';

export const initialState = {
  todos: [],
  nextId: 1,
};

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { id: state.nextId, text: action.payload, completed: false }],
        nextId: state.nextId + 1,
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}
