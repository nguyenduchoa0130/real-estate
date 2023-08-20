import { Modal } from 'antd';
import { FC, ReactNode, memo } from 'react';

interface FormModalProps {
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
}

const FormModal: FC<FormModalProps> = ({
  title = 'Modal title',
  children,
  isOpen = false,
  onClose,
}) => {
  return (
    <>
      <Modal open={isOpen} title={title} footer={null} onCancel={onClose} centered>
        <hr />
        {children}
      </Modal>
    </>
  );
};

export default memo(FormModal);
