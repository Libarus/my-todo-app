import React from 'react';
import { updateUser } from '../features/usersSlice';
import { useAppDispatch } from '../store';

interface Props {
    user: any;
    closeModal: () => void;
}

const UserEditForm: React.FC<Props> = ({ user, closeModal }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = React.useState({
        name: user.name,
        email: user.email,
        age: user.age,
    });
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser({ id: user.id, data: formData }))
            .then(() => {
                closeModal();
                alert('Пользователь обновлен!');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className='w-full max-w-sm mx-auto mt-10'>
            <h2 className='text-xl font-bold mb-4'>Редактирование пользователя</h2>
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

                <label htmlFor='age' className='block text-gray-700 text-sm font-bold mb-2 mt-4'>
                    Возраст
                </label>
                <input
                    type='number'
                    id='age'
                    name='age'
                    value={formData.age}
                    onChange={handleChange}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />

                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full'
                >
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
};

export default UserEditForm;
