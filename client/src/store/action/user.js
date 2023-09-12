import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  errorGlobal,
  successGlobal,
  clearNotification,
} from '../reducers/notifications';
import { getAuthHeader, removeTokenCookie } from '../../utils/tools';
import axios from 'axios';
import cookie from 'react-cookies';
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
      cookie.save('x-access-token', request.data.token, { path: '/' });
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
      cookie.save('x-access-token', request.data.token, { path: '/' });
      return { data: request.data.user, auth: true };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const isAuth = createAsyncThunk('users/isAuth', async () => {
  try {
    const request = await axios.get(`${BASE_URL}auth/isauth`, getAuthHeader());
    return { data: request.data, auth: true };
  } catch (error) {
    return { data: {}, auth: false };
  }
});
export const signOut = createAsyncThunk('users/signOut', async () => {
  removeTokenCookie();
});
export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (data, { dispatch }) => {
    try {
      const profile = await axios.patch(
        `${BASE_URL}/users/profile`,
        data,
        getAuthHeader()
      );
      dispatch(successGlobal('Profile updated !!'));
      return {
        firstname: profile.data.firstname,
        lastname: profile.data.lastname,
        age: profile.data.age,
      };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
export const changeEmail = createAsyncThunk(
  'users/changeEmail',
  async (data, { dispatch }) => {
    try {
      const request = await axios.patch(
        `${BASE_URL}/users/email`,
        {
          email: data.email,
          newemail: data.newemail,
        },
        getAuthHeader()
      );
      dispatch(successGlobal('Email updated !!'));
      return {
        email: request.data.user.email,
        verified: false,
      };
    } catch (error) {
      dispatch(errorGlobal(error.response.data.message));
      throw error;
    }
  }
);
