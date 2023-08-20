import { CalendarOutlined, DollarOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Menu, MenuProps } from 'antd';
import { memo, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';

const menuItems: MenuProps['items'] = [
  {
    label: <NavLink to='/'>Home</NavLink>,
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: <NavLink to='/for-sales'>House for sales</NavLink>,
    key: '/for-sales',
    icon: <DollarOutlined />,
  },
  {
    label: <NavLink to='/for-rent'>House for Rent</NavLink>,
    key: '/for-rent',
    icon: <CalendarOutlined />,
  },
];

const Header = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<string>(null);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div className={styles.header}>
        <nav className={styles['header-nav']}>
          <NavLink to='/'>
            <img src='/assets/svg/logo.svg' alt='Logo' />
          </NavLink>
          <Menu
            items={menuItems}
            mode='horizontal'
            className={styles['header-menu']}
            selectedKeys={[currentPage]}
          />
        </nav>
        <NavLink to='/login-or-register'>
          <Button size='large' type='dashed'>
            Login or Register
          </Button>
        </NavLink>
      </div>
    </>
  );
};

export default memo(Header);
