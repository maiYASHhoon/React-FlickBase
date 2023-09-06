import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  errorGlobal,
  successGlobal,
  clearNotification,
} from '../reducers/notifications';
import { getAuthHeader, removeTokenCookie} from '../../utils/tools';
import axios from 'axios';
var BASE_URL = `http://localhost:3002/api/`;
export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ email, password }, { dispatch }) => {
    try {
      const request = await axios.post(`${BASE_URL}auth/register`, {
        email: email,
        password: password,
      });
      dispatch(successGlobal('Welcome !!!'));
      return { data: request.data.user, auth: true };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const signInUser = createAsyncThunk(
  'users/signInUser',
  async ({ email, password }, { dispatch }) => {
    try {
      const request = await axios.post(`${BASE_URL}auth/signin`, {
        email: email,
        password: password,
      });
      dispatch(successGlobal('Welcome !!!'));
      return { data: request.data.user, auth: true };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const isAuth = createAsyncThunk('users/isAuth', async () => {
  try {
    const request = await axios.get(`${BASE_URL}auth/isauth`, getAuthHeader())
    return { data: request.data, auth:true}
  } catch (error) {
    return { data: {}, auth: false}
  }
});
