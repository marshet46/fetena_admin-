
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/question';

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await axios.get(apiUrl+"/question-list/");
  return response.data.data;
});

export const createQuestion = createAsyncThunk('questions/createQuestion', async (subject) => {
  const response = await axios.post(apiUrl+"/question-create/", subject);
  return response.data;
});


export const updateQuestion = createAsyncThunk('questions/updateQuestion', async (question) => {
  const response = await axios.put(`${apiUrl}/question-update/${question.id}`, question);
  return response.data.data;
});

export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (id) => {
  await axios.delete(`${apiUrl}/question-delete/${id}/`);
  return id;
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState: { questions: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: {
    [fetchQuestions.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.questions = action.payload;
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createQuestion.fulfilled]: (state, action) => {
      state.questions.push(action.payload);
    },
    [updateQuestion.fulfilled]: (state, action) => {
      const { id, subjectId, question, A, B, C, D, answer, explanation, image, passage } = action.payload;
      const existingQuestion = state.questions.find((question) => question.id === id);
      if (existingQuestion) {
        existingQuestion.question = question;
          existingQuestion.answer = answer;


      }
    },
    [deleteQuestion.fulfilled]: (state, action) => {
      const { payload } = action;
      const existingQuestion = state.questions.find((question) => question.id === payload);
      if (existingQuestion) {
        state.questions = state.questions.filter((question) => question.id !== payload);
      }
    },
  },
});

export default questionsSlice.reducer;
