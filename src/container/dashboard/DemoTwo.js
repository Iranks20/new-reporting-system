import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { PageHeaderBanner } from '../../components/banners/Banners';

const OverviewDataList = lazy(() => import('./overview/demoTwo/OverviewDataList'));

function DemoTwo() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Counting',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Dashboard" routes={PageRoutes} />

      <Main>
        <Row justify="center">
          <Col xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <PageHeaderBanner
                type="corporate"
                title="Hey! Welcome to the Admin Dashboard"
                subtitle="There are many variations of passages of Lorem Ipsum available,
                ut the majority have suffered passages of Lorem Ipsum available alteration in some form"
              />
            </Suspense>
          </Col>
          <Col xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <OverviewDataList />
            </Suspense>
          </Col>
          <Col xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <OverviewDataList />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default DemoTwo;
