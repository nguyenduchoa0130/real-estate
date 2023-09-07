import FormControlInput from '@components/form-control-input';
import { Button, Form, Typography } from 'antd';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

interface FormValue {
  email: string;
}

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      email: '',
    },
  });

  const handleForgotPassword = async (formValue: FormValue) => {
    console.log('form value', formValue);
  };

  return (
    <>
      <div className={cx('flex ai-center jc-center h-100', styles['forgot-password-container'])}>
        <div className={styles['forgot-password-form']}>
          <Form layout='vertical' onFinish={handleSubmit(handleForgotPassword)}>
            <Typography.Title className='text-center text-primary text-uppercase'>
              fotgot password
            </Typography.Title>
            <hr />
            <FormControlInput
              label='Email'
              name='email'
              control={control}
              error={errors.email}
              placeholder='Enter your email'
              rules={{ required: 'Required' }}
            />
            <Form.Item>
              <div className='flex ai-center jc-between'>
                <NavLink to='/login'>
                  <Button>Back to login</Button>
                </NavLink>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
