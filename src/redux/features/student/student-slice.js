
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/users';

export const fetchStudents = createAsyncThunk( 'students/fetchStudents', async () => {
  const response = await axios.get(apiUrl+"/user-list/");
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
  name: 'students',
  initialState: { students: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: {
    [fetchStudents.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createSubject.fulfilled]: (state, action) => {
      state.students.push(action.payload);
    },
    [updateSubject.fulfilled]: (state, action) => {
      const { id, name, category, grade, image } = action.payload;
      const existingSubject = state.students.find((user) => user.id === id);
      if (existingSubject) {
        existingSubject.name = name;
          existingSubject.category = category;
                  existingSubject.grade = grade;
        existingSubject.image = image;
      }
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

