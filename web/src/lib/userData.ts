import { User } from "@/models/User";
import * as fs from 'fs';
import path from "path";

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'UserData.json');

function readUserData(): { users: User[] } {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
}

function writeUserData(data: { users: User[] }): void {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export const users = [
    {
        "id": "1",
        "role": "admin"
    },
    {
        "id": "2",
        "role": "staff"
    },
    {
        "id": "3",
        "role": "staff"
    },
    {
        "id": "4",
        "role": "staff",
        "project": {
            "projectId": "project1",
            "projectRole": "approver"
        }
    },
    {
        "id": "123",
        "role": "staff",
        "project": {
            "projectId": "project1",
            "projectRole": "contributor"
        }
    },
    {
        "id": "234",
        "role": "staff",
        "project": {
            "projectId": "project1",
            "projectRole": "approver"
        }
    },
    {
        "id": "345",
        "role": "staff",
        "project": {
            "projectId": "project1",
            "projectRole": "reviewer"
        }
    },
    {
        "id": "5",
        "role": "staff"
    }
]

export {
    readUserData,
    writeUserData,
}