import { TodoList } from './todo.js';

const todoList = new TodoList();
todoList.addTask('Read the Node.js documentation');
todoList.addTask('Practice modules');
todoList.addTask('Review file management');
todoList.completeTask('Practice modules');

for (const task of todoList.listTasks()) {
  console.log(`[${task.completed ? 'x' : ' '}] ${task.title}`);
}
