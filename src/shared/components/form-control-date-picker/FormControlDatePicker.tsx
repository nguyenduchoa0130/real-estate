import { DatePicker, Form } from 'antd';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

interface FormControlDatePickerProps {
  error: any;
  rules?: any;
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
}

const FormControlDatePicker: FC<FormControlDatePickerProps> = ({
  name,
  rules,
  control,
  error = null,
  label = 'Form Control Label',
  placeholder = 'Calendar placeholder',
}) => {
  return (
    <>
      <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error && error.message}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <DatePicker
              {...field}
              placeholder={placeholder}
              format='MM-DD-YYYY'
              className='w-100'
              size='large'
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export default FormControlDatePicker;
