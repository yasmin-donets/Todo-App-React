import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ list, deleteTask, editTask, toggleComplete }) => {
  return (
    <div className='tasks-list'>
      {list.map((item) => {
        const { id, title, completed } = item;
        return (
          <article key={id} className='task-item'>
            <p
              onClick={() => toggleComplete(id)}
              className={completed ? 'title completed-task' : 'title'}
            >
              {title}
            </p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editTask(id)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => deleteTask(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
