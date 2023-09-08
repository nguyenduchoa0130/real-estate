import {
  BranchesOutlined,
  CrownOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Typography } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';

interface MenuItem {
  path: string;
  label: string;
  icon: ReactNode;
  activeKey: string;
}

const menuItems: MenuItem[] = [
  {
    path: '',
    label: 'Dashboard',
    activeKey: 'admin',
    icon: <PieChartOutlined />,
  },
  {
    path: 'staffs',
    label: 'Staffs',
    activeKey: 'staffs',
    icon: <UserOutlined />,
  },
  {
    path: 'landlords',
    label: 'Landlords',
    activeKey: 'landlords',
    icon: <CrownOutlined />,
  },
  {
    path: 'customers',
    label: 'Customers',
    activeKey: 'customers',
    icon: <TeamOutlined />,
  },
  {
    path: 'branches',
    label: 'Branches',
    activeKey: 'branches',
    icon: <BranchesOutlined />,
  },
  {
    path: 'houses',
    label: 'Houses',
    activeKey: 'houses',
    icon: <HomeOutlined />,
  },
];

const Admin = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>('admin');
  const location = useLocation();

  useEffect(() => {
    const segment = location.pathname.split('/').pop();
    setCurrentPage(segment);
  }, [location.pathname]);

  return (
    <>
      <div className='h-100'>
        <Layout hasSider className='bg-white h-100'>
          <Layout.Sider
            trigger={null}
            collapsible
            collapsed={isCollapsed}
            className='bg-transparent h-100'>
            <div className='pt-3 h-100'>
              <div className='flex ai-center jc-center border-right pb-2'>
                <Button
                  type={!isCollapsed ? 'primary' : 'default'}
                  danger={!isCollapsed}
                  onClick={() => setIsCollapsed(!isCollapsed)}>
                  {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
              </div>
              <Menu mode='inline' className={styles['admin-menu']}>
                {menuItems.map((item, idx) => (
                  <Menu.Item
                    key={`menu-item-${idx}`}
                    className={currentPage === item.activeKey ? 'ant-menu-item-selected' : ''}>
                    <NavLink to={item.path} className='flex ai-center'>
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </Layout.Sider>
          <Layout.Content>
            <div className='p-3'>
              <Typography.Title className='text-uppercase'>{currentPage}</Typography.Title>
              <hr />
              <Outlet />
            </div>
          </Layout.Content>
        </Layout>
      </div>
    </>
  );
};

export default Admin;
