import { UserAddOutlined } from '@ant-design/icons';
import FormControlDatePicker from '@components/form-control-date-picker';
import FormControlDropdown from '@components/form-control-dropdown';
import FormControlInput from '@components/form-control-input';
import FormControlRadioGroup from '@components/form-control-radio-group';
import FormModal from '@components/form-modal';
import { Option } from '@interfaces/option.interface';
import { Button, Form } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const GENDER_OPTIONS: Option<string>[] = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

const ROLE_OPTIONS: Option<string>[] = [
  {
    label: 'Guest',
    value: 'guest',
  },
  {
    label: 'Staff',
    value: 'staff',
  },
  {
    label: 'Host',
    value: 'host',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
];

interface FormValue {
  role: string;
  email: string;
  phoneNumber: string;
  birthday: any;
  gender: string;
  address: string;
  salary?: string;
  password: string;
  firstName: string;
  lastName: string;
  branchId: number;
  passwordConfirm: string;
}

const CreateNewUser = () => {
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
      phoneNumber: '',
      birthday: null,
      role: 'guest',
      gender: 'male',
      salary: null,
      branchId: null,
    },
  });

  const handleCreateNewUser = async (formValue: FormValue) => {
    delete formValue.passwordConfirm;
    formValue.birthday = moment(formValue.birthday.$d).toJSON();
    console.log(formValue);
  };

  return (
    <>
      <div className='flex ai-center jc-start'>
        <Button
          type='primary'
          icon={<UserAddOutlined />}
          size='large'
          onClick={() => setIsOpen(true)}>
          Create user
        </Button>
      </div>
      <div className='pt-2'></div>
      <FormModal
        title='Create new user'
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        okBtnText='Create'
        onSubmit={handleSubmit(handleCreateNewUser)}
        width={'65vw'}>
        <Form layout='vertical'>
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
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
              <div className='row'>
                <div className='col-md-6 col-xs-12'>
                  {' '}
                  {/* Password */}
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
                </div>
                <div className='col-md-6 col-xs-12'>
                  {/* Password confirmation */}
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
                </div>
              </div>
              {/* First name and last name */}
              <div className='row'>
                <div className='col-md-6 col-xs-12'>
                  <FormControlInput
                    label='First name'
                    name='firstName'
                    control={control}
                    error={errors.firstName}
                    placeholder='First name'
                    rules={{
                      required: 'Required',
                    }}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormControlInput
                    label='Last name'
                    name='lastName'
                    control={control}
                    error={errors.lastName}
                    placeholder='Last name'
                    rules={{
                      required: 'Required',
                    }}
                  />
                </div>
              </div>
              {/* Phone and birthday */}
              <div className='row'>
                <div className='col-md-6 col-xs-12'>
                  <FormControlInput
                    label='Phone'
                    name='phoneNumber'
                    control={control}
                    error={errors.phoneNumber}
                    placeholder='Phone number VN'
                    rules={{
                      required: 'Required',
                    }}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormControlDatePicker
                    label='Birthday'
                    name='birthday'
                    control={control}
                    error={errors.birthday}
                    placeholder='MM-DD-YYYY'
                    rules={{
                      required: 'Required',
                      pattern: {
                        value: /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2[0-9]|3[0-1])-(19|20)\d\d$/,
                        message: 'Invalid birthday: MM-DD-YYYY',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-xs-12'>
              {/* Gender */}
              <FormControlRadioGroup
                label='Gender'
                name='gender'
                control={control}
                error={errors.gender}
                options={GENDER_OPTIONS}
                placeholder='Gender'
                rules={{
                  required: 'Required',
                }}
              />
              {/* Address */}
              <FormControlInput
                label='Address'
                name='address'
                control={control}
                error={errors.address}
                placeholder='Address'
                rules={{
                  required: 'Required',
                }}
              />
              {/* Roles */}
              <div className='row'>
                <div className='col-md-6 col-xs-12'>
                  <FormControlDropdown
                    label='Role'
                    name='role'
                    control={control}
                    error={errors.role}
                    options={ROLE_OPTIONS}
                    placeholder='Role'
                    rules={{
                      required: 'Required',
                    }}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  {/* Salary */}
                  {watch('role') === 'staff' && (
                    <FormControlInput
                      label='Salary'
                      name='salary'
                      control={control}
                      error={errors.salary}
                      placeholder='Salary'
                      rules={{
                        required: 'Required',
                      }}
                    />
                  )}
                </div>
              </div>
              {/* Branch */}
              {watch('role') === 'staff' && (
                <FormControlDropdown
                  label='Branch'
                  name='branchId'
                  control={control}
                  error={errors.branchId}
                  options={[]}
                  placeholder='Branch'
                  isShowSearch
                  rules={{
                    required: 'Required',
                  }}
                />
              )}
            </div>
          </div>
        </Form>
      </FormModal>
    </>
  );
};

export default CreateNewUser;
