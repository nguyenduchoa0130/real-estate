import {
  CalendarOutlined,
  DollarOutlined,
  DownOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '@rootStore';
import { shareSelectors } from '@selectors/share.selectors';
import { shareActions } from '@slices/share.slice';
import { Button, Divider, Dropdown, Menu, MenuProps, Space } from 'antd';
import { memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  const currentUser = useSelector(shareSelectors.selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = (): void => {
    dispatch(shareActions.logout());
    return navigate('/');
  };

  const userMenuItems = useMemo(() => {
    return [
      {
        key: 'profile',
        label: (
          <NavLink to='/profile'>
            <Button type='link' icon={<ProfileOutlined />}>
              My profile
            </Button>
          </NavLink>
        ),
      },
      {
        key: 'logout',
        label: (
          <Button type='link' icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Button>
        ),
      },
    ];
  }, []);

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
        {currentUser ? (
          <Space>
            {currentUser.LoaiTK === 'Nhan vien' && (
              <NavLink to='/admin'>
                <Button type='primary' size='large' icon={<SettingOutlined />}>
                  Admin
                </Button>
              </NavLink>
            )}
            {currentUser.LoaiTK === 'Chu nha' && (
              <NavLink to='/my-houses'>
                <Button type='primary' size='large' icon={<HomeOutlined />}>
                  My houses
                </Button>
              </NavLink>
            )}
            <Dropdown menu={{ items: userMenuItems }}>
              <Button icon={<UserOutlined />} size='large'>
                <span>
                  Hi, {currentUser.HoTen || currentUser.ten_chu_nha || currentUser.ten_nhan_vien}
                </span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        ) : (
          <Space direction='horizontal' split={<Divider type='vertical' />}>
            <NavLink to='/login'>
              <Button size='large' type='dashed'>
                Login
              </Button>
            </NavLink>
            <NavLink to='/register'>
              <Button size='large' type='primary'>
                Register
              </Button>
            </NavLink>
          </Space>
        )}
      </div>
    </>
  );
};

export default memo(Header);
