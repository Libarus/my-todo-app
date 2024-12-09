import React from 'react';
import TaskList from '../components/TaskList';

const TasksPage: React.FC = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <TaskList />
        </div>
    );
};

export default TasksPage;
