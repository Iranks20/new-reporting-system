import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, message } from 'antd';
import { Button } from '../../../components/buttons/buttons';
import './work.css'; // Import CSS file for styling

function Work() {
  const [data, setData] = useState([]);
  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id');
  const handleRefresh = () => {
    fetch(`http://100.25.26.230:5000/api/v1/incidences/${id}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));
  };
  const markAsRead = () => {
    fetch(`http://100.25.26.230:5000/api/v1/incidences/status/${id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        handleRefresh();
      })
      .catch((error) => {
        console.log(error);
        message.error('An error occurred while updatig Read');
      });
  };
  useEffect(() => {
    handleRefresh();
  }, [id]);
  // if (!data) {
  //   return <div>Loading...</div>;
  // }
  console.log(data);
  return (
    <Row justify="center">
      <div className="card">
        <div className="card-header">
          <h3>Incident details No {id}</h3>
        </div>
        {data.map((dataObj) => {
          return (
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <h4>By Who:</h4>
                  <span>{dataObj.byWho}</span>
                </div>
                <div className="col-4">
                  <h4>To Whom:</h4>
                  <span>{dataObj.toWhom}</span>
                </div>
                <div className="col-4">
                  <h4>Report Date:</h4>
                  <span>{dataObj.datetime}</span>
                </div>
                <div className="col-4">
                  <h4>Status:</h4>
                  <span>
                    <Button size="default" shape="circle" type="success">
                      {dataObj.status}
                    </Button>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h4>Details :</h4>
                  <p>{dataObj.details}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="add-user-bottom text-right">
        <Button size="default" outlined shape="circle" type="danger" onClick={markAsRead}>
          Mark Read
        </Button>
      </div>
    </Row>
  );
}

export default Work;
