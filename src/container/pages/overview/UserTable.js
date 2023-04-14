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
  const [state, setState] = useState({});
  const [userData, setUserData] = useState([]);
  const [editUserData, setEditUserData] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);

  // user data in the table
  const handleRefresh = () => {
    fetch('http://localhost:5000/api/v2/users')
      .then((response) => response.json())
      .then((data) => {
        setUsersTableData(data);
      });
  };

  // on system refresh/onload
  useEffect(() => {
    handleRefresh();
  }, []);

  const showModal = (id) => {
    setSelectedUserId(id);
    fetch(`http://localhost:5000/api/v2/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setEditUserData({});
        setState({
          ...state,
          visible: true,
        });
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while fetching user data');
      });
  };
  const onCancel = () => {
    setEditUserData({});
    setState({
      ...state,
      visible: false,
      editVisible: false,
      update: {},
    });
  };
  const handleCancel = () => {
    onCancel();
  };

  const handleUpdateUser = () => {
    fetch(`http://localhost:5000/api/v2/users/${selectedUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        message.success('User updated successfully');
        handleRefresh();
        onCancel();
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while updating user data');
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
                      fetch(`http://localhost:5000/api/v2/users/${user.id}`, {
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
        type={state.modalType}
        title="Contact Information"
        visible={state.visible}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateUser}>
            Update User
          </Button>,
        ]}
        onCancel={handleCancel}
        userData={userData}
      >
        <div className="project-modal">
          <BasicFormWrapper>
            {userData.map((userDataa) => {
              return (
                <Form name="contact">
                  <Form.Item label="id" name="id">
                    <Input defaultValue={userDataa.id} disabled />
                  </Form.Item>
                  <Form.Item label="Name" name="name">
                    <Input
                      // name="name"
                      defaultValue={userDataa.name}
                      onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
                    />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input
                      defaultValue={userDataa.email}
                      onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                    />
                  </Form.Item>
                  <Form.Item label="Phone Number" name="phone">
                    <Input
                      defaultValue={userDataa.phoneNumber}
                      onChange={(e) => setEditUserData({ ...editUserData, phoneNumber: e.target.value })}
                    />
                  </Form.Item>
                  <Form.Item label="Company" name="company">
                    <Input
                      defaultValue={userDataa.company}
                      onChange={(e) => setEditUserData({ ...editUserData, company: e.target.value })}
                    />
                  </Form.Item>
                  <Form.Item label="Position" name="position">
                    <Input
                      defaultValue={userDataa.position}
                      onChange={(e) => setEditUserData({ ...editUserData, position: e.target.value })}
                    />
                  </Form.Item>
                </Form>
              );
            })}
          </BasicFormWrapper>
        </div>
      </Modal>
    </Cards>
  );
}

export default UserListTable;
