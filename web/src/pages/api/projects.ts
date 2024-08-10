import { NextApiRequest, NextApiResponse } from "next";
import * as ProjectController from '@/controllers/project.controller';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'POST':
            const createResult = await ProjectController.CreateProject(req);

            if (createResult.status === 403) return res.status(403).json({ message: createResult.message });

            return res.status(createResult.status).json({ message: createResult.message, project: { ...createResult.project } });

        case 'GET':
            const getResult = await ProjectController.GetProjects();

            if (getResult.projects == null) return res.status(500).json({ message: 'Failed to fetch projects' });

            return res.status(getResult.status).json({ message: getResult.message, projects: { ...getResult.projects } });

        case 'DELETE':

            const deleteResult = await ProjectController.DeleteProject(req);

            return res.status(deleteResult.status).json({ message: deleteResult.message });

        default: return res.status(405).json({ message: 'API does not support this method' });
    }
}