import LoginForm from "@/components/login/login-form";
import { Card, Col, Layout, Row } from "antd";
import React from "react";
import styles from '@/styles/LoginForm.module.css';

const { Content } = Layout;

export default function LoginPage() {
    return (
        <Layout className={styles.layout}>
            <Content style={{}}>
                <Row justify="center" align="middle" className={styles.fullHeight}>
                    <Col xs={24} sm={16} md={12} lg={8}>
                        <Card className={styles.card} hoverable>
                            <LoginForm />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}