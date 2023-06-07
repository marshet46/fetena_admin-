
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/subject';

export const fetchSubjects = createAsyncThunk( 'subjects/fetchSubjects', async () => {
  const response = await axios.get(apiUrl+"/subject-list/");
  return response.data.data;
} );

export const createSubject = createAsyncThunk('subjects/createSubject', async (subject) => {
  const response = await axios.post(apiUrl+"/subject-create/", subject);
  return response.data;
});

export const updateSubject = createAsyncThunk('subjects/updateSubject', async (subject) => {
    const formData = new FormData();
        formData.append("name", subject.name);
        formData.append("category", subject.category);
        formData.append("grade", subject.grade);
        formData.append("image", subject.image);
  const response = await axios.post(`${apiUrl}/subject-update/${subject.id}/`, formData);
  return response.data;
});

export const deleteSubject = createAsyncThunk('subjects/deleteSubject', async (id) => {
  await axios.delete(`${apiUrl}/subject-delete/${id}/`);
  return id;
});

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: { subjects: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: {
    [fetchSubjects.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchSubjects.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.subjects = action.payload;
    },
    [fetchSubjects.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createSubject.fulfilled]: (state, action) => {
      state.subjects.push(action.payload);
    },
    [updateSubject.fulfilled]: (state, action) => {
      const { id, name, category, grade, image } = action.payload;
      const existingSubject = state.subjects.find((subject) => subject.id === id);
      if (existingSubject) {
        existingSubject.name = name;
          existingSubject.category = category;
                  existingSubject.grade = grade;
        existingSubject.image = image;
      }
    },
    [deleteSubject.fulfilled]: (state, action) => {
      const { payload } = action;
      const existingSubject = state.subjects.find((subject) => subject.id === payload);
      if (existingSubject) {
        state.subjects = state.subjects.filter((subject) => subject.id !== payload);
      }
    },
  },
});

export default subjectsSlice.reducer;

