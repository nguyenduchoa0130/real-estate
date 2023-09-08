import FormControlDatePicker from '@components/form-control-date-picker';
import FormControlInput from '@components/form-control-input';
import { useAppDispatch } from '@rootStore';
import AlertUtil from '@utils/alert.util';
import { Button, Form, Typography } from 'antd';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { authActions } from '../../shared/stores/slices/auth.slice';
import styles from './styles.module.scss';

interface FormValue {
  email: string;
  mat_khau: string;
  xac_nhan_mat_khau: string;
  HoTen: string;
  NgaySinh: any;
  CMND: string;
  DiaChi: string;
}

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      email: '',
      mat_khau: '',
      xac_nhan_mat_khau: '',
      HoTen: '',
      NgaySinh: null,
      CMND: '',
      DiaChi: '',
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (formValue: FormValue) => {
    try {
      delete formValue.xac_nhan_mat_khau;
      formValue.NgaySinh = formValue.NgaySinh.$d.toJSON();
      await dispatch(authActions.register(formValue));
      return navigate('/');
    } catch (error) {}
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
            />
            <FormControlInput
              isPassword
              label='Password'
              name='mat_khau'
              control={control}
              error={errors.mat_khau}
              placeholder='Password'
            />
            <FormControlInput
              label='Full name'
              name='HoTen'
              control={control}
              error={errors.HoTen}
              placeholder='Enter your name'
            />
            <FormControlInput
              label='CMND'
              name='CMND'
              control={control}
              error={errors.CMND}
              placeholder='Enter your CMND'
            />
            <FormControlInput
              label='Address'
              name='DiaChi'
              control={control}
              error={errors.DiaChi}
              placeholder='Enter your address'
            />
            <FormControlDatePicker
              label='Birthday'
              name='NgaySinh'
              control={control}
              error={errors.NgaySinh}
              placeholder='Choose your birthday'
            />
            <hr />
            <Form.Item>
              <div className='flex ai-center jc-between'>
                <NavLink to='/login'>
                  <Button size='large'>Back to login</Button>
                </NavLink>
                <Button type='primary' htmlType='submit' size='large'>
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
