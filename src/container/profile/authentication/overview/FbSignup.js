import React, { useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f';
import UilTwitter from '@iconscout/react-unicons/icons/uil-twitter';
import UilGithub from '@iconscout/react-unicons/icons/uil-github';
import { AuthFormWrap } from './style';

import {
  fbAuthSignUp,
  fbAuthLoginWithGoogle,
  fbAuthLoginWithFacebook,
} from '../../../../redux/firebase/auth/actionCreator';
import { login } from '../../../../redux/authentication/actionCreator';

function SignUp() {
  const { isSignUpError, isSignUpLoading, isFbAuthenticate } = useSelector((state) => {
    return {
      isSignUpError: state.firebaseAuth.isSignUpError,
      isSignUpLoading: state.firebaseAuth.isSignUpLoading,
      isFbAuthenticate: state.fb.auth.uid,
    };
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFbLogin = useCallback(() => {
    dispatch(login());
    navigate('/admin');
  }, [dispatch, navigate]);

  useEffect(() => {
    if (isFbAuthenticate) {
      handleFbLogin();
    }
  }, [isFbAuthenticate, handleFbLogin]);

  const handleSubmit = (values) => {
    dispatch(fbAuthSignUp({ ...values }));
  };

  return (
    <Row justify="center">
      <Col lg={6}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">Firebase Sign Up GoDash</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="register" onFinish={handleSubmit} layout="vertical">
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Full name!' }]}>
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              {isSignUpError ? <p>{isSignUpError.message}</p> : null}
              <Form.Item>
                <Button disabled={isSignUpLoading} className="btn-create" htmlType="submit" type="primary" size="large">
                  {isSignUpLoading ? 'Loading...' : 'Create Account'}
                </Button>
              </Form.Item>
              <p className="ninjadash-form-divider">
                <span>Or</span>
              </p>
              <ul className="ninjadash-social-login">
                <li>
                  <Link onClick={() => dispatch(fbAuthLoginWithGoogle)} className="google-social" to="#">
                    <ReactSVG src={require(`../../../../static/img/icon/google-plus.svg`).default} />
                  </Link>
                </li>
                <li>
                  <Link onClick={() => dispatch(fbAuthLoginWithFacebook)} className="facebook-social" to="#">
                    <UilFacebook />
                  </Link>
                </li>
                <li>
                  <Link className="twitter-social" to="#">
                    <UilTwitter />
                  </Link>
                </li>
                <li>
                  <Link className="github-social" to="#">
                    <UilGithub />
                  </Link>
                </li>
              </ul>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              Already have an account?<Link to="/fbSignIn">Sign In</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignUp;
