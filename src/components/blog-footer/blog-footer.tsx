import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './blog-footer.scss';
import { useCookies } from 'react-cookie';

import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { setAuthUser, setUserData } from '../../store/articlesSlice';

import avatar from './avatar.png';

const UnAuthHeader: React.FC = () => {
  return (
    <div className={'footer__authorization'}>
      <Link to={'/sign-in'}>
        <button className={'footer__link'}>Sign In</button>
      </Link>
      <Link to={'/sign-up'}>
        <button className={'footer__link active--link'}>Sign Up</button>
      </Link>
    </div>
  );
};

const AuthHeader: React.FC = () => {
  const [cookies, setCookies, removeCookie] = useCookies(['token']);
  const { authUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const logOutHandle = () => {
    removeCookie('token');
    dispatch(setAuthUser(false));
    dispatch(setUserData(null));
  };

  console.log(authUser);
  useEffect(() => {
    fetch('https://blog.kata.academy/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((resp) => resp.json())
      .then((val) => dispatch(setUserData(val)));
  }, [dispatch, cookies]);

  return (
    <div className={'footer__auth'}>
      <Link to={'/new-article'}>
        <button className={'auth__link'}>Create article</button>
      </Link>
      <Link to={'/profile'} className={'footer__auth-profile'}>
        <span className={'auth__name'}>{authUser?.username}</span>
        <img className={'auth__img'} src={authUser?.image || avatar} alt="avatar" />
      </Link>
      <Link to={'/'} onClick={logOutHandle}>
        <button className={'auth__link--logout'}>Log Out</button>
      </Link>
    </div>
  );
};

const BlogHeader: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    <div className={'footer'}>
      <Link to={'/'} className={'footer__title'}>
        FaceLook
      </Link>
      {!isAuth ? <UnAuthHeader /> : <AuthHeader />}
    </div>
  );
};

export default BlogHeader;
