import { TaskModel, UpdateTaskModel } from "@/models/Tasks";
import { readTaskData, writeTaskData } from "@/lib/taskData";
import { _fetchProjectByUserId } from "./project.services";

function _createTask(id: number, title: string, description: string, group: number, assignedTo: string, userId: string) {
    const taskData = readTaskData();

    const project = _fetchProjectByUserId(userId);

    if (project === null) return null;

    const newTask: TaskModel = {
        id: id,
        title: title,
        description: description,
        group: group,
        assignedTo: assignedTo as "admin" | "approver" | "contributor" | "reviewer",
        status: group === 1 ? 'active' : 'pending',
        projectId: project.id,
    }

    taskData.tasks.push(newTask);

    writeTaskData(taskData);

    return newTask;
}

function _createTaskIfExists(id: number, title: string, description: string, group: number, assignedTo: string, userId: string) {
    const existingTask = _fetchTasksById(id);

    if (existingTask != null) _deleteTask(id);

    const newTask = _createTask(id, title, description, group, assignedTo, userId);
    return newTask
}

function _fetchTasks(status?: string) {
    const taskData = readTaskData();
    let tasks: TaskModel[] = [];

    if (!status) {
        tasks = taskData.tasks;
    } else {
        taskData.tasks.forEach((task: TaskModel) => {
            if (task.status === status) tasks.push(task);
        });
    }

    return tasks;
}

function _fetchTasksById(taskId: number) {
    const taskData = readTaskData();

    const taskIdx = taskData.tasks.findIndex((task: TaskModel) => task.id === taskId);

    if (taskIdx === -1) return null;

    return taskData.tasks[taskIdx];
}

function _fetchTasksByGroup(group: number) {
    const taskData = readTaskData();
    let tasks: TaskModel[] = [];

    for (var task of taskData.tasks) {
        if (task.group === group) tasks.push(task);
    }

    return tasks;
}

function _updateTask(taskId: number, updates: UpdateTaskModel) {
    const taskData = readTaskData();

    const taskIdx = taskData.tasks.findIndex((task: TaskModel) => task.id === taskId);

    if (taskIdx === -1) return null;

    const currentTask = taskData.tasks[taskIdx];
    const updatedTask: TaskModel = {
        id: currentTask.id,
        title: updates.title != undefined ? updates.title : currentTask.title,
        description: updates.description != undefined ? updates.description : currentTask.description,
        group: updates.group != undefined ? updates.group : currentTask.group,
        assignedTo: updates.assignedTo != undefined ? updates.assignedTo : currentTask.assignedTo,
        status: updates.status != undefined ? updates.status : currentTask.status,
        projectId: currentTask.projectId,
    }

    taskData.tasks[taskIdx] = updatedTask;
    writeTaskData(taskData);

    return updatedTask;
}

function _activateNextGroup(currentGroup: number) {
    const currentGroupTasks = _fetchTasksByGroup(currentGroup);
    let currentAllComplete: boolean = currentGroupTasks[0].status === 'completed';

    for (var task of currentGroupTasks) {
        currentAllComplete = currentAllComplete && task.status === 'completed';
    }

    if (!currentAllComplete) return -1;

    const nextGroupTasks = _fetchTasksByGroup(currentGroup + 1);

    if (nextGroupTasks.length === 0) return 1;

    for (var task of nextGroupTasks) {
        const updates: UpdateTaskModel = { status: 'active' };

        _updateTask(task.id, updates);
    }

    return 0;
}

function _deleteTask(taskId: number) {
    const taskData = readTaskData();

    const taskIdx = taskData.tasks.findIndex((task: TaskModel) => task.id === taskId);

    if (taskIdx === -1) return null;

    const taskToDelete = taskData.tasks[taskIdx];

    taskData.tasks.splice(taskIdx, 1);

    writeTaskData(taskData);

    return taskToDelete;
}

function _deleteTasksByProjectId(projectId: string) {
    const taskData = readTaskData();

    const tasks = taskData.tasks;

    for (var task of tasks) {
        if (task.projectId === projectId) _deleteTask(task.id);
    }

    return;
}



export {
    _createTaskIfExists,
    _fetchTasks,
    _fetchTasksById,
    _updateTask,
    _deleteTask,
    _activateNextGroup,
    _deleteTasksByProjectId,
}
