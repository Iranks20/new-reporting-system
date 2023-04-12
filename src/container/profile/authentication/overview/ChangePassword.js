import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import { AuthFormWrap } from './style';

function ChangePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const email = localStorage.getItem('email');
    const data = { ...values, email };
    try {
      const response = await axios.post('http://100.25.26.230:5000/api/v3/update-password', data);
      if (response.status === 200) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <Form name="forgotPass" layout="vertical" onFinish={handleSubmit}>
            <div className="ninjadash-authentication-top">
              <h2 className="ninjadash-authentication-top__title">New Password</h2>
            </div>
            <div className="ninjadash-authentication-content">
              <p className="forgot-text">
                Please enter a new password to complete the password reset process. Thank you.
              </p>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your New password' }]}
                initialValue="123456"
                label="New Password"
              >
                <Input.Password placeholder="New Password" />
              </Form.Item>
              <Form.Item>
                <Button className="btn-reset" htmlType="submit" type="primary" size="large" loading={loading}>
                  {success ? 'Success' : 'Update Password'}
                </Button>
              </Form.Item>
            </div>
            {/* <div className="ninjadash-authentication-bottom">
              <p className="return-text">
                Return to <Link to="/">Sign In</Link>
              </p>
            </div> */}
          </Form>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ChangePassword;
