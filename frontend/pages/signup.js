import { Alert, Button, Col, Form, Input, message, Row, Spin, Typography } from "antd";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthContext } from "../components/context/AuthContext";
import useScreenSize from "../components/hooks/useScreenSize";
import { API } from "../constant";
import { setToken } from "../helpers";

const SignUp = () => {
  const { isDesktopView } = useScreenSize();
  const router = useRouter();
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome ${data.user.username}!`);

        // Use router.push to navigate to the desired page
        router.push("/"); // Redirect to the home page after successful registration
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
              <h1 className="text-3xl font-semibold mb-6">SignUp</h1>
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
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please input your username!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email address!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  loading={isLoading}
                  style={{ backgroundColor: "#1890ff" }} // Add the custom blue color here
                >
                  Submit
                </Button>
              </Form.Item>
              <div className="mb-6 mt-6">
                <Typography.Paragraph className="form_help_text">
                  Already have an account? <Link href="/login">Sign In</Link>
                </Typography.Paragraph>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUp;
