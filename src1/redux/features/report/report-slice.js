
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/users';

export const fetchReport = createAsyncThunk( 'report/fetchReport', async () => {
  const response = await axios.get(apiUrl+"/total/");
  return response.data.data;
} );

export const createSubject = createAsyncThunk('students/createSubject', async (user) => {
  const response = await axios.post(apiUrl+"/user-create/", user);
  return response.data;
});

export const updateSubject = createAsyncThunk('students/updateSubject', async (user) => {
  const response = await axios.put(`${apiUrl}/${user.id}`, user);
  return response.data;
});

export const deleteSubject = createAsyncThunk('students/deleteSubject', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

const studentsSlice = createSlice({
  name: 'report',
  initialState: { reports: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: {
    [fetchReport.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchReport.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.students = action.payload;
    },
    [fetchReport.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
   
    [deleteSubject.fulfilled]: (state, action) => {
      const { payload } = action;
      const existingSubject = state.students.find((user) => user.id === payload);
      if (existingSubject) {
        state.students = state.students.filter((user) => user.id !== payload);
      }
    },
  },
});

export default studentsSlice.reducer;

