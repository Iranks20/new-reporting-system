import React, { useEffect, useState } from 'react';
import { Table, Form, Input, message } from 'antd';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper, BasicFormWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Modal } from '../../../components/modals/antd-modals';

function UserListTable() {
  const [usersTableData, setUsersTableData] = useState([]);
  // const [state, setState] = useState({});
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  console.log(userData);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  // user data in the table
  const handleRefresh = () => {
    fetch('http://100.25.26.230:5000/api/v2/users')
      .then((response) => response.json())
      .then((data) => {
        setUsersTableData(data);
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while fetching users user');
      });
  };

  // on system refresh/onload
  useEffect(() => {
    handleRefresh();
  }, []);

  const showModal = async (id) => {
    try {
      const response = await fetch(`http://100.25.26.230:5000/api/v2/users/${id}`);
      const data = await response.json();
      if (userData.length > 0) {
        form.setFieldsValue({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          company: data.company,
          position: data.position,
        });
      }
      setUserData(data);
      setVisible(true);
      form.resetFields();
      setModalKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error(error);
      message.error('An error occurred while fetching user data');
    }
    setSelectedUserId(id);
  };
  const onCancel = () => {
    setUserData([]);
    setVisible(false);
    form.resetFields();
    setModalKey((prevKey) => prevKey + 1);
    setSelectedUserId(null);
  };
  const handleCancel = () => {
    onCancel();
  };
  const handleUpdateUser = () => {
    form.validateFields().then((values) => {
      const updatedUser = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        company: values.company,
        position: values.position,
      };

      fetch(`http://100.25.26.230:5000/api/v2/users/${selectedUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then(() => {
          message.success('User updated successfully');
          handleRefresh();
          form.resetFields();
          setModalKey((prevKey) => prevKey + 1);
          setVisible(false);
        })
        .catch((error) => {
          console.error(error);
          message.error('An error occurred while updating user');
        });
    });
  };

  const usersTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Join Date',
      dataIndex: 'datetime',
      key: 'datetime',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={usersTableData.map((user, key) => ({
              user: (
                <div className="user-info" key={key}>
                  <figcaption>
                    <Heading className="user-name" as="h6">
                      {user.name}
                    </Heading>
                    <span className="user-designation">{user.designation}</span>
                  </figcaption>
                </div>
              ),
              id: user.id,
              email: user.email,
              phoneNumber: user.phoneNumber,
              company: user.company,
              position: user.position,
              datetime: user.datetime,
              action: (
                <div className="table-actions">
                  <Button className="btn-icon" type="info" shape="circle" onClick={() => showModal(user.id)}>
                    <UilEdit />
                  </Button>
                  <Button
                    className="btn-icon"
                    type="danger"
                    shape="circle"
                    onClick={() => {
                      fetch(`http://100.25.26.230:5000/api/v2/users/${user.id}`, {
                        method: 'DELETE',
                      })
                        .then(() => {
                          setUsersTableData(usersTableData.filter((item) => item.id !== user.id));
                          message.success('User deleted successfully');
                          handleRefresh();
                        })
                        .catch((error) => {
                          console.error(error);
                          message.error('An error occurred while deleting user');
                        });
                    }}
                  >
                    <UilTrashAlt />
                  </Button>
                </div>
              ),
            }))}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: usersTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
      <Modal
        key={modalKey}
        type={visible}
        title="Contact Information"
        visible={visible}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateUser}>
            Update User
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <BasicFormWrapper>
          {userData.map((userDataa) => {
            return (
              <Form form={form} layout="vertical" name="userForm">
                <Form.Item name="id" label="id" initialValue={userDataa.id}>
                  <Input disabled />
                </Form.Item>
                <Form.Item name="name" label="Name" initialValue={userDataa.name} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  initialValue={userDataa.email}
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  initialValue={userDataa.phoneNumber}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="company" label="Company" initialValue={userDataa.company} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="position"
                  label="Position"
                  initialValue={userDataa.position}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Form>
            );
          })}
        </BasicFormWrapper>
      </Modal>
    </Cards>
  );
}

export default UserListTable;
