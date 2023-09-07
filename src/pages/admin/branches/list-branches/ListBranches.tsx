import DynamicTable from '@components/dynamic-table';
import { useAppDispatch } from '@rootStore';
import { branchesSelectors } from '@selectors/branches.selectors';
import { branchesActions } from '@slices/branches.slice';
import AlertUtil from '@utils/alert.util';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ListBranches = () => {
  const listBranches = useSelector(branchesSelectors.selectListBranches);
  const dispatch = useAppDispatch();
  const cols = useMemo(() => {
    return [
      {
        title: 'ID',
        key: 'ma_chi_nhanh',
        dataIndex: 'ma_chi_nhanh',
      },
      {
        title: 'Street',
        key: 'duong',
        dataIndex: 'duong',
      },
      {
        title: 'District',
        key: 'quan',
        dataIndex: 'quan',
      },
      {
        title: 'City',
        key: 'thanh_pho',
        dataIndex: 'thanh_pho',
      },
      {
        title: 'Areas',
        key: 'khu_vuc',
        dataIndex: 'khu_vuc',
      },
      {
        title: 'Phone number',
        key: 'so_dien_thoai',
        dataIndex: 'so_dien_thoai',
      },
      {
        title: 'FAX',
        key: 'so_fax',
        dataIndex: 'so_fax',
      },
    ];
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(branchesActions.getAllBranches());
      } catch (error) {
        AlertUtil.showError(error?.response?.data?.message || error.message);
      }
    };

    initialize();
  }, []);

  return (
    <>
      <DynamicTable cols={cols} dataSource={listBranches} />
    </>
  );
};

export default ListBranches;
