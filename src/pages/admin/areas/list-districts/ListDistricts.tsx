import DynamicTable from '@components/dynamic-table';
import { useAppDispatch } from '@rootStore';
import { addressesSelectors } from '@selectors/addresses.selectors';
import { addressesActions } from '@slices/addresses.slice';
import { Button } from 'antd';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ListAddresses = () => {
  const districts = useSelector(addressesSelectors.selectDistricts);
  const dispatch = useAppDispatch();

  const cols = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'District',
        dataIndex: 'name',
        key: 'name',
      },
    ];
  }, []);

  useEffect(() => {
    dispatch(addressesActions.getAllDistricts());
  }, []);

  return (
    <>
      <DynamicTable cols={cols} dataSource={districts} isShowSearch searchBy={['name']} />
    </>
  );
};

export default ListAddresses;
