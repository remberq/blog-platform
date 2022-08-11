import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './newAccountRegister.scss';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hook/hooks';

import hide from './hidden.png';
import view from './view.png';

interface IFormInput {
  username: string;
  email: string;
  password: string;
  repeat: string;
  checkbox: boolean;
}

const schema = yup
  .object({
    username: yup
      .string()
      .min(3, 'Username needs to be at least 3 characters')
      .max(20, 'Username needs to be at max 20 characters')
      .required('Username is required field!'),
    email: yup.string().email('Email should be a valid!').required('Email is required field!'),
    password: yup
      .string()
      .min(6, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password needs to be at max 40 characters.')
      .required('Password is required field!'),
    repeat: yup
      .string()
      .required('Please, repeat the password!')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    checkbox: yup.boolean().required('Accept your agree').oneOf([true], 'Accept your agree'),
  })
  .required();

const NewAccountRegister = () => {
  const [passVision, setPassVision] = useState(false);
  const [repeatVision, setRepeatVision] = useState(false);
  const { isAuth } = useAppSelector((state) => state.auth);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  useEffect(() => {
    if (isAuth) nav('/');
  }, [nav, isAuth]);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { username, password, email } = data;
    fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          password,
          email,
        },
      }),
    });
    nav('/profile');
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className={'form__wrapper'}>
      <p className={'form__heading'}>Create new account</p>
      <form className={'form__main'} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          Username
          <input
            className={errors?.username ? 'failed-validation-input' : 'form__input'}
            {...register('username')}
            placeholder={'Username'}
          />
        </label>
        {errors?.username ? <p className={'error__text'}>{errors.username.message}</p> : null}
        <label htmlFor="email">
          Email address
          <input
            className={errors?.email ? 'failed-validation-input' : 'form__input'}
            {...register('email')}
            placeholder={'Email address'}
          />
        </label>
        {errors?.email ? <p className={'error__text'}>{errors.email.message}</p> : null}
        <label className={'show-hide-password'} htmlFor="password">
          <img
            className={'show-pass'}
            src={!passVision ? hide : view}
            alt="password show"
            onClick={() => setPassVision((toggle) => !toggle)}
          />
          Password
          <input
            className={errors?.password ? 'failed-validation-input' : 'form__input'}
            {...register('password')}
            placeholder={'Password'}
            autoComplete={'off'}
            type={!passVision ? 'password' : ''}
          />
        </label>
        {errors?.password ? <p className={'error__text'}>{errors.password.message}</p> : null}
        <label className={'show-hide-password'} htmlFor="repeat">
          <img
            className={'show-pass'}
            src={!repeatVision ? hide : view}
            alt="password show"
            onClick={() => setRepeatVision((toggle) => !toggle)}
          />
          Repeat Password
          <input
            className={errors?.repeat ? 'failed-validation-input' : 'form__input'}
            {...register('repeat')}
            placeholder={'Repeat Password'}
            type={!repeatVision ? 'password' : ''}
            autoComplete={'off'}
          />
        </label>
        {errors?.repeat ? <p className={'error__text'}>{errors.repeat.message}</p> : null}
        <label className={'checked__input'} htmlFor={'agree'}>
          <input {...register('checkbox')} id={'agree'} type="checkbox" />I agree to the processing of my personal
          information
        </label>
        {errors?.checkbox ? <p className={'error__text'}>{errors.checkbox.message}</p> : null}
        <input className={'form__submit-btn'} type="submit" value={'Create'} />
        <p className={'form__signin-text'}>
          Already have an account? <Link to={'/sign-in'}>Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default NewAccountRegister;
