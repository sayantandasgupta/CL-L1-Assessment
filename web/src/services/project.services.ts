import { ProjectModel } from "@/models/Project";
import { readProjectData, writeProjectData } from "@/lib/projectData";
import { _updateProjectRole, _deleteUserRole } from "./user.services";
import { _deleteTasksByProjectId } from "./task.services";

function _createProject(name: string, contributorId: string, approverId: string, reviewerId: string, userId: string) {
    const data = readProjectData();

    const newProjectId = name.toLowerCase();

    const newProject: ProjectModel = {
        id: newProjectId,
        name: name,
        members: {
            contributor: contributorId,
            approver: approverId,
            reviewer: reviewerId,
            admin: userId,
        }
    }

    data.projects.push(newProject);

    writeProjectData(data);

    // Update the Corresponding User Roles in the User data

    _updateProjectRole(contributorId, 'contributor', newProjectId);
    _updateProjectRole(approverId, 'approver', newProjectId);
    _updateProjectRole(reviewerId, 'reviewer', newProjectId);
    _updateProjectRole(userId, 'admin', newProjectId);

    return newProject;
}

function _createProjectIfExists(name: string, contributorId: string, approverId: string, reviewerId: string, userId: string) {
    const newProjectId = name.toLowerCase();

    const existingProject = _fetchProjectById(newProjectId);
    if (existingProject !== null) _deleteProject(newProjectId);

    const newProject = _createProject(name, contributorId, approverId, reviewerId, userId);

    return newProject;
}

function _fetchProjects() {
    const data = readProjectData();

    if (data.projects.length == 0) return [];

    return data.projects;
}

function _fetchProjectById(projectId: string) {
    const data = readProjectData();

    const project: ProjectModel | undefined = data.projects.find((project: ProjectModel) => project.id === projectId);

    if (!project) return null;

    return project;
}

function _fetchProjectByUserId(userId: string) {
    const data = readProjectData();
    const projects = data.projects;

    for (let i = 0; i < projects.length; i++) {
        const members = projects[i].members;

        for (const [_, value] of Object.entries(members)) {
            if (value === userId) return projects[i];
        }
    }

    return null;
}

function _deleteProject(projectId: string) {
    const data = readProjectData();

    const projectIdx = data.projects.findIndex((project: ProjectModel) => project.id === projectId);

    if (projectIdx === -1) return null;

    const projectToDelete = data.projects[projectIdx];

    data.projects.splice(projectIdx, 1);

    writeProjectData(data);

    // Delete corresponding user roles
    _deleteUserRole(projectToDelete.members.admin);
    _deleteUserRole(projectToDelete.members.approver);
    _deleteUserRole(projectToDelete.members.contributor);
    _deleteUserRole(projectToDelete.members.reviewer);

    _deleteTasksByProjectId(projectToDelete.id);

    return projectToDelete;
}

export {
    _fetchProjects,
    _fetchProjectById,
    _deleteProject,
    _createProjectIfExists,
    _fetchProjectByUserId
}