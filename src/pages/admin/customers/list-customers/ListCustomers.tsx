import DynamicTable from '@components/dynamic-table';
import moment from 'moment';
import { useMemo } from 'react';

const ListCustomers = () => {
  const cols = useMemo(() => {
    return [
      {
        title: 'ID',
        key: 'MaKH',
        dataIndex: 'MaKH',
      },
      {
        title: 'Name',
        key: 'HoTen',
        dataIndex: 'HoTen',
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
        title: 'Birthday',
        key: 'ngay_sinh',
        dataIndex: 'ngay_sinh',
        render: (val) => val && moment(val).format('MM/DD/YYYY'),
      },
    ];
  }, []);
  return (
    <>
      <DynamicTable cols={cols} dataSource={[]} rowKey='ma_chu_nha' />
    </>
  );
};

export default ListCustomers;
