import DynamicTable from '@components/dynamic-table';
import { useAppDispatch } from '@rootStore';
import { usersSelectors } from '@selectors/users.selectors';
import { usersActions } from '@slices/users.slice';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ListLandlords = () => {
  const listLandlords = useSelector(usersSelectors.selectListLandlords);
  const dispatch = useAppDispatch();
  const cols = useMemo(() => {
    return [
      {
        title: 'ID',
        key: 'ma_chu_nha',
        dataIndex: 'ma_chu_nha',
      },
      {
        title: 'Name',
        key: 'ten_chu_nha',
        dataIndex: 'ten_chu_nha',
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
        title: 'Address',
        key: 'dia_chi',
        dataIndex: 'dia_chi',
      },
    ];
  }, []);

  useEffect(() => {
    dispatch(usersActions.getAllLandlords());
  }, []);
  return (
    <>
      <DynamicTable cols={cols} dataSource={listLandlords} rowKey='ma_chu_nha' />
    </>
  );
};

export default ListLandlords;
