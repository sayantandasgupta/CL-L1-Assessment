import * as TaskService from '@/services/task.services';
import * as UserService from '@/services/user.services';
import * as ProjectService from '@/services/project.services';
import { UpdateTaskModel } from '@/models/Tasks';
import { ProjectMembers } from '@/models/Project';

function GetTasks(status?: string) {
    const tasks = TaskService._fetchTasks(status);
    return { status: 200, message: 'Tasks fetched', tasks };
}

function UpdateTask(taskId: number, updates: UpdateTaskModel, userId: string, projectId: string) {
    const user = UserService._fetchUserById(userId);
    const project = ProjectService._fetchProjectById(projectId);
    const task = TaskService._fetchTasksById(taskId);

    if (updates.status === 'completed') {
        const assignedTo = task?.assignedTo as keyof ProjectMembers;
        const assignedUserId = project?.members[assignedTo];

        const cond1: boolean = assignedUserId !== undefined;

        if (!cond1) return { status: 403, message: 'Forbidden: Only assigned user can mark the task as complete' };

        const cond2: boolean = userId === assignedUserId;

        if (!cond2) return { status: 403, message: 'Forbidden: Only assigned user can mark the task as complete' };

        const updatedTask = TaskService._updateTask(Number(task?.id), updates);

        TaskService._activateNextGroup(Number(updatedTask?.group));

        return { status: 200, message: 'Task marked as completed', tasks: [updatedTask] };
    } else {
        if (user?.project?.projectRole !== 'approver') return { status: 403, message: 'Forbidden: Only approvers can update tasks' }

        const updatedTask = TaskService._updateTask(Number(task?.id), updates);

        return { status: 200, message: 'Task updated', tasks: [updatedTask] };
    }

}

function DeleteTask(taskId: number, userId: string) {
    const user = UserService._fetchUserById(userId);

    if (user?.project?.projectRole != 'approver') return { status: 403, message: 'Forbidden: Only approvers can delete tasks' };

    const deletedTask = TaskService._deleteTask(taskId);

    return { status: 200, message: 'Task deleted' };
}

export {
    GetTasks,
    UpdateTask,
    DeleteTask,
}
