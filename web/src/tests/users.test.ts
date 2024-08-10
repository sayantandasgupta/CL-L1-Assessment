import { createMocks } from 'node-mocks-http';
import handleUsers from '@/pages/api/users';
import { initializeUsers, addUser, getUsers, updateUserRole } from '@/models/User';

beforeAll(() => {
  return new Promise<void>(resolve => {
    initializeUsers();
    resolve();
  })
});

describe('Users API', () => {
  it('fetches all users', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handleUsers(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = res._getJSONData();
    expect(Array.isArray(data.users)).toBe(true);
    expect(data.users.length).toBeGreaterThan(0);
  });

  it('adds a new user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { id: '5' },
    });

    await handleUsers(req, res);

    expect(res._getStatusCode()).toBe(201);
    const data = res._getJSONData();
    expect(data.user.id).toBe('5');

    const users = getUsers();
    expect(users.find(u => u.id === '5')).toBeTruthy();
  });

  it('updates a user role for a specific project', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: { userId: '4', newRole: 'approver', projectId: 'project1' },
    });

    await handleUsers(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = res._getJSONData();
    expect(data.message).toBe('Role updated');

    const users = getUsers();
    const user = users.find(u => u.id === '4');
    expect(user?.project.projectId).toBe('project1');
    expect(user?.project.projectRole).toBe('approver');
  });

  it('fails to update a user role if user does not exist', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: { userId: 'nonexistent', newRole: 'approver', projectId: 'project1' },
    });

    await handleUsers(req, res);

    expect(res._getStatusCode()).toBe(404);
    const data = res._getJSONData();
    expect(data.message).toBe('User not found');
  });
});
