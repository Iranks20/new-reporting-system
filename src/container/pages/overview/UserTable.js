import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Table, Form, Input } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
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
  const showModal = () => {
    setState({
      ...state,
      visible: true,
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
  };
  // const showConfirm = () => {
  //   alertModal.confirm({
  //     title: 'Do you want to delete these items?',
  //     content: 'When clicked the OK button, this dialog will be closed after 1 second',
  //     onOk() {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  //       }).catch(() => {});
  //     },
  //     onCancel() {},
  //   });
  // };

  useEffect(() => {
    fetch('http://localhost:5000/api/v2/users')
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
              <Button className="btn-icon" type="primary" to="#" shape="circle">
                <UilEye />
              </Button>
              <Button className="btn-icon" type="info" shape="circle" onClick={showModal}>
                <UilEdit />
              </Button>
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <UilTrashAlt />
              </Button>
            </div>
          ),
        }));
        setUsersTableData(formattedData);
      });
  }, []);
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

  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            rowSelection={rowSelection}
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
        footer={null}
        onCancel={handleCancel}
      >
        <div className="project-modal">
          <BasicFormWrapper>
            <Form name="contact">
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

              <Form.Item name="phone" label="Phone Number">
                <Input placeholder="+440 2546 5236" />
              </Form.Item>

              <Form.Item name="designation" label="Position">
                <Input placeholder="Input Position" />
              </Form.Item>

              <Form.Item name="company" label="Company Name">
                <Input placeholder="Company Name" />
              </Form.Item>

              <Button htmlType="submit" size="default" type="primary" key="submit">
                Add New Contact
              </Button>
            </Form>
          </BasicFormWrapper>
        </div>
      </Modal>
    </Cards>
  );
}

export default UserListTable;
