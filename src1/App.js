import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Dashboard, Subjects, Students, Exam, Questions, Login, Employees } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

import { useDispatch, useSelector } from 'react-redux';
import ExcelImport from './pages/import';
import StudentTable from './components/studentTable';
import ExamTable from './components/examTable';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();


  const dispatch = useDispatch();
  const auth = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const status = useSelector(state => state.user.isLoading);
  const error = useSelector(state => state.user.error);
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  if (auth) {
  return <Login/>
  }

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Dashboard />)} />
                <Route path="/Dashboard" element={(<Dashboard />)} />

                {/* pages  */}
                <Route path="/list_subjects" element={<Subjects />} />
                <Route path="/add_subjects" element={<Subjects />} />
                <Route path="/manage_subjects" element={<Subjects />} />
                {/* exam */}
                <Route path="/list_exam" element={<ExamTable />} />
                <Route path="/add_exam" element={<Exam />} />
                <Route path="/manage_exam" element={<Exam />} />
                {/* question routs */}
                <Route path="/import" element={<ExcelImport />} />
               <Route path="/list_questions" element={<Questions />} />
               <Route path="/add_question" element={<Questions />} />
               <Route path="/manage_question" element={<Questions />} />
               {/* users */}
               <Route path="/list_users" element={<Exam />} />
                <Route path="/add_users" element={<Exam />} />
                <Route path="/manage_users" element={<Exam />} />
                {/* other */}
                {/* student route */}
                <Route path="/list_students" element={<StudentTable/>} />
                <Route path="/add_students" element={<Students />} />
                <Route path="/manage_students" element={<Students />} />
                {/* payment route */}
              <Route path="/list_payment" element={<Employees />} />

              <Route path="/revenue" element={<Employees />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
