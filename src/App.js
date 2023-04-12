import { ConfigProvider, Spin } from 'antd';
import 'antd/dist/antd.less';
import React, { useEffect, useState, lazy } from 'react';
import { Provider, useSelector } from 'react-redux';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import SimpleReactLightbox from 'simple-react-lightbox';
import { ThemeProvider } from 'styled-components';
import ProtectedRoute from './components/utilities/protectedRoute';
import config from './config/config';
import store, { rrfProps } from './redux/store';

import Admin from './routes/admin';
// import DemoTwo from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';

const NotFound = lazy(() => import('./container/pages/404'));

const { themeColor } = config;

function ProviderConfig() {
  const { rtl, isLoggedIn, topMenu, mainContent, auth } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      mainContent: state.ChangeLayoutMode.mode,
      isLoggedIn: state.auth.login,
      auth: state.fb.auth,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...themeColor, rtl, topMenu, mainContent }}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          {!isLoaded(auth) ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            <SimpleReactLightbox>
              <HashRouter>
                {!isLoggedIn ? (
                  <Routes>
                    <Route path="/*" element={<Auth />} />
                    <Route path="/admin*" element={<Admin />} />
                  </Routes>
                ) : (
                  <Routes>
                    <Route path="/admin*" element={<ProtectedRoute path="/*" Component={Admin} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                )}
                {isLoggedIn && (path === '/admin*' || path === '/*') && (
                  <Routes>
                    <Route path="/" element={<Navigate to="/admin/demo-2" />} />
                  </Routes>
                )}
              </HashRouter>
            </SimpleReactLightbox>
          )}
        </ReactReduxFirebaseProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default App;

// import { ConfigProvider, Spin } from 'antd';
// import 'antd/dist/antd.less';
// import React, { lazy } from 'react';
// import { Provider, useSelector } from 'react-redux';
// import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

// import SimpleReactLightbox from 'simple-react-lightbox';
// import { ThemeProvider } from 'styled-components';
// import ProtectedRoute from './components/utilities/protectedRoute';
// import config from './config/config';
// import store, { rrfProps } from './redux/store';

// // import Admin from './routes/admin';
// import DemoTwo from './routes/admin';
// import Auth from './routes/auth';
// import './static/css/style.css';

// const NotFound = lazy(() => import('./container/pages/404'));

// const { themeColor } = config;

// function ProviderConfig() {
//   const { rtl, topMenu, mainContent } = useSelector((state) => {
//     return {
//       rtl: state.ChangeLayoutMode.rtlData,
//       topMenu: state.ChangeLayoutMode.topMenu,
//       mainContent: state.ChangeLayoutMode.mode,
//       // isLoggedIn: state.auth.login,
//       // auth: state.fb.auth,
//     };
//   });

//   // const [setPath] = useState(window.location.pathname);

//   // useEffect(() => {
//   //   let unmounted = false;
//   //   if (!unmounted) {
//   //     setPath(window.location.pathname);
//   //   }
//   //   // eslint-disable-next-line no-return-assign
//   //   return () => (unmounted = true);
//   // }, [setPath]);

//   return (
//     <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
//       <ThemeProvider theme={{ ...themeColor, rtl, topMenu, mainContent }}>
//         <ReactReduxFirebaseProvider {...rrfProps}>
//           <div className="spin">
//             <Spin />
//             <p>how are you</p>
//           </div>
//           <SimpleReactLightbox>
//             <Router>
//               <Routes>
//                 <Route path="/*" element={<Auth />} />
//               </Routes>
//               <Routes>
//                 <Route path="/admin*" element={<ProtectedRoute path="/*" Component={DemoTwo} />} />
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//               <Routes>
//                 <Route path="/" element={<Navigate to="/admin/demo-2" />} />
//               </Routes>
//             </Router>
//             ,
//           </SimpleReactLightbox>
//         </ReactReduxFirebaseProvider>
//       </ThemeProvider>
//     </ConfigProvider>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <ProviderConfig />
//     </Provider>
//   );
// }

// export default App;
