import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import { AuthFormWrap } from './style';

function ForgotPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios
      .post('http://100.25.26.230:5000/api/v3/forgot-password', values)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          message.success('otp sent to your email');
          localStorage.setItem('email', values.email); // store email in local storage
          navigate('/otppassword');
        } else {
          message.error('invalid email');
        }
      })
      .catch((err) => {
        console.log(err);
        message.error('failed to send otp');
      });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <Form name="forgotPass" form={form} layout="vertical" onFinish={onFinish}>
            <div className="ninjadash-authentication-top">
              <h2 className="ninjadash-authentication-top__title">Forgot Password?</h2>
            </div>
            <div className="ninjadash-authentication-content">
              <p className="forgot-text">
                Enter the email address you used when you joined and we’ll send you instructions to reset your password.
              </p>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item>
                <Button className="btn-reset" htmlType="submit" type="primary" size="large">
                  Send Reset Instructions
                </Button>
              </Form.Item>
            </div>
            <div className="ninjadash-authentication-bottom">
              <p className="return-text">
                Return to <Link to="/otppassword">Sign In</Link>
              </p>
            </div>
          </Form>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ForgotPassword;
