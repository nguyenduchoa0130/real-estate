import FormControlInput from '@components/form-control-input';
import { useAppDispatch } from '@rootStore';
import { shareActions } from '@slices/share.slice';
import { Button, Form, Typography } from 'antd';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

interface FormValue {
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register = () => {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (formValue: FormValue) => {
    delete formValue.passwordConfirm;
    console.log('form value', formValue);
    // const isSuccess = await dispatch(shareActions.createUser(formValue));
    // if (isSuccess.meta.requestStatus === 'fulfilled') {
    //   return navigate('/', {});
    // }
  };
  return (
    <>
      <div className={cx('flex ai-center jc-center h-100', styles['register-container'])}>
        <div className={styles['register-form']}>
          <Form layout='vertical' onFinish={handleSubmit(handleRegister)}>
            <Typography.Title className='text-center text-primary'>REGISTER FORM</Typography.Title>
            <hr />
            {/* Email */}
            <FormControlInput
              label='Email'
              name='email'
              control={control}
              error={errors.email}
              placeholder='Email'
              rules={{
                required: 'Required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email',
                },
              }}
            />
            <FormControlInput
              isPassword
              label='Password'
              name='password'
              control={control}
              error={errors.password}
              placeholder='Password'
              rules={{
                required: 'Required',
                minLength: {
                  value: 6,
                  message: 'The password must have at least 6 characters',
                },
              }}
            />
            <FormControlInput
              isPassword
              label='Password confirmation'
              name='passwordConfirm'
              control={control}
              error={errors.passwordConfirm}
              placeholder='Password confirmation'
              rules={{
                required: 'Required',
                validate: (curr) => {
                  if (watch('password') !== curr) {
                    return 'Password confirmation is not match';
                  }
                },
              }}
            />
            <hr />
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

export default Register;
