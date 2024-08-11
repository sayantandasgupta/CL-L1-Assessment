import * as ProjectService from '@/services/project.services';

export interface ProjectModel {
    id: string;
    name: string;
    members: ProjectMembers;
}

export interface ProjectMembers {
    contributor: string;
    approver: string;
    reviewer: string;
    admin: string;
}

export const Project = {
    idCounter: 0
}

function getProjects() {
    const allProjects = ProjectService._fetchProjects();

    return allProjects!;
}

function createProject(name: string, contributorId: string, approverId: string, reviewerId: string, adminId: string) {
    const newProject = ProjectService._createProjectIfExists(name, contributorId, approverId, reviewerId, adminId);

    return newProject;
}

function deleteProject(projectId: string) {
    const deletedProject = ProjectService._deleteProject(projectId);

    return deletedProject;
}

export {
    getProjects,
    createProject,
    deleteProject,
}