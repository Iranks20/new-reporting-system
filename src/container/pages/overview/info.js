import React, { useState } from 'react';
import { Row, Col, Form, message, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';

function Info() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v2/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);
      setIsLoading(false);
      message.info('Admin user added successfully');
      // toast('API response:', data);
      navigate('/admin/users/dataTable');

      // TODO: handle success or error state
    } catch (error) {
      console.error('API error:', error);
      // TODO: handle error state
      setIsLoading(false);
      message.info('Fill the required fields or else internal server error');
      // toast('API error:', error);
    }
  };

  return (
    <Row justify="center">
      {/* <ToastContainer /> */}
      <Col xxl={10} xl={14} md={16} xs={24}>
        <div className="user-info-form">
          <BasicFormWrapper>
            <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit}>
              <Heading className="form-title" as="h4">
                Personal Information
              </Heading>

              <Form.Item label="Name" name="name">
                <Input placeholder="Input Name" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>

              <Form.Item name="phoneNumber" label="PhoneNumber">
                <Input placeholder="+440 2546 5236" />
              </Form.Item>

              <Form.Item name="password" label="Password">
                <Input placeholder="UFHhdbd2000" />
              </Form.Item>

              <Form.Item name="company" label="Company">
                <Input placeholder="Company name" />
              </Form.Item>

              <Form.Item name="position" label="Position">
                <Input placeholder="Position" />
              </Form.Item>

              <Form.Item name="nationality" label="nationality">
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
                  <Button htmlType="submit" type="primary" disabled={isLoading}>
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
