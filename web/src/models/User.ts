import * as UserService from '@/services/user.services';
import { users } from '@/data/UserList';

export interface User {
    id: string;
    role: 'admin' | 'staff';
    project?: UserProject | null;
}

export interface UserProject {
    projectId: string;
    projectRole: "admin" | "approver" | "contributor" | "reviewer";
}

function initializeUsers() {
    for (var user of users) {
        let tempUser: User = { id: user.id, role: user.role as 'admin' | 'staff' };

        UserService._createUser(tempUser.id, tempUser.role);
    }
}

function addUser(id: string, role: string) {
    const newUser = UserService._createUser(id, role as 'admin' | 'staff');

    return newUser;
}

function getUsers() {
    const users: User[] = UserService._fetchUsers();

    return users;
}

function updateUserRole(userId: string, newRole: string, projectId: string) {
    const updatedUser = UserService._updateProjectRole(userId, newRole, projectId);

    return updatedUser;
}

function deleteAllUsers() {
    for (var user of users) {
        UserService._deleteUser(user.id);
    }
}

export {
    initializeUsers,
    addUser,
    getUsers,
    updateUserRole,
    deleteAllUsers
}

