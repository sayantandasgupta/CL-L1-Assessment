import { User, UserProject } from "@/models/User";
import { readUserData, writeUserData } from "@/lib/userData";

function _createUser(id: string, role: 'admin' | 'staff' = 'staff'): User {
    const data = readUserData();
    const newUser: User = { id, role };

    const checkExistingUser = data.users.find((user: User) => user.id === id);

    if (checkExistingUser) return checkExistingUser;

    data.users.push(newUser);

    writeUserData(data);

    return newUser;
}

function _fetchUsers(): User[] {
    const data = readUserData();

    if (data.users.length === 0) return [];

    return data.users;
}

function _fetchUserById(userId: string): User | null {
    const data = readUserData();

    const user = data.users.find((user: User) => user.id === userId);

    if (!user) return null;

    return user;
}

function _updateProjectRole(userId: string, newRole: string, projectId: string) {
    const data = readUserData();
    const userIdx = data.users.findIndex((user: User) => user.id === userId);

    if (userIdx === -1) return null;

    const currentUser: User = data.users[userIdx];
    let updatedUser: User | null = null;

    updatedUser = {
        id: currentUser.id,
        role: currentUser.role,
        project: {
            projectId: projectId,
            projectRole: newRole as "admin" | "approver" | "contributor" | "approver",
        }
    }

    if (updatedUser == null) throw new Error('Failed to update user role');

    data.users[userIdx] = updatedUser;
    writeUserData(data);

    return updatedUser;
}

function _deleteUserRole(userId: string) {
    const data = readUserData();
    const userIdx = data.users.findIndex((user: User) => user.id === userId);

    if (userIdx === -1) return null;

    const currentUser: User = data.users[userIdx];
    const updatedUser: User = {
        id: currentUser.id,
        role: currentUser.role,
    };

    data.users[userIdx] = updatedUser;
    writeUserData(data);

    return;
}

export {
    _createUser,
    _fetchUsers,
    _fetchUserById,
    _updateProjectRole,
    _deleteUserRole
}