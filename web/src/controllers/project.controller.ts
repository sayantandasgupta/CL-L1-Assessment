import { NextApiRequest } from "next";
import * as ProjectService from '@/services/project.services';
import * as UserService from '@/services/user.services';

function CreateProject(req: NextApiRequest) {

    const { userId, name, contributorId, approverId, reviewerId } = req.body;

    const user = UserService._fetchUserById(userId);

    if (!user || user.role != 'admin') return { status: 403, message: 'Forbidden: Only admins can manage projects' };

    const newProject = ProjectService._createProjectIfExists(name, contributorId, approverId, reviewerId, user!.id);

    return { status: 201, message: 'Project created', project: newProject };
}

function GetProjects() {
    const projects = ProjectService._fetchProjects();

    return { status: 200, message: 'Projects fetched', projects };
}

function DeleteProject(req: NextApiRequest) {
    const { userId, projectId } = req.body;

    const user = UserService._fetchUserById(userId);

    if (!user || user.role != 'admin') return { status: 403, message: 'Forbidden: Only admins can manage projects' };

    const deletedProject = ProjectService._deleteProject(projectId);

    if (deletedProject === null) return { status: 404, message: 'Project not found' };

    return { status: 200, message: 'Project deleted' };
}

export {
    CreateProject,
    GetProjects,
    DeleteProject,
}