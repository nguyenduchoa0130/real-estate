import { KeyOutlined, UserAddOutlined } from '@ant-design/icons';
import FormControlInput from '@components/form-control-input';
import { LoginPayload } from '@interfaces/user.interface';
import { useAppDispatch } from '@rootStore';
import { Button, Form, Typography } from 'antd';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formValue: LoginPayload) => {};
  return (
    <>
      <div className={cx('flex ai-center jc-center h-100', styles['login-container'])}>
        <div className={styles['login-form']}>
          <Form layout='vertical' onFinish={handleSubmit(handleLogin)}>
            <Typography.Title className='text-center text-primary'>LOGIN FORM</Typography.Title>
            <hr />
            <FormControlInput
              label='Email'
              name='email'
              control={control}
              error={errors.email}
              placeholder='Enter your email'
              rules={{
                required: 'Required',
              }}
            />
            <FormControlInput
              isPassword
              label='Password'
              name='password'
              control={control}
              error={errors.password}
              placeholder='Enter your password'
              rules={{
                required: 'Required',
              }}
            />
            <Form.Item>
              <div className='flex ai-center jc-between'>
                <NavLink to='/forgot-password'>
                  <Button type='link' icon={<KeyOutlined />}>
                    Forgot password?
                  </Button>
                </NavLink>
                <NavLink to='/register'>
                  <Button type='link' icon={<UserAddOutlined />}>
                    Create new account
                  </Button>
                </NavLink>
              </div>
            </Form.Item>
            <hr />
            <Form.Item>
              <div className='flex ai-center jc-center'>
                <Button type='primary' htmlType='submit' className='w-100'>
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

export default Login;
