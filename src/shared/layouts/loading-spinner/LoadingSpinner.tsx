import { Spin } from 'antd';
import { memo } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { shareSelectors } from '@selectors/share.selectors';

const LoadingSpinner = () => {
  const isLoading = useSelector(shareSelectors.selectIsLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <>
      <div className={styles.spinner}>
        <Spin size='large' />
      </div>
    </>
  );
};

export default memo(LoadingSpinner);