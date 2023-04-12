import { Button, Col, Form, Input, message, Row } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthFormWrap } from './style';

function SignIn() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://100.25.26.230:5000/api/v3/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Login successful!');
        navigate('/admin');
      } else {
        message.error(data.message || 'Login failed. Check your credentials and Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Login failed. Please try again.');
    }
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">Sign in Admin</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email' }]}
                placeholder="ninjadash@dm.com"
                label="Email Address"
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password' }]}
                initialValue="123456"
                label="Password"
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <div className="ninjadash-auth-extra-links">
                <NavLink className="forgot-pass-link" to="/forgotPassword">
                  Forgot password?
                </NavLink>
              </div>
              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
