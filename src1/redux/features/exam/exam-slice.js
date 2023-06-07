
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/exam';

export const fetchExams = createAsyncThunk('exams/fetchExams', async () => {
  const response = await axios.get(apiUrl+"/exam-list/");
  return response.data.data;
});

export const createExam = createAsyncThunk('exams/createExam', async (subject) => {
  const response = await axios.post(apiUrl+"/exam-create/", subject);
  return response.data;
});

export const updateExam = createAsyncThunk('exams/updateExam', async (exam) => {
  const response = await axios.put(`${apiUrl}/${exam.id}`, exam);
  return response.data.data;
});

export const deleteExam = createAsyncThunk('exams/deleteExam', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

const examsSlice = createSlice({
  name: 'exams',
  initialState: { exams: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: {
    [fetchExams.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchExams.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.exams = action.payload;
    },
    [fetchExams.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createExam.fulfilled]: (state, action) => {
      state.exams.push(action.payload);
    },
    [updateExam.fulfilled]: (state, action) => {
      const { id, year, subjectId, time, totalquestions } = action.payload;
      const existingExam = state.exams.find((exam) => exam.id === id);
      if (existingExam) {
        existingExam.year = year;
          existingExam.time = time;
                  existingExam.totalquestions = totalquestions;

      }
    },
    [deleteExam.fulfilled]: (state, action) => {
      const { payload } = action;
      const existingExam = state.exams.find((exam) => exam.id === payload);
      if (existingExam) {
        state.exams = state.exams.filter((exam) => exam.id !== payload);
      }
    },
  },
});

export default examsSlice.reducer;
