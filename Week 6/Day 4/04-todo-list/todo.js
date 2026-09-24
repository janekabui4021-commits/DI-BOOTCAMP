export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ title: task, completed: false });
  }

  completeTask(taskNumber) {
    const task = this.tasks[taskNumber - 1];
    if (task) {
      task.completed = true;
    }
  }

  listTasks() {
    return this.tasks.map((task, index) => `${index + 1}. [${task.completed ? "x" : " "}] ${task.title}`);
  }
}
