import * as TaskService from '@/services/task.services';
import * as ProjectService from '@/services/project.services';
import { initialTasks } from '@/data/TaskList';
import { ProjectMembers } from './Project';

export interface TaskModel {
    id: number;
    title: string;
    description: string;
    group: number;
    assignedTo: "admin" | "approver" | "contributor" | "reviewer";
    status: 'active' | 'pending' | 'completed';
    projectId: string;
}

export const Task = {
    idCounter: 0,
}

export interface UpdateTaskModel {
    title?: string;
    description?: string;
    group?: number;
    assignedTo?: "admin" | "approver" | "contributor" | "reviewer";
    status?: 'active' | 'pending' | 'completed';
}

function initializeProjectTasks(projectId: string) {

    const project = ProjectService._fetchProjectById(projectId);

    for (var task of initialTasks) {
        const userId: string | undefined = project?.members[task.assignedTo as keyof ProjectMembers];
        TaskService._createTaskIfExists(task.id, task.title, task.description, task.group, task.assignedTo, String(userId));
    }
}

function getTasks() {
    const allTasks = TaskService._fetchTasks();

    return allTasks;
}

function deleteTasks() {
    for (var task of initialTasks) {
        TaskService._deleteTask(task.id);
    }
}

export {
    initializeProjectTasks,
    getTasks,
    deleteTasks,
}