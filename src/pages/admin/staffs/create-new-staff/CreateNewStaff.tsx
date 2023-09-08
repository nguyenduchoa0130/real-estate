import { UserAddOutlined } from '@ant-design/icons';
import FormControlDatePicker from '@components/form-control-date-picker';
import FormControlDropdown from '@components/form-control-dropdown';
import FormControlInput from '@components/form-control-input';
import FormControlRadioGroup from '@components/form-control-radio-group';
import FormModal from '@components/form-modal';
import { Option } from '@interfaces/option.interface';
import { Staff } from '@interfaces/staff.interface';
import { useAppDispatch } from '@rootStore';
import { branchesSelectors } from '@selectors/branches.selectors';
import { branchesActions } from '@slices/branches.slice';
import { usersActions } from '@slices/users.slice';
import AlertUtil from '@utils/alert.util';
import { Button, Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const defaultFormValue = {
  email: '',
  mat_khau: '',
  ten_nhan_vien: '',
  dia_chi: '',
  so_dien_thoai: '',
  gioi_tinh: 'Male',
  ngay_sinh: null,
  luong: null,
  ma_chi_nhanh: null,
};

const genderOptions: Option<string>[] = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
];

const CreateNewStaff = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const listBranches = useSelector(branchesSelectors.selectListBranches);
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Staff>({
    defaultValues: defaultFormValue,
  });

  const handleCreateStaff = async (formValue: Staff) => {
    try {
      formValue.ngay_sinh = (formValue.ngay_sinh as any).$d.toJSON();
      await dispatch(usersActions.createNewStaff(formValue));
      reset(defaultFormValue);
      setIsOpen(false);
    } catch (error) {
      AlertUtil.showError(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    dispatch(branchesActions.getAllBranches());
  }, []);

  const branchesOptions = useMemo(() => {
    return listBranches.map((branch) => ({
      value: +branch.ma_chi_nhanh,
      label: branch.ten_chi_nhanh,
    }));
  }, [listBranches]);

  return (
    <>
      <div className='flex ai-center jc-start'>
        <Button
          type='primary'
          icon={<UserAddOutlined />}
          size='large'
          onClick={() => setIsOpen(true)}>
          Create
        </Button>
      </div>
      <div className='pt-2'></div>
      <FormModal
        title='New staff'
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        okBtnText='Create'
        onSubmit={handleSubmit(handleCreateStaff)}
        width={'50vw'}>
        <Form layout='vertical'>
          <FormControlInput
            label='Email'
            name='email'
            control={control}
            error={errors.email}
            placeholder='Enter email'
          />
          <FormControlInput
            isPassword
            label='Password'
            name='mat_khau'
            control={control}
            error={errors.mat_khau}
            placeholder='Enter email'
          />
          <FormControlInput
            label='Full name'
            name='ten_nhan_vien'
            control={control}
            error={errors.ten_nhan_vien}
            placeholder='Enter full name'
          />
          <FormControlInput
            label='Address'
            name='dia_chi'
            control={control}
            error={errors.dia_chi}
            placeholder='Enter address'
          />
          <FormControlInput
            label='Phone number'
            name='so_dien_thoai'
            control={control}
            error={errors.so_dien_thoai}
            placeholder='Enter phone number'
          />
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormControlDatePicker
                label='Birthday'
                name='ngay_sinh'
                control={control}
                error={errors.ngay_sinh}
                placeholder='Choose birthday'
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              <FormControlRadioGroup
                label='Gender'
                name='gioi_tinh'
                control={control}
                error={errors.gioi_tinh}
                options={genderOptions}
                placeholder='Choose gender'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormControlInput
                label='Salary'
                name='luong'
                control={control}
                error={errors.luong}
                placeholder='Enter salary'
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              <FormControlDropdown
                label='Branch'
                name='ma_chi_nhanh'
                control={control}
                error={errors.ma_chi_nhanh}
                options={branchesOptions}
                placeholder='Choose branch'
              />
            </div>
          </div>
        </Form>
      </FormModal>
    </>
  );
};

export default CreateNewStaff;
