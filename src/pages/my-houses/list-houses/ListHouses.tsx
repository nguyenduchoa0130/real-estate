import DynamicTable from '@components/dynamic-table';
import { useAppDispatch } from '@rootStore';
import { housesSelectors } from '@selectors/houses.selectors';
import { shareSelectors } from '@selectors/share.selectors';
import { housesActions } from '@slices/houses.slice';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ListHouses = () => {
  const listHouses = useSelector(housesSelectors.selectListHouses);
  const dispatch = useAppDispatch();
  const currentUser = useSelector(shareSelectors.selectCurrentUser);
  const cols = useMemo(() => {
    return [
      {
        title: 'ID',
        key: 'ma_nha',
        dataIndex: 'ma_nha',
      },
      {
        title: 'House type',
        key: 'ten_loai_nha',
        dataIndex: 'ten_loai_nha',
      },
      {
        title: 'Rooms',
        key: 'so_luong_phong_o',
        dataIndex: 'so_luong_phong_o',
      },
      {
        title: 'Views',
        key: 'so_luot_xem',
        dataIndex: 'so_luot_xem',
      },
      {
        title: 'Price',
        key: 'price',
        render: (_, record) => record.gia_ban || record.tien_thue_1_thang,
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
        title: 'Street',
        key: 'duong',
        dataIndex: 'duong',
      },
      {
        title: 'Expiration date',
        key: 'ngay_het_han',
        dataIndex: 'ngay_het_han',
        render: (val) => val && moment(val).format('MM/DD/YYYY'),
      },
      {
        title: 'Status',
        key: 'trang_thai',
        dataIndex: 'trang_thai',
      },
    ];
  }, []);

  useEffect(() => {
    dispatch(housesActions.getListHousesByLandlordId(currentUser.ma_chu_nha));
  }, []);
  return (
    <>
      <DynamicTable cols={cols} dataSource={listHouses} rowKey='ma_nha' />
    </>
  );
};

export default ListHouses;
