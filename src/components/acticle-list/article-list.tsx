import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import ArticleListItem from '../article-ilist-item/article-list-item';
import './article-list.scss';
import { useAppSelector, useAppDispatch } from '../../hook/hooks';
import { addSingleArticle, IArticlesData } from '../../store/articlesSlice';
import Pagination from '../pagination/pagination';

const ArticleList: React.FC = () => {
  const articles: IArticlesData[] = useAppSelector((state) => state.article.articles);
  const dispatch = useAppDispatch();
  const handleClickArticle = (slug: string) => {
    const [article] = articles.filter((item) => {
      return item.slug === slug;
    });
    dispatch(addSingleArticle({ article }));
  };
  return (
    <>
      <ul className={'article__wrapper'}>
        {articles.map((item) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return <ArticleListItem key={uuidv4()} onClick={handleClickArticle} article={item} />;
        })}
      </ul>
      <Pagination />
    </>
  );
};
export default ArticleList;
