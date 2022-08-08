import React, { useState } from 'react';
import './article-list-item.scss';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { getArticles, IArticlesData } from '../../store/articlesSlice';

import { DateMagic } from './dateLogic';
interface IArticleProps {
  article: IArticlesData;
  onClick: (slug: string) => void;
}

const ArticleListItem: React.FC<IArticleProps> = ({ article, onClick }) => {
  const date = new DateMagic();
  const pagiPage = useAppSelector((state) => state.article.page);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const [isLiked] = useState(article.favorited);
  const [cookies] = useCookies(['token']);
  console.log('hi');
  // like/unlike handle
  const likeHandle = () => {
    const method = !isLiked ? 'POST' : 'DELETE';
    fetch(`https://blog.kata.academy/api/articles/${article.slug}/favorite`, {
      method,
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(getArticles([pagiPage, cookies.token]));
      });
  };

  return (
    <li className={'article__item'}>
      <div className={'article__heading'}>
        <Link
          onClick={() => onClick(article.slug)}
          to={`/articles/${article.slug}`}
          className={'article__heading-text'}
        >
          {article.title}
        </Link>
        <div className={'article__heading-likes'}>
          <svg
            className={isAuth ? `likes__img ${isLiked && 'liked'}` : 'unAuth__like'}
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              if (isAuth) likeHandle();
            }}
          >
            <path
              d="M8 2.56911C7.26154 1.33835 6.03077 0.476807 4.55385 0.476807C2.46154 0.476807 0.861542 2.07681 0.861542 4.16911C0.861542 8.23065 3.07693 8.84604 8 13.523C12.9231 8.84604 15.1385 8.23065 15.1385 4.16911C15.1385 2.07681 13.5385 0.476807 11.4462 0.476807C9.96923 0.476807 8.73846 1.33835 8 2.56911Z"
              fill="transparent"
              stroke="rgba(0, 0, 0, 0.75)"
            />
          </svg>
          <span className={'likes__count'}>{article.favoritesCount}</span>
        </div>
      </div>
      <div className={'tags__wrapper'}>
        {article.tagList.map((item) => {
          return (
            <div key={uuidv4()} className={'article__tags'}>
              {item}
            </div>
          );
        })}
      </div>
      <div className={'article__pre-text wrapper'}>{article.description}</div>
      <div className={'article__author'}>
        <div className={'author__info'}>
          <span className={'author__name'}>{article.author.username}</span>
          <span className={'author__date'}>{date.getDay(article.createdAt)}</span>
        </div>
        <img className={'author__img'} src={article.author.image} alt={'avatar'} />
      </div>
    </li>
  );
};

export default ArticleListItem;
