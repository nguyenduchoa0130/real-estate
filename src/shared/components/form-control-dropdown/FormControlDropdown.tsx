import { Form, Input } from 'antd';
import { FC, memo } from 'react';
import { Controller } from 'react-hook-form';

interface FormControlDropdownProps {
  error: any;
  rules?: any;
  control: any;
  name: string;
  label?: string;
  isPassword?: boolean;
  placeholder?: string;
}

const FormControlDropdown: FC<FormControlDropdownProps> = ({
  name,
  rules,
  control,
  error = null,
  placeholder = '',
  isPassword = false,
  label = 'Form Control Label',
}) => {
  return (
    <>
      <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error && error[name]}>
        <Controller
          name={name}
          rules={rules}
          control={control}
          render={({ field }) =>
            isPassword ? (
              <Input.Password placeholder={placeholder} {...field} />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )
          }
        />
      </Form.Item>
    </>
  );
};

export default memo(FormControlDropdown);
