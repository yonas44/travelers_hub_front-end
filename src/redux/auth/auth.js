import { createAsyncThunk } from '@reduxjs/toolkit';

const SIGN_IN = 'auth/sign_in';
const SIGN_UP = 'auth/sign_up';
const SIGN_OUT = 'auth/sign_out';
const CLEAN_FLASH = 'auth/clean_flash';
const RESET_STATE_AND_KEEP_FLASH = 'auth/reset_state_and_keep_flash';

const SIGN_IN_URL = `${process.env.REACT_APP_API_ROOT_URL}/users/sign_in`;
const SIGN_UP_URL = `${process.env.REACT_APP_API_ROOT_URL}/users`;
const SIGN_OUT_URL = `${process.env.REACT_APP_API_ROOT_URL}/users/sign_out`;

const initialState = [];

const setToken = (token) => {
  sessionStorage.setItem('user', JSON.stringify({ token }));
};

const removeToken = () => {
  sessionStorage.removeItem('user');
};

export const getToken = () => JSON.parse(sessionStorage.getItem('user'))?.token;

export const cleanFlash = () => ({ type: CLEAN_FLASH });
export const resetStateAndKeepFlash = () => ({
  type: RESET_STATE_AND_KEEP_FLASH,
});

export const signin = createAsyncThunk(
  SIGN_IN,
  async (payload, { rejectWithValue }) => {
    const response = await fetch(SIGN_IN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: payload }),
    });

    if (!response.ok) {
      return rejectWithValue({
        success: response.ok,
        errors: ['Invalid credentials'],
      });
    }

    const data = await response.json();
    setToken(response.headers.get('Authorization'));
    sessionStorage.setItem('current', data.resource.id);
    return { success: response.ok, ...data };
  },
);

export const signup = createAsyncThunk(
  SIGN_UP,
  async (payload, { rejectWithValue }) => {
    const response = await fetch(SIGN_UP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: payload }),
    });

    if (!response.ok) {
      return rejectWithValue({
        success: response.ok,
        errors: ['Invalid data'],
      });
    }

    return { success: response.ok, ...(await response.json()) };
  },
);

export const signout = createAsyncThunk(
  SIGN_OUT,
  async (_, { rejectWithValue }) => {
    const response = await fetch(SIGN_OUT_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    });

    if (response.ok) {
      removeToken();
    }

    if (!response.ok) {
      return rejectWithValue({
        success: response.ok,
        errors: ['An error occurred while logging out'],
      });
    }

    return { success: response.ok, ...(await response.json()) };
  },
);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SIGN_IN}/pending`:
      return { success: null, loading: true };
    case `${SIGN_IN}/fulfilled`:
      return {
        success: true,
        loading: false,
        message: action.payload.message,
        user: action.payload.resource,
      };
    case `${SIGN_IN}/rejected`:
      return { success: false, loading: false, errors: action.payload.errors };
    case `${SIGN_OUT}/pending`:
      return { success: null, loading: true };
    case `${SIGN_OUT}/fulfilled`:
      return {
        success: true,
        loading: false,
        message: action.payload.message,
        user: null,
      };
    case `${SIGN_OUT}/rejected`:
      return { success: false, loading: false, errors: action.payload.errors };
    case `${SIGN_UP}/pending`:
      return { success: null, loading: true };
    case `${SIGN_UP}/fulfilled`:
      return { success: true, loading: false, message: action.payload.message };
    case `${SIGN_UP}/rejected`:
      return { success: false, loading: false, errors: action.payload.errors };
    case CLEAN_FLASH:
      return { success: null, loading: false };
    case RESET_STATE_AND_KEEP_FLASH:
      return { ...state, loading: false, success: null };
    default:
      return state;
  }
};
