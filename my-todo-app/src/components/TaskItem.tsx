import React from 'react';

interface Props {
  task: any;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-gray-600">{new Date(task.due_date).toLocaleDateString()}</p>
      <p className="text-gray-700">{task.completed ? 'Выполнено' : 'Не выполнено'}</p>
    </div>
  );
};

export default TaskItem;