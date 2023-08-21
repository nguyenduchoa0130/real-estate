import { PlusOutlined } from '@ant-design/icons';
import FormControlInput from '@components/form-control-input';
import FormModal from '@components/form-modal';
import { Button, Form } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormValue {
  branchName: string;
  phoneNumber: string;
  fax: string;
}

const CreateNewBranch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      branchName: '',
      phoneNumber: '',
      fax: '',
    },
  });
  return (
    <>
      <div className='flex ai-center jc-start'>
        <Button type='primary' size='large' icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
          Create branch
        </Button>
        <FormModal
          isOpen={isOpen}
          title='Create new branch'
          onCancel={() => setIsOpen(false)}
          okBtnText='Create'>
          <Form layout='vertical'>
            <FormControlInput
              label='Branch name'
              name='branchName'
              control={control}
              error={errors.branchName}
              placeholder='Branch name'
            />
            <FormControlInput
              label='Phone'
              name='phone'
              control={control}
              error={errors.phoneNumber}
              placeholder='Phone number'
            />
            <FormControlInput
              label='FAX'
              name='fax'
              control={control}
              error={errors.fax}
              placeholder='Fax'
            />
          </Form>
        </FormModal>
      </div>
    </>
  );
};

export default CreateNewBranch;
