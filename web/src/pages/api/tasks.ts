import { NextApiRequest, NextApiResponse } from "next";
import * as TaskController from '@/controllers/task.controller';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    if (method == 'GET') {
        const { status } = req.query;
        const getResult = TaskController.GetTasks(String(status));

        return res.status(getResult.status).json({ message: getResult.message, tasks: getResult.tasks });
    } else if (method == 'PUT') {
        const { userId, taskId, updates, projectId } = req.body;
        const putResult = TaskController.UpdateTask(taskId, updates, userId, projectId);

        if (putResult.status === 403) return res.status(putResult.status).json({ message: putResult.message });

        return res.status(putResult.status).json({ message: putResult.message, tasks: putResult.tasks });
    } else if (method == 'DELETE') {
        const { userId, taskId } = req.body;
        const deleteResult = TaskController.DeleteTask(taskId, userId);

        return res.status(deleteResult.status).json({ message: deleteResult.message })
    }
}