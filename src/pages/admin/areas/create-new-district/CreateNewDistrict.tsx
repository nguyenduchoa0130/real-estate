import { PlusOutlined } from '@ant-design/icons';
import FormControlInput from '@components/form-control-input';
import FormModal from '@components/form-modal';
import { useAppDispatch } from '@rootStore';
import { addressesActions } from '@slices/addresses.slice';
import { Button, Form } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormValue {
  name: string;
}

const CreateNewDistrict = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValue>({
    defaultValues: {
      name: '',
    },
  });
  const dispatch = useAppDispatch();

  const createNewDistrict = async (formValue: FormValue) => {
    const {
      meta: { requestStatus },
    } = await dispatch(addressesActions.createNewDistrict(formValue));
    if (requestStatus === 'fulfilled') {
      reset();
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className='flex ai-center jc-start'>
        <Button type='primary' size='large' icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
          Create new district
        </Button>
        <FormModal
          title='New district'
          isOpen={isOpen}
          onCancel={() => setIsOpen(false)}
          onSubmit={handleSubmit(createNewDistrict)}
          okBtnText='Create'>
          <Form layout='vertical'>
            <FormControlInput
              label='Name'
              name='name'
              control={control}
              error={errors.name}
              placeholder='District name'
              rules={{
                required: 'Required',
              }}
            />
          </Form>
        </FormModal>
      </div>
    </>
  );
};

export default CreateNewDistrict;
