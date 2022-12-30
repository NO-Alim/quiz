import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './component/PrivateRoute';
import PublicRoute from './component/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import ControlPanel from './pages/ControlPanel';
import Dashboard from './pages/Dashboard';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Register from './pages/Register';
const App = () => {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <h1>Checking Authentication</h1>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/controlPanel"
          element={
            <PrivateRoute>
              <ControlPanel />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/ranking"
          element={
            <PrivateRoute>
              <Ranking />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </Router>
  );
};

export default App;
