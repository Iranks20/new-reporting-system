import React, { useState } from 'react';
import { Row, Col, Form, message, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';

function Info() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log('inno');
    try {
      const response = await fetch('http://16.171.10.64:5000/api/v3/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log(values);
      console.log('waaaaa');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);
      setIsLoading(false);
      message.info('Admin user added successfully');
      navigate('/admin/users/dataTable');
    } catch (error) {
      console.error('API error:', error);
      setIsLoading(false);
      message.info('user exists already or else internal server error');
    }
  };

  const handleFormChange = () => {
    const isFieldsFilled = form.getFieldsError().filter(({ errors }) => errors.length).length === 0;
    setIsFormFilled(isFieldsFilled);
  };

  return (
    <Row justify="center">
      <Col xxl={10} xl={14} md={16} xs={24}>
        <div className="user-info-form">
          <BasicFormWrapper>
            <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit} onChange={handleFormChange}>
              <Heading className="form-title" as="h4">
                Personal Information
              </Heading>

              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input placeholder="Input Name" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="PhoneNumber"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input placeholder="+440 2546 5236" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="password1234" />
              </Form.Item>

              <Form.Item
                name="company"
                label="Company"
                rules={[{ required: true, message: 'Please input your Compony name!' }]}
              >
                <Input placeholder="Company name" />
              </Form.Item>

              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: 'Please input your postion!' }]}
              >
                <Input placeholder="Position" />
              </Form.Item>

              <Form.Item
                name="nationality"
                label="nationality"
                rules={[{ required: true, message: 'Please input your Nationality!' }]}
              >
                <Input placeholder="Nationality" />
              </Form.Item>

              <Form.Item>
                <div className="add-user-bottom text-right">
                  <Button
                    className="ant-btn ant-btn-light"
                    onClick={() => {
                      return form.resetFields();
                    }}
                  >
                    Reset
                  </Button>
                  <Button htmlType="submit" type="primary" disabled={!isFormFilled || isLoading}>
                    Submit
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </div>
      </Col>
    </Row>
  );
}

export default Info;
