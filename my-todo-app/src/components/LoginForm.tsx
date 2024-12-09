import React from 'react';
import { loginUser } from '../features/usersSlice';
import { useAppDispatch } from '../store';

interface Props {}

const LoginForm: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = React.useState({
        email: 'sss@ddd.fff',
        password: '123',
    });
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser(formData))
            .then(() => {
                alert('Вы вошли в систему!');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const check = async () => {
        await fetch('http://localhost:3333/protected', {
            credentials: "include",
            method: 'GET',
            headers: {

                'Content-Type': 'application/json',
            }
        });
    };

    const logout = async () => {
        await fetch('http://localhost:3333/logout', {
            method: 'GET',
            credentials: "include",
        });
    };

    return (
        <div className='w-full max-w-sm mx-auto mt-10'>
            <button onClick={check} className='pr-5'>click</button>
            <button onClick={logout}>logout</button>
            <h2 className='text-xl font-bold mb-4'>Вход</h2>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <form onSubmit={handleSubmit} className='border border-gray-200 p-4 rounded'>
                <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />

                <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2 mt-4'>
                    Пароль
                </label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />

                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full'
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
