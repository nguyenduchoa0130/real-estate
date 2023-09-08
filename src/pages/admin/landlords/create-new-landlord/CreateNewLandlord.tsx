import { UserAddOutlined } from '@ant-design/icons';
import FormControlInput from '@components/form-control-input';
import FormModal from '@components/form-modal';
import { Landlord } from '@interfaces/landlord.interface';
import { Staff } from '@interfaces/staff.interface';
import { useAppDispatch } from '@rootStore';
import { usersActions } from '@slices/users.slice';
import AlertUtil from '@utils/alert.util';
import { Button, Form } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultFormValue = {
  email: '',
  mat_khau: '',
  ten_chu_nha: '',
  dia_chi: '',
  so_dien_thoai: '',
};

const CreateNewLandlord = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Landlord>({
    defaultValues: defaultFormValue,
  });

  const handleCreateStaff = async (formValue: Staff) => {
    try {
      await dispatch(usersActions.createNewLandlord(formValue));
      reset(defaultFormValue);
      setIsOpen(false);
    } catch (error) {
      AlertUtil.showError(error?.response?.data?.message || error.message);
    }
  };

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
        title='New landlord'
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
            name='ten_chu_nha'
            control={control}
            error={errors.ten_chu_nha}
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
        </Form>
      </FormModal>
    </>
  );
};

export default CreateNewLandlord;
