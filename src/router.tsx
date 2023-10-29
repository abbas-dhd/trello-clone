import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Project from './components/project/project';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Dashboard} path="/"></Route>
        <Route Component={Project} path="/project/:projectId"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
