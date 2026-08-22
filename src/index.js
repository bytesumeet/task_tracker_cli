#!/usr/bin/env node
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";

const FILE_PATH = "task.json";
const logError = chalk.bold.red;

const STATUS_COLORS = {
	pending: chalk.gray,
	"in-progress": chalk.cyan,
	completed: chalk.green,
};

const loadTasks = () => {
	if (!fs.existsSync(FILE_PATH)) return [];
	try {
		const data = fs.readFileSync(FILE_PATH, "utf-8").trim();
		return data ? JSON.parse(data) : [];
	} catch (err) {
		console.error(logError("Failed to parse task.json. Correct file contents to avoid data loss."));
		process.exit(1);
	}
};

const saveTasks = (tasks) => {
	fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

const addTask = (task) => {
	if (!task) return console.log(logError("Please provide a task description."));
	const tasks = loadTasks();
	const newTask = { _id: uuidv4(), task, status: "pending" };
	saveTasks([...tasks, newTask]);
	console.log(chalk.green(`Task added successfully with ID: ${newTask._id}`));
};

const listTasks = (statusFilter) => {
	const tasks = loadTasks();
	if (!tasks.length) return console.log(chalk.bold.gray("No tasks found!"));

	if (statusFilter && !STATUS_COLORS[statusFilter]) {
		return console.log(logError(`Invalid status: ${statusFilter}`));
	}

	const filtered = statusFilter ? tasks.filter((t) => t.status === statusFilter) : tasks;
	if (!filtered.length) return console.log(chalk.bold.gray(`No tasks found with status: ${statusFilter}`));

	filtered.forEach((t) => {
		const colorFn = STATUS_COLORS[t.status] || chalk.white;
		console.log(`${t._id} || ${t.task} || ${colorFn(t.status)}`);
	});
};

const deleteTask = (id) => {
	const tasks = loadTasks();
	const updated = tasks.filter((t) => t._id !== id);
	if (tasks.length === updated.length) return console.log(logError(`No task found with ID: ${id}`));

	saveTasks(updated);
	console.log(chalk.green(`Task deleted successfully with ID: ${id}`));
};

const updateTask = (id, taskDescription, status) => {
	if (!id) return console.log(logError("Task ID is required."));
	const tasks = loadTasks();
	const taskIndex = tasks.findIndex((t) => t._id === id);

	if (taskIndex === -1) return console.log(logError(`No task found with ID: ${id}`));
	if (status && !STATUS_COLORS[status]) return console.log(logError(`Invalid status: ${status}`));

	if (taskDescription) tasks[taskIndex].task = taskDescription;
	if (status) tasks[taskIndex].status = status;

	saveTasks(tasks);
	console.log(chalk.green(`Task updated successfully with ID: ${id}`));
};

const [,, command, arg1, arg2] = process.argv;

switch (command) {
	case "add": addTask(arg1); break;
	case "list": listTasks(arg1); break;
	case "delete": deleteTask(arg1); break;
	case "update": updateTask(arg1, arg2); break;
	case "mark-in-progress": updateTask(arg1, null, "in-progress"); break;
	case "mark-done": updateTask(arg1, null, "completed"); break;
	default: console.log(logError(`Invalid or missing command: ${command || "none"}`));
}