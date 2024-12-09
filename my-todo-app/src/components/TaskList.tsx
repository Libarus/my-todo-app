import React from 'react';
import { fetchTasks } from '../features/tasksSlice';
import TaskItem from './TaskItem';
import { useAppDispatch, useAppSelector } from '../store';

interface Props {}

const TaskList: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state: any) => state.tasks.tasks);

    React.useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div className='w-full max-w-md mx-auto mt-10'>
            <h2 className='text-xl font-bold mb-4'>Список задач</h2>
            {tasks && tasks.map((task: any) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
