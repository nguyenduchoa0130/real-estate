import { Option } from '@interfaces/option.interface';
import { Form, Radio } from 'antd';
import { FC, memo } from 'react';
import { Controller } from 'react-hook-form';

interface FormControlRadioGroupProps {
  error: any;
  rules?: any;
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  options: Option<string>[];
}

const FormControlRadioGroup: FC<FormControlRadioGroupProps> = ({
  name,
  label,
  error,
  control,
  rules,
  options,
}) => {
  return (
    <>
      <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error && error.message}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Radio.Group {...field}>
              {options.map((opt, idx) => (
                <Radio key={`${name}-option-${idx}`} value={opt.value}>
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          )}
        />
      </Form.Item>
    </>
  );
};

export default memo(FormControlRadioGroup);
