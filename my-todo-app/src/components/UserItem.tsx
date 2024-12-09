import React from 'react';

interface Props {
    user: any;
    onEdit: () => void;
    onDelete: () => void;
}

const UserItem: React.FC<Props> = ({ user, onEdit, onDelete }) => {
    return (
        <div className='bg-white shadow rounded p-4 mb-4'>
            <h3 className='font-semibold text-lg'>{user.name}</h3>
            <p className='text-gray-600'>{user.email}</p>
            <p className='text-gray-700'>Возраст: {user.age}</p>
            <div className='mt-4'>
                <button onClick={onEdit} className='mr-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded'>
                    Редактировать
                </button>
                <button onClick={onDelete} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default UserItem;
