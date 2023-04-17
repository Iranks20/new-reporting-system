import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Row, Col, Select } from 'antd';
// import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEllipsisH from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
// import DataTable from '../../components/table/DataTable';
import { Main, BorderLessHeading, DataTableStyleWrap } from '../styled';
import { Dropdown } from '../../components/dropdown/dropdown';
import DataTable from '../../components/table/DataTable';
// import { Button } from '../../components/buttons/buttons';

function Tables() {
  const [tableData, setTableData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Daily');

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Main',
    },
    {
      path: 'first',
      breadcrumbName: 'App Users Table',
    },
  ];

  const handleRefresher = () => {
    let apiUrl = '';
    if (selectedOption === 'Daily') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/reporters/daily';
    } else if (selectedOption === 'Weekly') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/reporters/weekly';
    } else if (selectedOption === 'Monthly') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/reporters/monthly';
    } else if (selectedOption === 'All') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/reporters';
    }

    if (apiUrl !== '') {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setTableData(data))
        .catch((error) => console.log(error));
    }
  };
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  function exportCsv() {
    let apiUrl = '';
    if (selectedOption === 'Daily') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/reporters/daily';
    } else if (selectedOption === 'Weekly') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/reporters/weekly';
    } else if (selectedOption === 'Monthly') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/reporters/monthly';
    } else if (selectedOption === 'All') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/reporters';
    }

    if (apiUrl !== '') {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const csvData = Papa.unparse(data);
          const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
          saveAs(blob, 'data.csv');
        })
        .catch((error) => console.log(error));
    }
  }

  const tableDataScource = [];

  if (tableData.length > 0) {
    tableData.forEach((item) => {
      const { id, firstName, lastName, email, sex, phoneNumber, datetime } = item;
      tableDataScource.push({
        id: `${id}`,
        firstName: <span className="ninjadash-username">{firstName}</span>,
        lastName: <span className="ninjadash-username">{lastName}</span>,
        email: <span>{email}</span>,
        sex: <span>{sex}</span>,
        phoneNumber: <span>{phoneNumber}</span>,
        datetime,
        // status: <span className={`ninjadash-status ninjadash-status-${status}`}>{status}</span>,
        action: (
          <div className="table-actions">
            {/* <Button
              className="btn-icon"
              type="primary"
              shape="circle"
              onClick={() => {
                fetch(`http://100.25.26.230:5000/api/v1/reporters/status/${id}`, {
                  method: 'PUT',
                })
                  .then(() => {
                    setTableData(tableData.filter((statu) => statu.id !== id));
                    // message.success('Read updated successfully');
                    handleRefresher();
                    // handleRefresh();
                  })
                  .catch((error) => {
                    console.error(error);
                    message.error('An error occurred while updatig Read');
                  });
              }}
            >
              <UilEye />
            </Button> */}
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link to="#" onClick={exportCsv}>
                    Export Csv
                  </Link>
                </>
              }
            >
              <UilEllipsisH />
            </Dropdown>
          </div>
        ),
      });
    });
  }
  useEffect(() => {
    handleRefresher();
  }, [selectedOption]);

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
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
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Date $ Time',
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

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="App Users" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards title="App Users Table">
                <DataTableStyleWrap>
                  <Row>
                    {/* <Col> */}
                    {/* <div className="ninjadash-datatable-filter__input">
                      <span className="label">Id:</span>
                      <Input placeholder="Search with Id" />
                    </div> */}
                    {/* </Col> */}
                    {/* <Col> */}
                    <div className="ninjadash-datatable-filter__input">
                      <span className="label">Actions:</span>
                      <Select style={{ width: 200 }} value={selectedOption} onChange={handleOptionChange}>
                        <Select.Option value="Daily">Daily</Select.Option>
                        <Select.Option value="Weekly">Weekly</Select.Option>
                        <Select.Option value="Monthly">Monthly</Select.Option>
                        <Select.Option value="All">All</Select.Option>
                      </Select>
                    </div>
                    {/* </Col> */}
                    {/* <Col> */}
                    {/* <Dropdown
                      className="wide-dropdwon"
                      content={
                        <>
                          <Link to="#" onClick={exportCsv}>
                            Export Csv
                          </Link>
                        </>
                      }
                    >
                      <UilEllipsisH />
                    </Dropdown> */}
                    {/* </Col> */}
                    {/* <Col> */}
                    {/* <div className="ninjadash-datatable-filter__right">
                      <Input size="default" placeholder="Search" />
                    </div> */}
                    {/* </Col> */}
                  </Row>
                </DataTableStyleWrap>
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
