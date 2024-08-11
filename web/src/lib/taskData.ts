import { TaskModel } from '@/models/Tasks';
import * as fs from 'fs';
import path from "path";

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'TaskData.json');

function readTaskData(): { tasks: TaskModel[] } {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
}

function writeTaskData(data: { tasks: TaskModel[] }): void {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export {
    readTaskData,
    writeTaskData,
}