export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(title) {
    this.tasks.push({ title, completed: false });
  }

  completeTask(title) {
    const task = this.tasks.find((item) => item.title === title);
    if (task) task.completed = true;
  }

  listTasks() {
    return this.tasks;
  }
}
