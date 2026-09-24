import { TodoList } from "./todo.js";

const todoList = new TodoList();
todoList.addTask("Study Node.js modules");
todoList.addTask("Practice the fs module");
todoList.addTask("Review npm packages");
todoList.completeTask(1);

console.log(todoList.listTasks().join("\n"));
