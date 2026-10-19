export function todoReducer(todos, action) {
  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, text: action.text }];
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unknown todo action: ${action.type}`);
  }
}
