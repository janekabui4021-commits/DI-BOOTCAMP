const tasks = [];
let nextTaskId = 0;

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector(".listTasks");

taskForm.addEventListener("submit", (event) => {
	event.preventDefault();
	addTask();
});

function addTask() {
	const text = taskInput.value.trim();
	if (!text) return;

	const task = {
		task_id: nextTaskId,
		text,
		done: false,
	};

	nextTaskId += 1;
	tasks.push(task);
	renderTask(task);
	taskInput.value = "";
	taskInput.focus();
}

function renderTask(task) {
	const taskElement = document.createElement("article");
	taskElement.className = "task";
	taskElement.dataset.taskId = task.task_id;

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = task.done;
	checkbox.id = `task-${task.task_id}`;
	checkbox.addEventListener("change", () => doneTask(task.task_id));

	const label = document.createElement("label");
	label.htmlFor = checkbox.id;
	label.textContent = task.text;

	const deleteButton = document.createElement("button");
	deleteButton.type = "button";
	deleteButton.className = "delete-task";
	deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
	deleteButton.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
	deleteButton.addEventListener("click", () => deleteTask(task.task_id));

	taskElement.append(checkbox, label, deleteButton);
	taskList.append(taskElement);
}

function doneTask(taskId) {
	const task = tasks.find((item) => item.task_id === taskId);
	if (!task) return;

	task.done = !task.done;
	const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
	taskElement.classList.toggle("completed", task.done);
}

function deleteTask(taskId) {
	const taskIndex = tasks.findIndex((item) => item.task_id === taskId);
	if (taskIndex === -1) return;

	tasks.splice(taskIndex, 1);
	document.querySelector(`[data-task-id="${taskId}"]`).remove();
}
