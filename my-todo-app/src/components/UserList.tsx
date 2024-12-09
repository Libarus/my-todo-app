import React, { useEffect } from 'react';
import { deleteUser, fetchUsers } from '../features/usersSlice';
import UserItem from './UserItem';
import UserEditForm from './UserEditForm';
import { useAppDispatch, useAppSelector } from '../store';

interface Props {}

const UserList: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state: any) => state.users.users);
    const [editingUser, setEditingUser] = React.useState<any | null>(null);

    useEffect(() => {    
        dispatch(fetchUsers());
    }, [dispatch]);

    const openEditModal = (user: any) => {
        setEditingUser(user);
    };

    const closeEditModal = () => {
        setEditingUser(null);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <div className='w-full max-w-md mx-auto mt-10'>
            <h2 className='text-xl font-bold mb-4'>Список пользователей</h2>
            {users.map((user: any) => (
                <UserItem key={user.id} user={user} onEdit={() => openEditModal(user)} onDelete={() => handleDelete(user.id)} />
            ))}
            {editingUser && <UserEditForm user={editingUser} closeModal={closeEditModal} />}
        </div>
    );
};

export default UserList;
