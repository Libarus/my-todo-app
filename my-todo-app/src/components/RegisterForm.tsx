import React from 'react';
import { registerUser } from '../features/usersSlice';
import { useAppDispatch, useAppSelector } from '../store';

interface Props {}

const RegisterForm: React.FC<Props> = () => {
    const loading = useAppSelector((state: any) => state.users.loading);
    const dispatch = useAppDispatch();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(formData))
            .then(() => {
                alert('Регистрация прошла успешно!');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <>
            {loading && <div style={{ color: 'red', fontSize: '30px' }}>loading</div>}
            <div className='w-full max-w-sm mx-auto mt-10'>
                <h2 className='text-xl font-bold mb-4'>Регистрация</h2>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                <form onSubmit={handleSubmit} className='border border-gray-200 p-4 rounded'>
                    <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>
                        Имя
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />

                    <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2 mt-4'>
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
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
