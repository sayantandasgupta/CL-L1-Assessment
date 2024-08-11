import type { ReactElement } from "react"
import { Typography, Row, Col, Flex, Space, Button } from "antd"
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/pages/dashboard/layout";
import ProjectCard from "@/components/dashboard/project-card";
import DashboardTabs from "@/components/dashboard/tabs";
import { GetSessionParams, getSession } from "next-auth/react";

const { Title } = Typography;

const DashboardPage: NextPageWithLayout = () => {
    return (
        <main style={{
            backgroundColor: '#f3f6f8',
            padding: '16px',
            height: '100%'
        }}>
            <Flex gap='small' align="flex-start" justify="space-evenly" vertical>
                <Space size='large' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Title>Projects</Title>
                    <Button type="primary" style={{ backgroundColor: 'blue' }}>{`+ New Project`}</Button>
                </Space>
                <DashboardTabs />
            </Flex>
        </main>
    );
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}

export default DashboardPage;

export async function getServerSideProps(context: GetSessionParams) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    return {
        props: session,
    }
}