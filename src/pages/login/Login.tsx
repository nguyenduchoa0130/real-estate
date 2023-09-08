import { KeyOutlined, UserAddOutlined } from '@ant-design/icons';
import FormControlInput from '@components/form-control-input';
import { LoginPayload } from '@interfaces/user.interface';
import { useAppDispatch } from '@rootStore';
import { authActions } from '@slices/auth.slice';
import AlertUtil from '@utils/alert.util';
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
      mat_khau: '',
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formValue: LoginPayload) => {
    const res = await dispatch(authActions.login(formValue));
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };
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
              name='mat_khau'
              control={control}
              error={errors.mat_khau}
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
                <Button type='primary' htmlType='submit' className='w-100' size='large'>
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
