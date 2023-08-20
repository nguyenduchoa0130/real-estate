import { UserAddOutlined } from '@ant-design/icons';
import FormControl from '@components/form-control-input';
import FormModal from '@components/form-modal';
import { Button, Form } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormValue {
  role: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  passwordConfirm: string;
}

const Users = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      phone: '',
      birthday: '',
      role: '',
    },
  });

  // Handle submit form
  const handleCreateNewUser = async (formValue: FormValue) => {
    delete formValue.passwordConfirm;
    console.log('form value', formValue);
  };
  return (
    <>
      <div className='flex ai-center jc-start'>
        <Button
          type='primary'
          icon={<UserAddOutlined />}
          size='large'
          onClick={() => setIsOpen(true)}>
          Create
        </Button>
      </div>
      <div className='pt-2'></div>
      <FormModal title='Create new user' isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Form layout='vertical' onFinish={handleSubmit(handleCreateNewUser)}>
          <FormControl
            label='Email'
            name='email'
            control={control}
            error={errors.email}
            placeholder='Email'
            rules={{
              required: 'Required',
            }}
          />
          <FormControl
            label='Password'
            name='password'
            control={control}
            error={errors.password}
            placeholder='Password'
            rules={{
              required: 'Required',
            }}
          />
          <FormControl
            label='Password confirmation'
            name='passwordConfirm'
            control={control}
            error={errors.passwordConfirm}
            placeholder='Password confirmation'
          />
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormControl
                label='First name'
                name='firstName'
                control={control}
                error={errors.firstName}
                placeholder='FirstName'
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              <FormControl
                label='Last name'
                name='lastName'
                control={control}
                error={errors.lastName}
                placeholder='Last name'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <FormControl
                label='Phone'
                name='phone'
                control={control}
                error={errors.password}
                placeholder='Phone number'
              />
            </div>
            <div className='col-md-6 col-xs-12'>
              <FormControl
                label='Birthday'
                name='birthday'
                control={control}
                error={errors.birthday}
                placeholder='Birthday'
              />
            </div>
          </div>
          <FormControl
            label='Address'
            name='address'
            control={control}
            error={errors.address}
            placeholder='Address'
          />
        </Form>
      </FormModal>
    </>
  );
};

export default Users;
