import { BankOutlined, DollarOutlined } from '@ant-design/icons';
import { Button, Divider, Menu, MenuProps, Space } from 'antd';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

const menuItems: MenuProps['items'] = [
  {
    label: <NavLink to='/for-sales'>For sales</NavLink>,
    key: 'for-sales',
    icon: <DollarOutlined />,
  },
  {
    label: <NavLink to='/for-rent'>For rent</NavLink>,
    key: 'for-rent',
    icon: <BankOutlined />,
  },
];

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <nav className={styles['header-nav']}>
          <NavLink to='/'>
            <img src="/assets/svg/logo.svg" alt="Logo" />
          </NavLink>
          <Menu items={menuItems} mode='horizontal' className={styles['header-menu']} />
        </nav>
        <Space split={<Divider type='vertical' />}>
          <Button className={styles['header-btn']}>Login</Button>
          <Button className={styles['header-btn']}>Register</Button>
        </Space>
      </div>
    </>
  );
};

export default memo(Header);