import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Table } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

function UserListTable() {
  const [usersTableData, setUsersTableData] = useState([]);

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
              <Button className="btn-icon" type="info" to="#" shape="circle">
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
    </Cards>
  );
}

export default UserListTable;
