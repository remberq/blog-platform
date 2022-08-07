import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IArticleAuthor {
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

interface IResponseArticle {
  articles: IArticlesData[];
  articlesCount: number;
}

interface IArticles {
  articles: IArticlesData[] | [];
  singleArticle: IArticlesData | Record<string, any>;
  page: number;
}

export const getArticles = createAsyncThunk('article/getArticles', async function (arg) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  try {
    console.log('hii');
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=6&offset=${arg}`);
    if (!response.ok) {
      throw new Error('Oh Hi Mark!');
    }
    const resJSON: IResponseArticle = await response.json();
    return resJSON.articles;
  } catch (e) {
    console.log(e, 'OOOps');
  }
});

const initialState: IArticles = {
  articles: [],
  singleArticle: {},
  page: 1,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    addSingleArticle: (state, action) => {
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

interface IUser {
  email: string;
  token: string;
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
      state.authUser = action.payload.user;
    },
    clearUserData: (state) => {
      state.authUser = null;
    },
  },
});

const reducers = {
  article: articleSlice.reducer,
  auth: authSlice.reducer,
};

export const { addSingleArticle, pagePaginationSet } = articleSlice.actions;
export const { setAuthUser, setUserData } = authSlice.actions;
export default reducers;
