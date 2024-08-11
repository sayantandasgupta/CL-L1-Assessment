import { NextApiRequest } from "next";
import { User } from "@/models/User";
import * as UserService from '@/services/user.services';

function CreateUser(req: NextApiRequest) {
    const { id } = req.body;

    const user = UserService._createUser(id);

    return { status: 201, message: 'User added', user }
}

function GetUsers() {
    const users: User[] | null = UserService._fetchUsers();

    return { status: 200, message: 'Users fetched', users };
}

function UpdateUserRole(req: NextApiRequest) {
    const { userId, newRole, projectId } = req.body;

    try {
        const user: User | null = UserService._fetchUserById(userId);

        if (user == null) return { status: 404, message: 'User not found' };

        const updatedUser = UserService._updateProjectRole(user.id, newRole, projectId);

        return { status: 200, message: 'Role updated' };
    } catch (error) {
        return { status: 500, message: 'Failed to update role' };
    }
}

export {
    CreateUser,
    GetUsers,
    UpdateUserRole,
}