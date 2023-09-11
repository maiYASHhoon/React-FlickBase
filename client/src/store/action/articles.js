import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  errorGlobal,
  successGlobal,
  clearNotification,
} from '../reducers/notifications';
import { getAuthHeader } from '../../utils/tools';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
var BASE_URL = `http://localhost:3002/api/`;
export const addArticle = createAsyncThunk(
  'articles/addArticle',
  async (article, { dispatch }) => {
    try {
      const request = await axios.post(
        `${BASE_URL}/articles/`,
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
