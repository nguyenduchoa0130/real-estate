import { Form, Input } from 'antd';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

interface FormControlInputProps {
  error: any;
  rules?: any;
  control: any;
  name: string;
  label?: string;
  isPassword?: boolean;
  placeholder?: string;
}

const FormControlInput: FC<FormControlInputProps> = ({
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
      <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error && error.message}>
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

export default FormControlInput;
