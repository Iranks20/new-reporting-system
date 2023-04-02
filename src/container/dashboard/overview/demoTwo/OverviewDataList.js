import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import OverviewCard from '../../../../components/cards/OverviewCard';
import { OverviewDataStyleWrap } from '../../Style';

const OverviewDataList = React.memo(() => {
  const [dailyTotal, setDailyTotal] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [allTotal, setAllTotal] = useState(0);
  const [dailyReporters, setDailyReporters] = useState(0);
  const [weeklyReporters, setWeeklyReporters] = useState(0);
  const [monthlyReporters, setMonthlyReporters] = useState(0);
  const [allReporters, setAllReporters] = useState(0);

  useEffect(() => {
    const fetchDailyTotal = async () => {
      const response = await fetch('http://localhost:5000/api/v1/incidences/dailycounts');
      const data = await response.json();
      setDailyTotal(data[0].total);
    };

    const fetchWeeklyTotal = async () => {
      const response = await fetch('http://localhost:5000/api/v1/incidences/weeklycounts');
      const data = await response.json();
      setWeeklyTotal(data[0].total);
    };

    const fetchMonthlyTotal = async () => {
      const response = await fetch('http://localhost:5000/api/v1/incidences/monthlycounts');
      const data = await response.json();
      setMonthlyTotal(data[0].total);
    };

    const fetchAllTotal = async () => {
      const response = await fetch('http://localhost:5000/api/v1/incidences/countall');
      const data = await response.json();
      setAllTotal(data[0].total);
    };

    const fetchDailyReporters = async () => {
      const response = await fetch('http://localhost:5000/api/v1/reporters/dailycounts');
      const data = await response.json();
      setDailyReporters(data[0].total);
    };

    const fetchWeeklyReporters = async () => {
      const response = await fetch('http://localhost:5000/api/v1/reporters/weeklycounts');
      const data = await response.json();
      setWeeklyReporters(data[0].total);
    };

    const fetchMonthlyReporters = async () => {
      const response = await fetch('http://localhost:5000/api/v1/reporters/monthlycounts');
      const data = await response.json();
      setMonthlyReporters(data[0].total);
    };

    const fetchAllReporters = async () => {
      const response = await fetch('http://localhost:5000/api/v1/reporters/allreporters');
      const data = await response.json();
      setAllReporters(data[0].total);
    };

    fetchDailyTotal();
    fetchWeeklyTotal();
    fetchMonthlyTotal();
    fetchAllTotal();
    fetchDailyReporters();
    fetchWeeklyReporters();
    fetchMonthlyReporters();
    fetchAllReporters();
  }, []);

  return (
    <OverviewDataStyleWrap>
      <Row gutter={25}>
        <Col xxl={6} sm={12} xs={24}>
          <OverviewCard
            data={{
              id: 5,
              type: 'primary',
              icon: 'arrow-growth.svg',
              label: 'Daily Incidences',
              total: dailyTotal,
              suffix: '',
              prefix: '',
              status: 'growth',
              statusRate: 'loading',
              decimels: 0,
              separator: ',',
              dataPeriod: 'Today',
            }}
            contentFirst
            halfCircleIcon
          />
        </Col>
        <Col xxl={6} sm={12} xs={24}>
          <OverviewCard
            data={{
              id: 6,
              type: 'secondary',
              icon: 'users-alt.svg',
              label: 'Weekly Incidences',
              total: weeklyTotal,
              suffix: '',
              prefix: '',
              status: 'growth',
              statusRate: '',
              decimels: 0,
              dataPeriod: 'Since last week',
            }}
            contentFirst
            halfCircleIcon
          />
        </Col>
        <Col xxl={6} sm={12} xs={24}>
          <OverviewCard
            data={{
              id: 7,
              type: 'success',
              icon: 'dollar-circle.svg',
              label: 'Monthly Incidences',
              total: monthlyTotal,
              suffix: '',
              prefix: '',
              status: 'down',
              statusRate: '12.36',
              decimels: 0,
              dataPeriod: 'Since last month',
            }}
            contentFirst
            halfCircleIcon
          />
        </Col>
        <Col xxl={6} sm={12} xs={24}>
          <OverviewCard
            data={{
              id: 8,
              type: 'info',
              icon: 'speed-meter.svg',
              label: 'All Incidences',
              total: allTotal,
              suffix: '',
              prefix: '',
              status: 'growth',
              statusRate: '9.87',
              decimels: 0,
              dataPeriod: 'Since the start',
            }}
            contentFirst
            halfCircleIcon
          />
        </Col>
        <Col xxl={6} sm={12} xs={24}>
          <OverviewCard
            data={{
              id: 8,
              type: 'info',
              icon: 'speed-meter.svg',
              label: 'Daily Reporters',
              total: dailyReporters,
              suffix: '',
              prefix: '',
              status: 'growth',
              statusRate: '9.87',
              decimels: 0,
              dataPeriod: 'Today',
            }}
            contentFirst
            halfCircleIcon
          />
        </Col>
        <Col xxl={6} sm={12} xs={24}>
          <OverviewCard
            data={{
              id: 8,
              type: 'info',
              icon: 'speed-meter.svg',
              label: 'Weekly Reporters',
              total: weeklyReporters,
              suffix: '',
              prefix: '',
              status: 'growth',
              statusRate: '9.87',
              decimels: 0,
              dataPeriod: 'Since last week',
            }}
            contentFirst
            halfCircleIcon
          />
        </Col>
        <Col xxl={6} sm={12} xs={24}>
          <OverviewCard
            data={{
              id: 8,
              type: 'info',
              icon: 'speed-meter.svg',
              label: 'Monthly Reporters',
              total: monthlyReporters,
              suffix: '',
              prefix: '',
              status: 'growth',
              statusRate: '9.87',
              decimels: 0,
              dataPeriod: 'Since last months',
            }}
            contentFirst
            halfCircleIcon
          />
        </Col>
        <Col xxl={6} sm={12} xs={24}>
          <OverviewCard
            data={{
              id: 8,
              type: 'info',
              icon: 'speed-meter.svg',
              label: 'All Reporters',
              total: allReporters,
              suffix: '',
              prefix: '',
              status: 'growth',
              statusRate: '9.87',
              decimels: 0,
              dataPeriod: 'Since the start',
            }}
            contentFirst
            halfCircleIcon
          />
        </Col>
      </Row>
    </OverviewDataStyleWrap>
  );
});

export default OverviewDataList;
