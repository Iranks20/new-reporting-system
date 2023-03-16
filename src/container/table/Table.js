import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import DataTable from '../../components/table/DataTable';
import { Main, BorderLessHeading } from '../styled';

function Tables() {
  const [tableData, setTableData] = useState([]);

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Incidence Table',
    },
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/incidences')
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.log(error));
  }, []);

  const tableDataScource = [];

  if (tableData.length > 0) {
    tableData.forEach((item) => {
      const { id, incident, location, cordinates, byWho, toWhom, details, datetime } = item;
      tableDataScource.push({
        id: `#${id}`,
        incident: <span className="ninjadash-username">{incident}</span>,
        location: <span className="ninjadash-username">{location}</span>,
        cordinates: <span>{cordinates}</span>,
        byWho: <span>{byWho}</span>,
        toWhom,
        details,
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
      title: 'Incdent',
      dataIndex: 'incident',
      key: 'incident',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Cordinates',
      dataIndex: 'cordinates',
      key: 'cordinates',
    },
    {
      title: 'By Who',
      dataIndex: 'byWho',
      key: 'toWho',
    },
    {
      title: 'To whom',
      dataIndex: 'toWhom',
      key: 'toWhom',
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
export default Tables;
