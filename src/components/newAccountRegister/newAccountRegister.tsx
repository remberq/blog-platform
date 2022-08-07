import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './newAccountRegister.scss';
import { Link, useNavigate } from 'react-router-dom';

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
      .required(),
    email: yup.string().email('Email should be a valid!'),
    password: yup
      .string()
      .min(6, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password needs to be at max 40 characters.')
      .required('Password is required field!'),
    repeat: yup
      .string()
      .required('Please, repeat the password!')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    checkbox: yup.boolean().required().oneOf([true], 'Accept your agree'),
  })
  .required();

const NewAccountRegister = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    nav('/profile');
  };

  console.log(watch('username')); // watch input value by passing the name of it

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
          {errors?.username ? <p className={'error__text'}>{errors.username.message}</p> : null}
        </label>
        <label htmlFor="email">
          Email address
          <input
            className={errors?.email ? 'failed-validation-input' : 'form__input'}
            {...register('email')}
            placeholder={'Email address'}
          />
          {errors?.email ? <p className={'error__text'}>{errors.email.message}</p> : null}
        </label>
        <label htmlFor="password">
          Password
          <input
            className={errors?.password ? 'failed-validation-input' : 'form__input'}
            {...register('password')}
            placeholder={'Password'}
          />
          {errors?.password ? <p className={'error__text'}>{errors.password.message}</p> : null}
        </label>
        <label htmlFor="repeat">
          Repeat Password
          <input
            className={errors?.repeat ? 'failed-validation-input' : 'form__input'}
            {...register('repeat')}
            placeholder={'Repeat Password'}
          />
          {errors?.repeat ? <p className={'error__text'}>{errors.repeat.message}</p> : null}
        </label>
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
