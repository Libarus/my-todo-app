import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

const RoutesComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default RoutesComponent;
