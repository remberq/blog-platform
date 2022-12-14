import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import '../newAccountRegister/newAccountRegister.scss';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { setAuthUser } from '../../store/blog-slices';
import hide from '../newAccountRegister/hidden.png';
import view from '../newAccountRegister/view.png';
import { loginSchema } from '../form-schemas';
import ApiResponses from '../apiResponses';

interface IFormInputSignIn {
  email: string;
  password: string;
}

const Login = () => {
  const [cookies, setCookies] = useCookies(['token']);
  const [toggleVision, setToggleVision] = useState(false);
  const [error, setError] = useState(false);
  const { isAuth } = useAppSelector((state) => state.auth);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const api = new ApiResponses();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputSignIn>({ resolver: yupResolver(loginSchema) });
  useEffect(() => {
    if (isAuth) nav('/');
  }, [nav, isAuth]);
  const onSubmitLogin = (data) => {
    api.loginUser(data).then((userData) => {
      if (!userData) setError(true);
      else {
        setCookies('token', userData.user.token, {
          maxAge: 7200,
        });
        setError(false);
        dispatch(setAuthUser(true));
        nav('/profile');
      }
    });
  };

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
        </label>
        {errors?.email ? <p className={'error__text'}>{errors.email.message}</p> : null}
        <label className={'show-hide-password'} htmlFor="password">
          <img
            className={'show-pass'}
            src={!toggleVision ? hide : view}
            alt="password show"
            onClick={() => setToggleVision((toggle) => !toggle)}
          />
          Password
          <input
            className={errors?.password ? 'failed-validation-input' : 'form__input'}
            {...register('password')}
            placeholder={'Password'}
            autoComplete={'off'}
            type={!toggleVision ? 'password' : 'text'}
          />
        </label>
        {errors?.password ? <p className={'error__text'}>{errors.password.message}</p> : null}
        {error ? <p className={'error__text'}>Email or Password is invalid</p> : null}
        <input className={`form__submit-btn ${error && 'error'}`} type="submit" value={'Login'} />
        <p className={'form__signin-text'}>
          Already have an account? <Link to={'/sign-up'}>Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
