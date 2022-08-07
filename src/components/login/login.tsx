import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import '../newAccountRegister/newAccountRegister.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useAppDispatch } from '../../hook/hooks';
import { setAuthUser } from '../../store/articlesSlice';

interface IFormInputSignIn {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email('Email should be a valid!'),
    password: yup
      .string()
      .min(6, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password needs to be at max 40 characters.')
      .required('Password is required field!'),
  })
  .required();

const Login = () => {
  const [cookies, setCookies] = useCookies(['token']);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputSignIn>({ resolver: yupResolver(schema) });

  const onSubmitLogin = (data) => {
    fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data,
      }),
    })
      .then((val) => val.json())
      .then((item) => {
        setCookies('token', item.user.token, {
          maxAge: 7200,
        });
      })
      .then(() => {
        dispatch(setAuthUser(true));
        nav('/profile');
      });
  };
  // const onSubmit: SubmitHandler<IFormInputSignIn> = (data) => console.log(data);
  return (
    <div className={'form__wrapper'}>
      <p className={'form__heading'}>Sign In</p>
      <form className={'form__main'} onSubmit={handleSubmit(onSubmitLogin)}>
        <label htmlFor="email">
          Email address
          <input
            autoComplete={'on'}
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
        <input className={'form__submit-btn'} type="submit" value={'Login'} />
        <p className={'form__signin-text'}>
          Already have an account? <Link to={'/sign-up'}>Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
