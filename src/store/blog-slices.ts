import { createSlice } from '@reduxjs/toolkit';

import { addNewUser, getArticles, getCurrentUser } from './actions';

export interface IArticleAuthor {
  username: string;
  image: string;
  following: boolean;
}

export interface IArticlesData {
  author: IArticleAuthor;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
}

export interface IResponseArticle {
  articles: IArticlesData[];
  articlesCount: number;
}

export interface IArticles {
  articles: IArticlesData[] | [];
  singleArticle: IArticlesData | Record<string, any>;
  page: number;
}

const initialState: IArticles = {
  articles: [],
  singleArticle: {},
  page: 1,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    addSingleArticle: (state: IArticles, action) => {
      state.singleArticle = action.payload.article;
    },
    pagePaginationSet: (state: IArticles, { payload }) => {
      // не использовать деструктуризацию тут для входных параметров, иначе не меняется значение правильно
      state.page = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.fulfilled, (state: IArticles | any, action) => {
      state.articles = action.payload;
    });
  },
});

export interface IUser {
  email: string;
  token: null;
  username: string;
  bio?: string;
  image?: string;
}

interface IAuthState {
  isAuth: boolean;
  authUser: null | IUser;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    authUser: null,
  } as IAuthState,
  reducers: {
    setAuthUser: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserData: (state, action) => {
      state.authUser = { ...action.payload.user, token: null };
    },
    clearUserData: (state) => {
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state: IUser | any, action) => {
        state.authUser = { ...action.payload, token: null };
      })
      .addCase(addNewUser.fulfilled, (state: IUser | any, action) => {
        state.authUser = { ...action.payload, token: null };
      });
  },
});

export const memSlice = createSlice({
  name: 'mem',
  initialState: {
    isMemTime: false,
  },
  reducers: {
    memToggle: (state) => {
      state.isMemTime = !state.isMemTime;
    },
  },
});

const reducers = {
  article: articleSlice.reducer,
  auth: authSlice.reducer,
  mem: memSlice.reducer,
};

export const { addSingleArticle, pagePaginationSet } = articleSlice.actions;
export const { setAuthUser, setUserData } = authSlice.actions;
export const { memToggle } = memSlice.actions;
export default reducers;
