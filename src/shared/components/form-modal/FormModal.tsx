import { Button, Modal } from 'antd';
import { FC, ReactNode } from 'react';

interface FormModalProps {
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
  width?: string | number;

  cancelBtnText?: string;
  onCancel?: () => any;

  okBtnText?: string;
  onSubmit?: () => any;
}

const FormModal: FC<FormModalProps> = ({
  title = 'Modal title',
  children,
  isOpen = false,
  width = 520,

  okBtnText = 'OK',
  onSubmit,

  cancelBtnText = 'Cancel',
  onCancel,
}) => {
  return (
    <>
      <Modal open={isOpen} title={title} footer={null} onCancel={onCancel} centered width={width}>
        <hr />
        {children}
        <hr />
        <div className='flex ai-center jc-between'>
          <Button htmlType='button' onClick={onCancel} size='large'>
            {cancelBtnText}
          </Button>
          <Button type='primary' htmlType='submit' onClick={onSubmit} size='large'>
            {okBtnText}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FormModal;
