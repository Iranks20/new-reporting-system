import {
  UilCreateDashboard,
  UilTable,
  // UilUsdCircle,
  UilUsersAlt,
  // UilWindowSection,
} from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
import { NavTitle } from './Style';
// import versions from '../demoData/changelog.json';
// import { changeLayoutMode } from '../redux/themeLayout/actionCreator';

function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { topMenu } = useSelector((state) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });

  // const dispatch = useDispatch();

  const path = '/admin';

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  // const changeLayout = (mode) => {
  //   dispatch(changeLayoutMode(mode));
  // };
  // const darkmodeActivated = () => {
  //   document.body.classList.add('dark-mode');
  // };

  // const darkmodeDiactivated = () => {
  //   document.body.classList.remove('dark-mode');
  // };

  const items = [
    getItem(t('dashboard'), 'dashboard', !topMenu && <UilCreateDashboard />, [
      // getItem(
      //   <NavLink onClick={toggleCollapsed} to={`${path}/demo-2`}>
      //     {t('Dashboard')}
      //   </NavLink>,
      //   'dashboard',
      //   null,
      // ),
    ]),
    // getItem(t('layouts'), 'layout', !topMenu && <UilWindowSection />, [
    //   getItem(
    //     <NavLink
    //       onClick={() => {
    //         toggleCollapsed();
    //         darkmodeDiactivated();
    //         changeLayout('lightMode');
    //       }}
    //       to="#"
    //     >
    //       {t('light')} {t('mode')}
    //     </NavLink>,
    //     'light',
    //     null,
    //   ),
    //   getItem(
    //     <NavLink
    //       onClick={() => {
    //         toggleCollapsed();
    //         darkmodeActivated();
    //         changeLayout('darkMode');
    //       }}
    //       to="#"
    //     >
    //       {t('dark')} {t('mode')}
    //     </NavLink>,
    //     'dark',
    //     null,
    //   ),
    // ]),
    getItem(
      !topMenu && <NavTitle className="ninjadash-sidebar-nav-title">{t('application')}</NavTitle>,
      'app-title',
      null,
      null,
      'group',
    ),
    getItem(t('Users'), 'users', !topMenu && <UilUsersAlt />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/users/dataTable`}>
          {t('Admin Users')}
        </NavLink>,
        'user-dataTable',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/tables/dataTable`}>
          {t('App Users')}
        </NavLink>,
        'dataTable',
        null,
      ),
    ]),
    getItem(t('Incidences'), 'table', !topMenu && <UilTable />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/tables/basic`}>
          {t('Incidences')}
        </NavLink>,
        'basicTable',
        null,
      ),
      // getItem(
      //   <NavLink onClick={toggleCollapsed} to={`${path}/tables/dataTable`}>
      //     {t('Reporters')}
      //   </NavLink>,
      //   'dataTable',
      //   null,
      // ),
    ]),
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
