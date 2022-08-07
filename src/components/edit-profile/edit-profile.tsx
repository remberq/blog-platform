import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import '../newAccountRegister/newAccountRegister.scss';
import { useCookies } from 'react-cookie';

import { useAppSelector } from '../../hook/hooks';

interface IFormInputEdit {
  username?: string;
  email: string;
  password?: string;
  image: string;
}

const schema = yup
  .object({
    username: yup
      .string()
      .min(3, 'Username needs to be at least 3 characters')
      .max(20, 'Username needs to be at max 20 characters')
      .required('Should not be empty'),
    email: yup.string().email('Email should be a valid!'),
    password: yup
      .string()
      .min(6, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password needs to be at max 40 characters.'),
    image: yup.string(),
  })
  .required();

const EditProfile = () => {
  const { isAuth, authUser } = useAppSelector((state) => state.auth);
  const [cookies] = useCookies(['token']);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputEdit>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<IFormInputEdit> = (data) => {
    const keys = Object.keys(data);
    const resp = {};
    for (const item of keys) {
      if (data[item]) {
        resp[item] = data[item];
      }
    }
    fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({ user: resp }),
    });
  };
  return (
    <div className={'form__wrapper'}>
      <p className={'form__heading'}>Edit Profile</p>
      <form className={'form__main'} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          Username
          <input
            className={errors?.username ? 'failed-validation-input' : 'form__input'}
            {...register('username')}
            placeholder={authUser?.username || 'Username'}
            defaultValue={authUser?.username}
          />
          {errors?.username ? <p className={'error__text'}>{errors.username.message}</p> : null}
        </label>
        <label htmlFor="email">
          Email address
          <input
            className={errors?.email ? 'failed-validation-input' : 'form__input'}
            {...register('email', { required: true })}
            placeholder={authUser?.email || 'Email address'}
          />
          {errors?.email ? <p className={'error__text'}>{errors.email.message}</p> : null}
        </label>
        <label htmlFor="password">
          New Password
          <input
            className={errors?.password ? 'failed-validation-input' : 'form__input'}
            {...register('password')}
            placeholder={'Password'}
          />
          {errors?.password ? <p className={'error__text'}>{errors.password.message}</p> : null}
        </label>
        <label htmlFor="repeat">
          Avatar image (url)
          <input
            className={errors?.image ? 'failed-validation-input' : 'form__input'}
            {...register('image')}
            placeholder={authUser?.image || 'Enter your Avatar URL'}
          />
          {errors?.image ? <p className={'error__text'}>{errors.image.message}</p> : null}
        </label>
        <input className={'form__submit-btn'} type="submit" value={'Save'} />
      </form>
    </div>
  );
};

export default EditProfile;
