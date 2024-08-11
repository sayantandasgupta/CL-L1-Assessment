import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/projects';
import { getProjects, createProject, Project } from '@/models/Project';
import { Task, getTasks, initializeProjectTasks } from '@/models/Tasks';
import { getUsers, initializeUsers } from '@/models/User';

beforeEach(() => {
  Project.idCounter =1;
  Task.idCounter=1;
  (getProjects() as any[]).length = 0;
  (getTasks() as any[]).length = 0;
  (getUsers() as any[]).length = 0;
  initializeUsers()

});

describe('Projects API', () => {
  it('creates a new project with roles and initial tasks if the user is an admin', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Project1',
        contributorId: '123',
        approverId: '234',
        reviewerId: '345',
        userId: '1'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const data = res._getJSONData();
    expect(data.project.name).toBe('Project1');

    const projects = getProjects();
    expect(projects.length).toBe(1);
    expect(projects[0].members).toEqual({
      admin:"1",
      contributor: '123',
      approver: '234',
      reviewer: '345'
    });

    const tasks = getTasks();
    expect(tasks.length).toBe(10);
    expect(tasks[0].title).toBe('Project Initialization');
    expect(tasks[0].status).toBe('active');
  });

  it('fails to create a project if the user is not an admin', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Project1',
        contributorId: '123',
        approverId: '234',
        reviewerId: '345',
        userId: 'user1'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(403);
    const data = res._getJSONData();
    expect(data.message).toBe('Forbidden: Only admins can manage projects');
  });

  it('deletes a project if the user is an admin', async () => {
    // Create a project to delete
    const project = createProject('Project to delete', '1', '2', '3','1');
    initializeProjectTasks(project.id);

    const { req, res } = createMocks({
      method: 'DELETE',
      body: { projectId: project.id, userId: '1' }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = res._getJSONData();
    expect(data.message).toBe('Project deleted');
  });

  it('fails to delete a project if the user is not an admin', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: { projectId: 1, userId: 'user1' }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(403);
    const data = res._getJSONData();
    expect(data.message).toBe('Forbidden: Only admins can manage projects');
  });
});
