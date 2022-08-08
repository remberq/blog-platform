import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import ArticleList from '../acticle-list/article-list';
import BlogHeader from '../blog-footer/blog-footer';
import './main-app.scss';
import '../full-article-item/full-article-item.scss';
import { getArticles, setAuthUser } from '../../store/articlesSlice';
import FullArticleItem from '../full-article-item/full-article-item';
import NewAccountRegister from '../newAccountRegister/newAccountRegister';
import Login from '../login/login';
import EditProfile from '../edit-profile/edit-profile';
import PrivateRoute from '../private-route/private-route';
import NewArticle from '../new-article/new-article';

const MainApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const pagiPage = useAppSelector((state) => state.article.page);
  const [cookies] = useCookies(['token']);
  console.log('his');

  useEffect(() => {
    if (cookies.token) dispatch(setAuthUser(true));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getArticles([pagiPage, cookies.token]));
  }, [dispatch, cookies, pagiPage]);

  return (
    <div className={'main'}>
      <div className={'container'}>
        <BlogHeader />
        <Routes>
          <Route path={'/'} element={<ArticleList />} />
          <Route path={'/articles'} element={<ArticleList />} />
          <Route path={'/articles/:slug'} element={<FullArticleItem />} />
          <Route path={'/sign-in'} element={<Login />} />
          <Route path={'/sign-up'} element={<NewAccountRegister />} />
          <Route
            path={'/profile'}
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path={'/new-article'}
            element={
              <PrivateRoute>
                <NewArticle isEdit={false} />
              </PrivateRoute>
            }
          />
          <Route path={'/articles/:slug/edit'} element={<NewArticle isEdit={true} />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainApp;
