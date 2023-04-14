import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Axios from './axios';
import Dashboard from './dashboard';
import Features from './features';
import Pages from './pages';
import Users from './users';
import Widgets from './widgets';
import withAdminLayout from '../../layout/withAdminLayout';

const KnowledgeBase = lazy(() => import('../../container/pages/knowledgeBase/Index'));
const AllArticle = lazy(() => import('../../container/pages/knowledgeBase/AllArticle'));
const KnowledgeSingle = lazy(() => import('../../container/pages/knowledgeBase/SingleKnowledge'));
const Components = lazy(() => import('./components'));
const Import = lazy(() => import('../../container/importExport/Import'));
const Export = lazy(() => import('../../container/importExport/Export'));
const Contact = lazy(() => import('../../container/contact/Contact'));
const ContactGrid = lazy(() => import('../../container/contact/ContactGrid'));
const ContactAddNew = lazy(() => import('../../container/contact/AddNew'));
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const Icons = lazy(() => import('./icons'));
const Tables = lazy(() => import('./table'));
const Firebase = lazy(() => import('./firebase'));
const NotFound = lazy(() => import('../../container/pages/404'));

const Admin = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index path="/*" element={<Dashboard />} />
        <Route path="pages/*" element={<Pages />} />
        <Route path="all-articles" element={<AllArticle />} />
        <Route path="knowledgeBase/*" element={<KnowledgeBase />} />
        <Route path="knowledgebaseSingle/:id" element={<KnowledgeSingle />} />
        <Route path="components/*" element={<Components />} />
        <Route path="users/*" element={<Users />} />
        <Route path="importExport/import" element={<Import />} />
        <Route path="importExport/export" element={<Export />} />
        <Route path="contact/list" element={<Contact />} />
        <Route path="contact/grid" element={<ContactGrid />} />
        <Route path="contact/addNew" element={<ContactAddNew />} />
        <Route path="features/*" element={<Features />} />
        <Route path="profile/myProfile/*" element={<Myprofile />} />
        <Route path="icons/*" element={<Icons />} />
        <Route path="tables/*" element={<Tables />} />
        <Route path="widgets/*" element={<Widgets />} />
        <Route path="firestore/*" element={<Firebase />} />
        <Route path="axios/*" element={<Axios />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);
