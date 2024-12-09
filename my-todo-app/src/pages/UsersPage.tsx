import React from 'react';
import UserList from '../components/UserList';

const UsersPage: React.FC = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <UserList />
        </div>
    );
};

export default UsersPage;
