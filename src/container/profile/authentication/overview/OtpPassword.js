import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import { AuthFormWrap } from './style';

function OtpPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const email = localStorage.getItem('email');
  // const [isEmailDisabled, setIsEmailDisabled] = useState(true);

  const onFinish = (values) => {
    axios
      .post('http://100.25.26.230:5000/api/v3/verify-otp', { ...values, email })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          message.success('OTP verification successful');
          navigate('/changepassword');
        } else {
          message.error('Invalid OTP');
        }
      })
      .catch((err) => {
        console.log(err);
        message.error('Failed to verify OTP');
      });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <Form name="otp" form={form} layout="vertical" onFinish={onFinish}>
            <div className="ninjadash-authentication-top">
              <h2 className="ninjadash-authentication-top__title">Forgot Password?</h2>
            </div>
            <div className="ninjadash-authentication-content">
              <p className="forgot-text">
                We have sent an One-Time Password (OTP) to your email for resetting password
              </p>
              <Form.Item
                name="email"
                label="Email Address"
                initialValue={email}
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="Email" disabled />
              </Form.Item>
              <Form.Item
                name="otp"
                label="OTP"
                rules={[{ required: true, message: 'Please input OTP sent to your email!' }]}
              >
                <Input placeholder="Enter OTP" />
              </Form.Item>
              <Form.Item>
                <Button className="btn-reset" htmlType="submit" type="primary" size="large">
                  Verify OTP
                </Button>
              </Form.Item>
            </div>
            {/* <div className="ninjadash-authentication-bottom">
              <p className="return-text">
                Return to <Link to="/changepassword">Sign In</Link>
              </p>
            </div> */}
          </Form>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default OtpPassword;
