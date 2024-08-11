import { NextApiRequest, NextApiResponse } from "next";
import * as UserController from '@/controllers/user.controller';

export default async function handleUsers(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            const getResult = UserController.GetUsers();

            return res.status(getResult.status).json({ message: getResult.message, users: getResult.users });

        case 'POST':
            const postResult = UserController.CreateUser(req);

            return res.status(postResult.status).json({ message: postResult.message, user: postResult.user });

        case 'PUT':
            const putResult = UserController.UpdateUserRole(req);

            return res.status(putResult.status).json({ message: putResult.message });

        default: return res.status(405).json({ message: 'Method not supported by API' });
    }

}