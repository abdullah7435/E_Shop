import React, { useEffect, useState } from "react";
import {
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
import { useAuthContext } from "../components/context/AuthContext";
import { API } from "../constant";
import { getToken } from "../helpers";
import useScreenSize from "../components/hooks/useScreenSize";

const Profile = () => {
  const { isDesktopView } = useScreenSize();

  const [loading, setLoading] = useState(false);
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error(error);
        message.error("Error while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/orders?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        message.error("Error while fetching user orders.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
      fetchUserOrders();
    }
  }, [user]);

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      setProfileData(responseData);
      message.success("Data saved successfully!");
    } catch (error) {
      console.error(error);
      message.error("Error while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthLoading) {
    return <Spin size="large" />;
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={isDesktopView ? 8 : 24}>
        <Card className="profile_page_card">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Form
              layout="vertical"
              initialValues={{
                username: profileData?.username,
                email: profileData?.email,
                password: profileData?.password,
              }}
              onFinish={handleProfileUpdate}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Typography.Title level={3}>Profile</Typography.Title>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Username is required!",
                        type: "string",
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Email is required!",
                        type: "email",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is required!",
                        type: "password",
                      },
                    ]}
                  >
                    <Input type="password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Button
                    className="profile_save_btn"
                    htmlType="submit"
                    type="primary"
                    size="large"
                    loading={loading}
                    style={{ backgroundColor: "#1890ff" }}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
              {/* Orders */}
              <br></br>
              <Card className="orders_card">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Typography.Title level={3}>Orders</Typography.Title>
                    {orders.length > 0 ? (
                      <ul>
                        {orders.map((order) => (
                          <li key={order.id}>
                            Order ID: {order.id}, Total: {order.totalPrice},
                            Date: {order.date}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No orders</p>
                    )}
                  </Col>
                </Row>
              </Card>
            </Form>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
