import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Row, Col, Select } from 'antd';
// import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEllipsisH from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
// import DataTable from '../../components/table/DataTable';
import { Main, BorderLessHeading } from '../styled';
import DataTable from '../../components/table/DataTable';
import { Dropdown } from '../../components/dropdown/dropdown';
// import { Button } from '../../components/buttons/buttons';

function Tables() {
  const [tableData, setTableData] = useState([]);
  // console.log(tableData);
  const [selectedOption, setSelectedOption] = useState('Daily');
  console.log(selectedOption);

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Main',
    },
    {
      path: 'first',
      breadcrumbName: 'Incidence Table',
    },
  ];

  const handleRefresher = () => {
    let apiUrl = '';
    if (selectedOption === 'Daily') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/incidences/daily';
    } else if (selectedOption === 'Weekly') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/incidences/weekly';
    } else if (selectedOption === 'Monthly') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/incidences/monthly';
    } else if (selectedOption === 'All') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/incidences';
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
      apiUrl = 'http://100.25.26.230:5000/api/v1/incidences/daily';
    } else if (selectedOption === 'Weekly') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/incidences/weekly';
    } else if (selectedOption === 'Monthly') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/incidences/monthly';
    } else if (selectedOption === 'All') {
      apiUrl = 'http://100.25.26.230:5000/api/v1/incidences';
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
      const { id, incident, location, cordinates, byWho, toWhom, datetime, status } = item;
      tableDataScource.push({
        id: `${id}`,
        incident: <span className="ninjadash-username">{incident}</span>,
        location: <span className="ninjadash-username">{location}</span>,
        cordinates: <span>{cordinates}</span>,
        byWho: <span>{byWho}</span>,
        toWhom,
        // details: <span>{details}</span>,
        datetime,
        status: <span className={`ninjadash-status ninjadash-status-${status}`}>{status}</span>,
        action: (
          <Dropdown
            className="wide-dropdwon"
            content={
              <>
                <Link to={`/admin/users/add-user/work?id=${id}`}>View Details</Link>
                {/* <Link to="#" onClick={exportCsv}>
                  Export Csv
                </Link> */}
                {/* <Link to="#">Edit</Link>
                <Link to="#">Delete</Link> */}
              </>
            }
          >
            <Link to="#">
              <UilEllipsisH />
            </Link>
          </Dropdown>
        ),
        // action: (
        //   <div className="table-actions">
        //     <Button
        //       className="btn-icon"
        //       type="primary"
        //       shape="circle"
        //       onClick={() => {
        //         fetch(`http://100.25.26.230:5000/api/v1/incidences/status/${id}`, {
        //           method: 'PUT',
        //         })
        //           .then(() => {
        //             setTableData(tableData.filter((statu) => statu.id !== id));
        //             // message.success('Read updated successfully');
        //             handleRefresher();
        //             // handleRefresh();
        //           })
        //           .catch((error) => {
        //             console.error(error);
        //             message.error('An error occurred while updatig Read');
        //           });
        //       }}
        //     >
        //       <Link to={`/admin/users/add-user/work?id=${id}`}>
        //         <UilEye />
        //       </Link>
        //     </Button>
        //   </div>
        // ),
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
      title: 'Incident',
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
    // {
    //   title: 'Details',
    //   dataIndex: 'details',
    //   key: 'details',
    // },
    {
      title: 'Date $ Time',
      dataIndex: 'datetime',
      key: 'datetime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      <PageHeader className="ninjadash-page-header-main" title="Incidnces" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards title="Incidence Table">
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
                  {/* </Col> */}
                  {/* <Col> */}
                  {/* <div className="ninjadash-datatable-filter__right">
                    <Input size="default" placeholder="Search" />
                  </div> */}
                  {/* </Col> */}
                </Row>
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
