import { ProjectModel } from '@/models/Project';
import { readFileSync, writeFileSync } from 'fs';
import path from "path";

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'ProjectData.json');

function readProjectData(): { projects: ProjectModel[] } {
    const jsonData = readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
}

function writeProjectData(data: { projects: ProjectModel[] }): void {
    writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export {
    readProjectData,
    writeProjectData,
}