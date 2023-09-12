import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  errorGlobal,
  successGlobal,
  clearNotification,
} from '../reducers/notifications';
import { getAuthHeader } from '../../utils/tools';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
var BASE_URL = `http://localhost:3002`;
export const addArticle = createAsyncThunk(
  'articles/addArticle',
  async (article, { dispatch }) => {
    try {
      const request = await axios.post(
        `${BASE_URL}/api/articles`,
        article,
        getAuthHeader()
      );
      dispatch(successGlobal('Post created!!'));
      return request.data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const getAdminArticle = createAsyncThunk(
  'articles/getAdminArticle',
  async (_id, { dispatch }) => {
    try {
      const request = await axios.get(
        `${BASE_URL}/api/articles/article/${_id}`,
        getAuthHeader()
      );
      return request.data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ values, articleId }, { dispatch }) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/articles/article/${articleId}`,
        values,
        getAuthHeader()
      );
      dispatch(successGlobal('Article updated !!'));
      return true;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const getPaginateArticles = createAsyncThunk(
  'articles/getPaginateArticles',
  async ({ page = 1, limit = 5, keywords = '' }, { dispatch }) => {
    try {
      const request = await axios.post(
        `${BASE_URL}/api/articles/admin/paginate`,
        {
          page,
          limit,
          keywords,
        },
        getAuthHeader()
      );
      return request.data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const changeStatusArticle = createAsyncThunk(
  'articles/changeStatusArticle',
  async ({ newStatus, _id }, { dispatch, getState }) => {
    try {
      const request = await axios.patch(
        `${BASE_URL}/api/articles/article/${_id}`,
        {
          status: newStatus,
        },
        getAuthHeader()
      );
      let article = request.data;
      // previous state
      let state = getState().articles.adminArticles.docs;
      //  find the position
      let position = state.findIndex((article) => article._id === _id);
      //we cannot mutate 'let state', we create copy
      const newState = [...state];
      newState[position] = article;
      dispatch(successGlobal('Status changed !!'));
      return newState;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const removeArticle = createAsyncThunk(
  'articles/removeArticle',
  async (_id, { dispatch, getState }) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/articles/article/${_id}`,
        getAuthHeader()
      );
      dispatch(successGlobal('Article Removed!'));
      let page = getState().articles.adminArticles.page;
      dispatch(getPaginateArticles({ page }));
      return true;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const homeLoadMore = createAsyncThunk(
  'articles/homeLoadMore',
  async (sort, { dispatch, getState }) => {
    try {
      const articles = await axios.post(`${BASE_URL}/api/articles/all`, sort);
      const state = getState().articles.articles;
      const prevState = [...state];
      const newState = [...prevState, ...articles.data];
      return { newState, sort };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const getArticle = createAsyncThunk(
  'articles/getArticle',
  async (id, { dispatch }) => {
    try {
      const request = await axios.get(
        `${BASE_URL}/api/articles/users/article/${id}`
      );
      return request.data;
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
