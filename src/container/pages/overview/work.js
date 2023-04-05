import React from 'react';
import { Row } from 'antd';
import './work.css'; // Import CSS file for styling

function Work() {
  return (
    <Row justify="center">
      <div className="card">
        <div className="card-header">
          <h3>Work Details</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <h4>By Who:</h4>
              <span>INNO</span>
            </div>
            <div className="col-4">
              <h4>To Whom:</h4>
              <span>Minister</span>
            </div>
            <div className="col-4">
              <h4>Report Date:</h4>
              <span>February 02, 2020</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h4>Details :</h4>
              <p>TGREBVCDDFGJGUOJHFDDYOUUIUJHGHGHFFFGF</p>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
}

export default Work;
