
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/users';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const checkAuth = () => {
    return initialState.isAuthenticated;
}
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({email, password}) => {
    //To Do: signup implementation
  }
);

// define the sign in action using createAsyncThunk
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (user) => {
     const response = await axios.post(apiUrl+"/login/", user);
  return response.data;
  }
);

// define the sign out action using createAsyncThunk
export const signOut = createAsyncThunk(
  "auth/signOut",
  async () => {

  }
);

// create the auth slice with the three reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      },
    //signin
    [signIn.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [signIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      },
    //sign out
    [signOut.pending]: (state) => {
      state.isLoading = true;
    },
    [signOut.fulfilled]: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    [signOut.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;

