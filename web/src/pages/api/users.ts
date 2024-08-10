import { NextApiRequest, NextApiResponse } from "next";
import * as UserService from '@/services/user.services';
import * as UserProjectInfoService from '@/services/userprojectinfo.services';
import { User, UserProjectInfo } from "@prisma/client";

export default async function handleUsers(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': try {
            const users: User[] | null = await UserService._fetchUsers();

            console.log(users);

            return res.status(200).json({
                message: 'Users fetched',
                users,
            })
        } catch (error) {
            console.error("Failed to fetch users", error);
            return res.status(500).json({ message: 'Failed to fetch users' });
        }

        case 'POST': const { id } = req.body;
            try {
                const user: User | null = await UserService._createUser(id);

                return res.status(201).json({
                    message: 'User added',
                    user
                })

            } catch (error) {
                console.log("Failed to create user", error);
                return res.status(500).json({ message: 'Failed to create user' });
            }

        case 'PUT': const { userId, newRole, projectId } = req.body;
            try {
                const user: User | null = await UserService._fetchUserById(userId);

                if (!user) return res.status(404).json({ message: 'User not found' });

                const updateRole: UserProjectInfo | null = await UserProjectInfoService._createProjectInfo(user.id, Number(projectId), newRole);

                return res.status(200).json({ message: 'Role updated' });

            } catch (error) {
                console.error('Failed to update role', error);
                return res.status(500).json({ message: 'Failed to update role' });
            }

        default: return res.status(405).json({ message: 'API does not support this method' });
    }

}