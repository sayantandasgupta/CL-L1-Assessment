'use client'

import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, Select } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const { Title } = Typography;
const { Option } = Select;

export default function LoginForm() {
    const [id, setId] = useState('');
    const [role, setRole] = useState('');
    const router = useRouter();

    const handleSubmit = async (values: { id: string; role: string }) => {
        const result = await signIn("credentials", {
            redirect: false,
            id: values.id,
            role: values.role
        });

        if (result?.ok) {
            router.push('/dashboard');
        } else {
            alert('Invalid Credentials');
        }
    }

    return (
        <div className={`flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-xs w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-red-500 rounded-full flex items-center justify-center">
                        <LockOutlined className="text-white" style={{ fontSize: '24px' }} />
                    </div>
                    <Title level={3} className="mt-6 text-gray-900">
                        Login
                    </Title>
                </div>

                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    className="space-y-6"
                >
                    <Form.Item
                        name="id"
                        rules={[{ required: true, message: 'Enter your ID' }]}
                    >
                        <Input
                            type="text"
                            placeholder="Enter your ID*"
                            onChange={(e) => setId(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        rules={[{ required: true, message: 'Select your Role' }]}
                    >
                        <Select onSelect={(e) => setRole(e)} placeholder="Select your Role">
                            <Option value="admin">Admin</Option>
                            <Option value="staff">Staff</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
