import { PlusOutlined } from '@ant-design/icons';
import FormControlInput from '@components/form-control-input';
import FormModal from '@components/form-modal';
import { Branch } from '@interfaces/branch.interface';
import { useAppDispatch } from '@rootStore';
import { branchesActions } from '@slices/branches.slice';
import AlertUtil from '@utils/alert.util';
import { Button, Form } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateNewBranch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<Branch>>({
    defaultValues: {
      duong: '',
      quan: '',
      thanh_pho: '',
      khu_vuc: '',
      so_dien_thoai: '',
      so_fax: '',
    },
  });

  const createNewBranch = async (formValue: Partial<Branch>) => {
    try {
      await dispatch(branchesActions.createNewBranch(formValue));
      reset();
      setIsOpen(false);
    } catch (error) {
      AlertUtil.showError(error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <Button type='primary' size='large' icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
        Create
      </Button>
      <FormModal
        title='New Branch'
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onSubmit={handleSubmit(createNewBranch)}
        okBtnText='Create'>
        <Form layout='vertical'>
          <FormControlInput
            label='Street'
            control={control}
            name='duong'
            placeholder='Enter the street'
            error={errors.duong}
          />
          <FormControlInput
            label='District'
            control={control}
            name='quan'
            placeholder='Enter the district'
            error={errors.quan}
          />
          <FormControlInput
            label='City'
            control={control}
            name='thanh_pho'
            placeholder='Enter the city'
            error={errors.thanh_pho}
          />
          <FormControlInput
            label='Area'
            control={control}
            name='khu_vuc'
            placeholder='Enter the area'
            error={errors.khu_vuc}
          />
          <FormControlInput
            label='Phone number'
            control={control}
            name='so_dien_thoai'
            placeholder='Enter the phone number'
            error={errors.so_dien_thoai}
          />
          <FormControlInput
            label='FAX'
            control={control}
            name='so_fax'
            placeholder='Enter the FAX'
            error={errors.so_fax}
          />
        </Form>
      </FormModal>
    </>
  );
};

export default CreateNewBranch;
