import { PlusOutlined } from '@ant-design/icons';
import FormControlDatePicker from '@components/form-control-date-picker';
import FormControlDropdown from '@components/form-control-dropdown';
import FormControlInput from '@components/form-control-input';
import FormModal from '@components/form-modal';
import { House } from '@interfaces/house.interface';
import { Option } from '@interfaces/option.interface';
import { useAppDispatch } from '@rootStore';
import { housesSelectors } from '@selectors/houses.selectors';
import { shareSelectors } from '@selectors/share.selectors';
import { housesActions } from '@slices/houses.slice';
import { Button, Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const defaultFormValue = {
  ma_loai_nha: null,
  duong: null,
  quan: null,
  thanh_pho: null,
  khu_vuc: null,
  so_luong_phong_o: null,
  tien_thue_1_thang: null,
  ngay_het_han: null,
  gia_ban: null,
  dieu_kien_cua_chu_nha: null,
};

const CreateNewHouse = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors },
    watch,
    reset,
    handleSubmit,
  } = useForm<House>({
    defaultValues: defaultFormValue,
  });
  const houseTypes = useSelector(housesSelectors.selectHouseTypes);
  const currentUser = useSelector(shareSelectors.selectCurrentUser);

  const handleAddNewHoust = async (formValue: House) => {
    try {
      formValue.ngay_het_han = formValue.ngay_het_han.$d.toJSON();
      formValue.ma_chu_nha = currentUser.ma_chu_nha || null;
      formValue.ngay_dang = new Date().toJSON();
      formValue.ma_chi_nhanh = null;
      formValue.ma_nhan_vien_phu_trach = null;
      formValue.trang_thai = 'Con han';
      formValue.so_luot_xem = 0;
      const response = await dispatch(housesActions.createNewHouse(formValue));
      if (response.meta.requestStatus === 'fulfilled') {
        reset(defaultFormValue);
        setIsOpen(false);
        dispatch(housesActions.getListHousesByLandlordId(currentUser.ma_chu_nha));
      }
    } catch (error) {}
  };

  const houseTypeOptions = useMemo(() => {
    return houseTypes.map(
      (houseType): Option<number> => ({
        label: houseType.ten_loai_nha,
        value: houseType.ma_loai_nha,
      }),
    );
  }, [houseTypes]);

  useEffect(() => {
    dispatch(housesActions.getAllHouseTypes());
  }, []);

  return (
    <>
      <div className='flex ai-center jc-start'>
        <Button type='primary' icon={<PlusOutlined />} size='large' onClick={() => setIsOpen(true)}>
          Add
        </Button>
      </div>
      <FormModal
        title='New house'
        isOpen={isOpen}
        width={'50vw'}
        okBtnText='Create'
        onCancel={() => setIsOpen(false)}
        onSubmit={handleSubmit(handleAddNewHoust)}>
        <Form layout='vertical'>
          <FormControlDropdown
            label='House type'
            name='ma_loai_nha'
            control={control}
            error={errors.ma_loai_nha}
            placeholder='Choose house type'
            options={houseTypeOptions}
          />
          <FormControlInput
            label='Street'
            name='duong'
            control={control}
            error={errors.duong}
            placeholder='Enter street'
          />
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormControlInput
                label='District'
                name='quan'
                control={control}
                error={errors.quan}
                placeholder='Enter district'
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              <FormControlInput
                label='City'
                name='thanh_pho'
                control={control}
                error={errors.thanh_pho}
                placeholder='Enter city'
              />
            </div>
          </div>
          <FormControlInput
            label='Number of rooms'
            name='so_luong_phong_o'
            control={control}
            error={errors.so_luong_phong_o}
            placeholder='Enter number of rooms'
          />
          <FormControlInput
            label='Areas'
            name='khu_vuc'
            control={control}
            error={errors.khu_vuc}
            placeholder='Enter areas'
          />
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormControlDatePicker
                label='Expiration date'
                name='ngay_het_han'
                control={control}
                error={errors.ngay_het_han}
                placeholder='Enter expiration date'
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              {watch('ma_loai_nha') === 1 && (
                <>
                  <FormControlInput
                    label='Price for sale'
                    name='gia_ban'
                    control={control}
                    error={errors.gia_ban}
                    placeholder='Enter price for sale'
                  />
                </>
              )}
              {watch('ma_loai_nha') === 2 && (
                <>
                  <FormControlInput
                    label='Price for rent per month'
                    name='tien_thue_1_thang'
                    control={control}
                    error={errors.tien_thue_1_thang}
                    placeholder='Enter price for rent per month'
                  />
                </>
              )}
            </div>
          </div>
          <FormControlInput
            label='Condition of landlord'
            name='dieu_kien_cua_chu_nha'
            control={control}
            error={errors.dieu_kien_cua_chu_nha}
            placeholder='Enter condition of landlord'
          />
        </Form>
      </FormModal>
    </>
  );
};

export default CreateNewHouse;
