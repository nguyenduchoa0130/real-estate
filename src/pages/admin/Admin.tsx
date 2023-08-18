import { Button, Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <>
      <div className='h-100'>
        <Layout hasSider className='bg-white'>
          <Layout.Sider trigger={null} collapsible collapsed={isCollapsed}>
            <Button onClick={() => setIsCollapsed(!isCollapsed)}>Trigger</Button>
          </Layout.Sider>
          <Layout.Content>
            <div className="p-3">
              <Outlet />
            </div>
          </Layout.Content>
        </Layout>
      </div>
    </>
  );
};

export default Admin;