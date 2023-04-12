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
                title="Welcome to the Admin Dashboard"
                subtitle="Ths dashboard provides a daily summary of incident and reporter counts. It enables users to quickly view the number of incidences that occurred during a given day, as well as the number of reporters who filed those incidences"
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
          {/* <Col xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <OverviewDataList />
            </Suspense>
          </Col> */}
        </Row>
      </Main>
    </>
  );
}

export default DemoTwo;
