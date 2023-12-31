import DynamicTable from '@components/dynamic-table';
import { useAppDispatch } from '@rootStore';
import { usersSelectors } from '@selectors/users.selectors';
import { usersActions } from '@slices/users.slice';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ListStaffs = () => {
  const listStaffs = useSelector(usersSelectors.selectListStaffs);
  const dispatch = useAppDispatch();
  const cols = useMemo(() => {
    return [
      {
        title: 'ID',
        key: 'ma_nhan_vien',
        dataIndex: 'ma_nhan_vien',
      },
      {
        title: 'Name',
        key: 'ten_nhan_vien',
        dataIndex: 'ten_nhan_vien',
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
      },
      {
        title: 'Phone number',
        key: 'so_dien_thoai',
        dataIndex: 'so_dien_thoai',
      },
      {
        title: 'Gender',
        key: 'gioi_tinh',
        dataIndex: 'gioi_tinh',
      },
      {
        title: 'Birthday',
        key: 'ngay_sinh',
        dataIndex: 'ngay_sinh',
        render: (val) => val && moment(val).format('MM/DD/YYYY'),
      },
      {
        title: 'Salary',
        key: 'luong',
        dataIndex: 'luong',
      },
    ];
  }, []);

  useEffect(() => {
    dispatch(usersActions.getAllStaffs());
  }, []);

  return (
    <>
      <DynamicTable cols={cols} dataSource={listStaffs} rowKey='ma_nhan_vien' />
    </>
  );
};

export default ListStaffs;
