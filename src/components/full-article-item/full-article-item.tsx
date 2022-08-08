import React, { useEffect, useState } from 'react';
import './full-article-item.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { DateMagic } from '../article-ilist-item/dateLogic';
import { addSingleArticle, getArticles } from '../../store/articlesSlice';

import logo from './arrow.png';

const FullArticleItem: React.FC = () => {
  const [isDelete, setIsDelete] = useState(false);
  const date = new DateMagic();
  const [cookies] = useCookies(['token']);
  const pagiPage = useAppSelector((state) => state.article.page);
  const article = useAppSelector((state) => state.article.singleArticle);
  const authUser = useAppSelector((state) => state.auth.authUser);
  const [isLiked, setIsLiked] = useState(article.favorited);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { slug } = useParams();
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((val) => {
        return val.json();
      })
      .then((item) => {
        dispatch(addSingleArticle({ article: item.article }));
      });
  }, [dispatch, slug]);

  // delete article
  const deleteArticleHandle = (e) => {
    e.stopPropagation();
    fetch(`https://blog.kata.academy/api/articles/${article?.slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }).then(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(getArticles([pagiPage, cookies.token]));
      setIsDelete(false);
      nav('/');
    });
  };
  if (Object.keys(article).length === 0) {
    return <div>loading</div>;
  }
  return (
    <div className={'article__wrapper'}>
      <div className={'full__item'}>
        <div className={'full__heading'}>
          <p className={'full__heading-text'}>{article?.title}</p>
          <div className={'full__heading-likes'}>
            <svg
              className={`full__img ${isLiked && 'liked'}`}
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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

        <div className={'full__pre-text wrapper'}>{article.description}</div>
        <div className={'full__author'}>
          <div className={'author__info'}>
            <div className={'author__name'}>{article.author.username}</div>
            <div className={'author__date'}>{date.getDay(article.createdAt)}</div>
          </div>
          <img className={'author__img'} src={article.author.image} alt={'avatar'} />
        </div>
        {article.author.username === authUser?.username && (
          <div className={'article__btn'}>
            <button onClick={() => setIsDelete(true)} className={'footer__link article__delete'}>
              Delete
            </button>
            <Link to={`/articles/${article.slug}/edit`}>
              <button className={'footer__link active--link article__edit'}>Edit</button>
            </Link>
          </div>
        )}
        {isDelete && (
          <div className={'accept__article-delete'}>
            <img className={'arrow'} src={logo} alt="arrow" />
            &#10071;
            <p className={'accept__text'}>Are you sure to delete this article?</p>
            <div className={'btn-wrap'}>
              <button onClick={() => setIsDelete(false)} className={'accept__btn'}>
                No
              </button>
              <button onClick={deleteArticleHandle} className={'accept__btn active-btn'}>
                Yes
              </button>
            </div>
          </div>
        )}

        <div className={'full__article-text'}>
          {/* eslint-disable-next-line react/no-children-prop */}
          <ReactMarkdown children={article.body} remarkPlugins={[remarkGfm]} />
        </div>
      </div>
    </div>
  );
};

export default FullArticleItem;
