import React, { useEffect, useMemo, useState } from 'react';
import './new-article.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { addSingleArticle } from '../../store/blog-slices';
import { getArticles } from '../../store/actions';
import { newArticleSchema } from '../form-schemas';
import ApiResponses from '../apiResponses';

interface INewArticleInput {
  title: string;
  description: string;
  body: string;
}

type TTags = string[];
type TValue = string;

interface IEditArticle {
  isEdit: boolean;
}

const NewArticle: React.FC<IEditArticle> = ({ isEdit }) => {
  const article = useAppSelector((state) => state.article.singleArticle);
  const pagiPage = useAppSelector((state) => state.article.page);
  const [tags, setTags] = useState<TTags>(isEdit ? article.tagList : []);
  const [value, setValue] = useState<TValue>('');
  const [tagError, setTagError] = useState(false);
  const [cookies] = useCookies(['token']);
  const api = useMemo(() => new ApiResponses(), []);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewArticleInput>({ resolver: yupResolver(newArticleSchema) });
  const { slug } = useParams();
  useEffect(() => {
    if (isEdit) {
      api.getCurrentArticle(slug).then((item) => {
        dispatch(addSingleArticle({ article: item.article }));
      });
    }
  }, [dispatch, slug, isEdit, api]);

  if (isEdit && !Object.keys(article).length) {
    return <div>loading</div>;
  }
  // add tags handle
  const addTagHandle = (event) => {
    event.preventDefault();
    if (value) {
      if (!tags.includes(value)) {
        setTagError(false);
        setTags([...tags, value]);
        setValue('');
      } else setTagError(true);
    }
  };
  // onFormSubmit
  const onSubmit: SubmitHandler<INewArticleInput> = (data) => {
    const newArticle = {
      article: {
        ...data,
        tagList: tags,
      },
    };
    const editParams = isEdit ? `articles/${article.slug}` : 'articles';
    const method = isEdit ? 'PUT' : 'POST';
    api.addNewArticle(editParams, cookies.token, newArticle, method).then(() => {
      dispatch(getArticles([pagiPage, cookies.token]));
      nav('/');
    });
  };
  return (
    <div className={'article__wrapper'}>
      <div className={'full__item'}>
        <h3 className={'article__title'}>{isEdit ? 'Edit article' : 'Create new article'}</h3>
        <form className={'new-article__form'} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">
            Title
            <input
              className={errors?.title ? 'failed-validation-input' : 'form__input'}
              {...register('title')}
              placeholder={'Title'}
              defaultValue={isEdit ? article.title : ''}
            />
            {errors?.title ? <p className={'error__text'}>{errors.title.message}</p> : null}
          </label>
          <label htmlFor="description">
            Short description
            <input
              className={errors?.title ? 'failed-validation-input' : 'form__input'}
              {...register('description')}
              placeholder={'Title'}
              defaultValue={isEdit ? article.description : ''}
            />
            {errors?.description ? <p className={'error__text'}>{errors.description.message}</p> : null}
          </label>
          <label htmlFor="body">
            Text
            <textarea
              className={errors?.body ? 'failed-validation-input' : 'form__input text-area'}
              {...register('body')}
              placeholder={'Text'}
              defaultValue={isEdit ? article.body : ''}
            />
            {errors?.body ? <p className={'error__text'}>{errors.body.message}</p> : null}
          </label>
          <label>
            Tags
            {tags.map((item, index) => {
              return (
                <label
                  key={index + Math.random()}
                  className={'tags__label'}
                  onClick={(e) => {
                    e.preventDefault();
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (e.target.matches('button')) {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      const inputValue = e.currentTarget.children[0].value;
                      setTags(
                        tags.filter((tag) => {
                          return tag !== inputValue;
                        }),
                      );
                    }
                  }}
                >
                  <input
                    className={'form__tags-input'}
                    defaultValue={item}
                    disabled
                    name={'tag'}
                    placeholder={'Tags'}
                  />
                  <button className={'tags__button'}>Delete</button>
                </label>
              );
            })}
            <div className={'form__add-tags'}>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={'form__tags-input'}
                placeholder={'Type new tag'}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setValue('');
                  setTagError(false);
                }}
                className={'tags__button'}
              >
                Delete
              </button>
              <button onClick={addTagHandle} className={'tags__button add-tag'}>
                Add tag
              </button>
              {tagError ? <p className={'error__text'}>This tags has already exist</p> : null}
            </div>
          </label>
          <input className={'form__submit-btn new-article'} type="submit" value={'Save'} />
        </form>
      </div>
    </div>
  );
};

export default NewArticle;
