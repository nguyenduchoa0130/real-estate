import { UserAddOutlined } from '@ant-design/icons';
import FormModal from '@components/form-modal';
import { Button, Form } from 'antd';
import { useState } from 'react';

const CreateNewStaff = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className='flex ai-center jc-start'>
        <Button
          type='primary'
          icon={<UserAddOutlined />}
          size='large'
          onClick={() => setIsOpen(true)}>
          Create user
        </Button>
      </div>
      <div className='pt-2'></div>
      <FormModal
        title='New staff'
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        okBtnText='Create'
        width={'65vw'}>
        <Form layout='vertical'></Form>
      </FormModal>
    </>
  );
};

export default CreateNewStaff;
