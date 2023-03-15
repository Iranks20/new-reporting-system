import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import DataTable from '../../components/table/DataTable';
import { Main, BorderLessHeading } from '../styled';

function DataTables() {
  const [tableData, setTableData] = useState([]);

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Table',
    },
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/reporters')
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.log(error));
  }, []);

  const tableDataScource = [];

  if (tableData.length > 0) {
    tableData.forEach((item) => {
      const { id, firstName, lastName, email, sex, phoneNumber, datetime } = item;
      tableDataScource.push({
        id: `#${id}`,
        first_name: <span className="ninjadash-username">{firstName}</span>,
        last_name: <span className="ninjadash-username">{lastName}</span>,
        email: <span>{email}</span>,
        sex: <span>{sex}</span>,
        phone_number: phoneNumber,
        datetime,
        action: (
          <div className="table-actions">
            <Link className="view" to="#">
              <UilEye />
            </Link>
          </div>
        ),
      });
    });
  }

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Date $ Time',
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
    <>
      <PageHeader className="ninjadash-page-header-main" title="Reporters" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards title="Reporters Table">
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={tableDataScource}
                  columns={dataTableColumn}
                  rowSelection={false}
                />
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>
    </>
  );
}
export default DataTables;
