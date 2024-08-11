"use client";

import { Typography, Layout, Space, Avatar, Badge, Breadcrumb, Dropdown, Button } from "antd";
import React from "react";
import { SettingOutlined, BellOutlined } from "@ant-design/icons";
import ProjectIcon from "./projects-logo";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import type { MenuProps } from "antd";

const { Header } = Layout;
const { Text } = Typography;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Text>Admin</Text>
        )
    },
    {
        key: '2',
        label: (
            <Button onClick={async () => {
                await signOut();
            }}>
                Sign Out
            </Button>
        )
    }
]

export default function NavBar() {

    const router = useRouter();

    const breadcrumbs = router.asPath === '/dashboard/tasks' ? [{
        href: '/dashboard',
        title: <ProjectIcon />,
    },
    {
        href: router.asPath,
        title: (
            <>
                <span>Tasks</span>
            </>
        ),
    }] : [{
        href: '/dashboard',
        title: <ProjectIcon />,
    }];


    return (
        <Header style={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', padding: '0 24px' }}>
            <Space size="large" align="center">
                <Breadcrumb
                    style={{ fontSize: '20px' }}
                    items={breadcrumbs}
                />

            </Space>
            <Space size="middle" align="center">
                <SettingOutlined style={{ fontSize: '20px' }} />
                <Badge count={5}><BellOutlined style={{ fontSize: '20px' }} /></Badge>
                <Avatar style={{ backgroundColor: 'red' }}>Admin</Avatar>
                <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomRight">
                        <Text strong>Admin</Text>
                    </Dropdown>
                </Space>
            </Space>
        </Header>
    )
}