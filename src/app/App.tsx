import Footer from '@layouts/footer';
import Header from '@layouts/header';
import LoadingSpinner from '@layouts/loading-spinner';
import { Layout } from 'antd';
import AppRoutes from './AppRoutes';
import styles from './styles.module.scss';

const App = () => {
  return (
    <>
      <Layout>
        <Layout.Header className={styles['layout-header']}>
          <Header />
        </Layout.Header>
        <Layout.Content className={styles['layout-main-content']}>
          <AppRoutes />
        </Layout.Content>
        <Layout.Footer className={styles['layout-footer']}>
          <Footer />
        </Layout.Footer>
      </Layout>
      <LoadingSpinner />
    </>
  );
};

export default App;