import { createAsyncThunk } from '@reduxjs/toolkit';

import { IResponseArticle, IUser } from './blog-slices';

export const getArticles = createAsyncThunk('article/getArticles', async (data: [number, string]) => {
  const [page, token] = data;
  try {
    const indexOffset = page - 1;
    const offset = [0, 6, 12, 18, 24];
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=6&offset=${offset[indexOffset]}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Oh Hi Mark!');
    }
    const resJSON: IResponseArticle = await response.json();
    return resJSON.articles;
  } catch (e) {
    console.log(e, 'OOOps');
  }
});

interface IResponseUser {
  user: IUser;
}

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (token: string) => {
  try {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { user }: IResponseUser = await response.json();
    if (!response.ok) {
      throw new Error('Error with response');
    }
    return user;
  } catch (e) {
    console.log(e);
  }
});

export const addNewUser = createAsyncThunk('auth/addNewUser', async (formData: any, { dispatch }) => {
  const { username, password, email } = formData;
  console.log(formData);
  try {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          password,
          email,
        },
      }),
    });
    const dataUser = await response.json();
    if (!response.ok) throw dataUser;
    return dataUser.user;
  } catch (e) {
    return e;
  }
});
