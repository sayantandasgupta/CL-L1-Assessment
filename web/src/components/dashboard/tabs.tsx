import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import ProjectCard from "./project-card";

const onChange = (key: string) => {
    console.log(key);
}

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'All',
        children: <ProjectCard />
    },
    {
        key: '2',
        label: 'Assigned to Me',
        children: <ProjectCard />
    },
    {
        key: '3',
        label: 'Bookmarked',
        children: <ProjectCard />
    },
]

export default function DashboardTabs() {
    return (
        <Tabs style={{ width: '100%', padding: '0px' }} defaultActiveKey="1" items={items} onChange={onChange} />
    )
}

