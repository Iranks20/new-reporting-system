import React, { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import Dashboard from './admin/dashboard';
import AuthLayout from '../container/profile/authentication/Index';

const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));
const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const OtpPassword = lazy(() => import('../container/profile/authentication/overview/OtpPassword'));
const ChangePassword = lazy(() => import('../container/profile/authentication/overview/ChangePassword'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const FbLogin = lazy(() => import('../container/profile/authentication/overview/FbSignIn'));
const FbSignUp = lazy(() => import('../container/profile/authentication/overview/FbSignup'));
const NotFound = lazy(() => import('../container/pages/404'));

const AuthRoot = () => {
  const navigate = useNavigate();

  useEffect(() => navigate('/'));
};

const FrontendRoutes = React.memo(() => {
  return (
    <Routes>
      <Route index element={<Login />} />
      {/* <Route index path="adminz" element={<Dashboard />} /> */}
      <Route path="forgotPassword" element={<ForgotPass />} />
      <Route path="register" element={<SignUp />} />
      <Route path="otppassword" element={<OtpPassword />} />
      <Route path="changepassword" element={<ChangePassword />} />
      <Route path="fbRegister" element={<FbSignUp />} />
      <Route path="fbSignIn" element={<FbLogin />} />
      <Route path="*" element={<NotFound />} />
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

export default AuthLayout(FrontendRoutes);
