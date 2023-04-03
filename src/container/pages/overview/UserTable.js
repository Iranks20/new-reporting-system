import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Table, Form, Input, message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import UilEye from '@iconscout/react-unicons/icons/uil-eye';
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
  const [userData, setUserData] = useState({});
  // const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  // useEffect calling
  // useEffect calling
  const showModal = (id) => {
    setState({
      ...state,
      visible: true,
      id,
    });
  };
  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
      update: {},
    });
  };
  const handleCancel = () => {
    onCancel();
    setUserData({});
    // setState({
    //   // ...state,
    //   id: null,
    // });
  };
  const handleRefresh = () => {
    fetch('http://100.25.26.230:5000/api/v2/users')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((user) => ({
          key: user.id,
          user: (
            <div className="user-info">
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
              {/* <Button className="btn-icon" type="primary" to="#" shape="circle">
                <UilEye />
              </Button> */}
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
        }));
        setUsersTableData(formattedData);
      });
  };
  const handleFormSubmit = () => {
    fetch(`http://100.25.26.230:5000/api/v2/users/${state.id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error === false) {
          // navigate('/admin/users/dataTable');
          message.info('admin user updated successful');
          setIsLoading(false);
          onCancel();
          handleRefresh();
        } else {
          setIsLoading(false);
          message.info('error occcured fill all requird fields and try again');
        }
        // Handle response data
      })
      .catch((error) => {
        console.error(error);
        message.info('unknown error occcured');
        setIsLoading(false);
      });
  };
  useEffect(() => {
    handleRefresh();
  }, []);
  // sdfyuiopiuyt
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
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  // const rowSelection = {
  //   getCheckboxProps: (record) => ({
  //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            // rowSelection={rowSelection}
            dataSource={usersTableData}
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
          <Button key="submit" type="primary" onClick={handleFormSubmit} disabled={isLoading}>
            Submit
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <div className="project-modal">
          <BasicFormWrapper>
            <Form name="contact">
              <Form.Item label="id" name="id" initialValue={state.id}>
                <Input disabled />
              </Form.Item>
              {usersTableData.map((user) => {
                if (user.id === state.id) {
                  return (
                    <React.Fragment key={user.id}>
                      <Form.Item label="Name" name="name" initialValue={user.name}>
                        <Input
                          value={userData.name}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              name: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label="Email" name="email" initialValue={user.email}>
                        <Input
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              email: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label="Phone Number" name="phone" initialValue={user.phoneNumber}>
                        <Input
                          value={userData.phoneNumber}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label="Company" name="company" initialValue={user.company}>
                        <Input
                          value={userData.company}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              company: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label="Position" name="position" initialValue={user.position}>
                        <Input
                          value={userData.position}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              position: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      {/* <Button htmlType="submit" size="default" type="primary" key="submit">
                        Submit
                      </Button> */}
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </Form>
          </BasicFormWrapper>
        </div>
      </Modal>
    </Cards>
  );
}

export default UserListTable;
