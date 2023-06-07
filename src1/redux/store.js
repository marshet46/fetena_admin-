import { configureStore } from '@reduxjs/toolkit';
import SubjectReducer from './features/subject/subject-slice';
import StudentReducer from './features/student/student-slice';
import ExamReducer from './features/exam/exam-slice';
import  examReducer from './features/exam/exam-slice';
import  ReportReducer from './features/report/report-slice';
import QuestionReducer from './features/questions/question-slice';
import AuthReducer from './features/user/user-slice';
import { createStore, combineReducers } from 'redux';
export default configureStore({
    reducer: {
        subjects: SubjectReducer,
        exams: ExamReducer,
        questions: QuestionReducer,
        user: AuthReducer,
        exam: examReducer,
        students: StudentReducer,
        report: ReportReducer,
    }
})




