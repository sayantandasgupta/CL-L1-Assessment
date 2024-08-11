import { Avatar, Button, Card, Divider, Flex, Progress, Space, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import BookmarkIcon from "../bookmark-logo";
import { _fetchUserById } from "@/services/user.services";
import { ReactNode } from "react";
import { users } from "@/lib/userData";

const { Text } = Typography;
const { Meta } = Card;

function CardButtons(): ReactNode {
    return (<div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
            type="text"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
        />
        <Divider type="vertical" />
        <Button
            type="text"
            icon={<DeleteOutlined />}
            style={{ marginLeft: 8 }}
        />
    </div>);
}

export default function ProjectCard() {

    const project = {
        id: "project1",
        name: "Project1",
        members: {
            contributor: "2",
            approver: "3",
            reviewer: "4",
            admin: "1",
        }
    }

    const percent = 50;

    let avatars: string[] = [];

    for (const [key, value] of Object.entries(project.members)) {
        avatars.push(value);
    }


    return (
        <Link href=''>
            <Card style={{
                backgroundColor: '#fff',
                position: 'absolute',
                width: '441px',
                height: '230px',
                left: '49px',
                top: '258px',
                borderRadius: '0'
            }} title={project.name} extra={<BookmarkIcon />}>
                <Flex gap='middle' align="flex-start" justify="space-evenly" vertical>
                    <Space size='large' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Text>Progress</Text>
                        <Text strong>{`5/10 Tasks`}</Text>
                    </Space>
                    <Progress percent={percent} showInfo={false} />
                    <Avatar.Group>
                        {
                            avatars.map((id, idx) => (
                                <Avatar key={idx} size={50} style={{ backgroundColor: 'red' }}>{id}</Avatar>
                            ))
                        }
                    </Avatar.Group>
                </Flex>
            </Card>

        </Link>
    );

}