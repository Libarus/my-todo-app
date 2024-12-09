import React from 'react';
import Routes from './routes';

const App: React.FC = () => {
    return (
        <>
            <ul>
                <li><a href='/'>Главная</a></li>
                <li><a href='/tasks'>Задачи</a></li>
                <li><a href='/login'>Вход</a></li>
            </ul>
            <hr />
            <Routes />
        </>
    );
};

export default App;
