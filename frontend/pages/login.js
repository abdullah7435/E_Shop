import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter from Next.js

import { useAuthContext } from "../components/context/AuthContext";
import useScreenSize from "../components/hooks/useScreenSize";
import { API } from "../constant";
import { setToken } from "../helpers";

const SignIn = () => {
  const { isDesktopView } = useScreenSize();
  const router = useRouter(); // Use useRouter from Next.js

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome back ${data.user.username}!`);

        // Use router.push to navigate to the desired page
        router.push("/"); // Redirect to the home page after successful login
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <div className="flex justify-center items-center h-screen">
            <Form
              className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
              onFinish={onFinish}
            >
              <h1 className="text-3xl font-semibold mb-6">Login</h1>
              {error && (
                <Alert
                  className="alert_error"
                  message={error}
                  type="error"
                  closable
                  afterClose={() => setError("")}
                />
              )}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input a valid email address!",
                  },
                ]}
              >
                <Input placeholder="Email address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  loading={isLoading}
                  style={{ backgroundColor: "#1890ff" }} // Add the custom blue color here
                >
                  Login {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>

              <Typography.Paragraph className="form_help_text">
                If don't have an account,{" "}
                <Link href="/signup">Sign Up</Link>
              </Typography.Paragraph>
            </Form>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignIn;
