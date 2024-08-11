import { NextApiRequest, NextApiResponse } from "next";
import * as ProjectController from '@/controllers/project.controller';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'POST':
            const createResult = ProjectController.CreateProject(req);

            if (createResult.status === 403) return res.status(403).json({ message: createResult.message });

            return res.status(createResult.status).json({ message: createResult.message, project: { ...createResult.project } });

        case 'GET':
            const getResult = ProjectController.GetProjects();

            return res.status(getResult.status).json({ message: getResult.message, projects: { ...getResult.projects } });

        case 'DELETE':

            const deleteResult = ProjectController.DeleteProject(req);

            return res.status(deleteResult.status).json({ message: deleteResult.message });

        default: return res.status(405).json({ message: 'API does not support this method' });
    }
}