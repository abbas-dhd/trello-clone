import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Project from './components/project/project';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { initializeProjectData } from './redux/slices/projectsDataSlice';
import { ProjectsDataSliceType, UserDataSliceType } from './types/types';
import { initializeUserData } from './redux/slices/userDataSlice';
import { Login } from './components/login/login';
import { Registration } from './components/registration/registration';
import { Header } from './components/header/header';

function Router() {
  const projectData = useAppSelector((state) => state.projectsDataSlice);
  const userData = useAppSelector((state) => state.userDataSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // check for user data in local storage
    const localUserData = localStorage.getItem('userData');
    if (localUserData !== null) {
      const _userData = JSON.parse(localUserData) as UserDataSliceType;
      if (_userData.password && _userData.userEmail) {
        dispatch(
          initializeUserData({
            userData: _userData,
          })
        );
      }
    }

    // check for project data in local storage
    const localProjectData = localStorage.getItem('projectsData');
    if (localProjectData !== null) {
      dispatch(
        initializeProjectData({
          newState: JSON.parse(localProjectData) as ProjectsDataSliceType,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (projectData.projects.length > 0) {
      // if there is data in the projectData state, save it to local storage
      localStorage.setItem('projectsData', JSON.stringify(projectData));
    }
  }, [projectData]);

  useEffect(() => {
    if (userData.password && userData.userEmail) {
      // if there is data in the userData state, save it to local storage
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route Component={Login} path="/login" />
        <Route Component={Registration} path="/register" />
        <Route Component={Dashboard} path="/" />
        <Route Component={Project} path="/project/:projectId" />
        {/* Catch-all unhandled routes */}
        <Route Component={Dashboard} path="/*" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
