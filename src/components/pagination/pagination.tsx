import React from 'react';
import { Pagination as Pagi } from 'antd';
import { useCookies } from 'react-cookie';

import './pagination.scss';

import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { getArticles, pagePaginationSet } from '../../store/articlesSlice';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token']);
  const pagiPage = useAppSelector((state) => state.article.page);
  const changeHandler = (page: number) => {
    dispatch(pagePaginationSet(page));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getArticles([page, cookies.token]));
  };
  return (
    <div className={'pagination'}>
      <Pagi onChange={changeHandler} defaultCurrent={pagiPage} total={50} />
    </div>
  );
};

export default Pagination;
