import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  const [task, setTask] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(0);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      showAlert(true, 'please, enter the task', 'danger');
    } else if (task && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: task };
          }
          return item;
        })
      );
      setTask('');
      setIsEditing(false);
      setEditID(0);
      showAlert(true, 'your task is edited', 'success');
    } else {
      showAlert(true, 'your task is added', 'success');
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
        completed: false,
      };
      setList([...list, newTask]);
      setTask('');
    }
  };
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };
  const clearAllTasks = () => {
    setList([]);
    showAlert(true, 'all tasks are cleared', 'danger');
  };
  const deleteTask = (id) => {
    showAlert(true, 'your task is deleted', 'danger');
    const newList = list.filter((task) => task.id !== id);
    setList(newList);
  };
  const editTask = (id) => {
    const editedTask = list.find((task) => task.id === id);
    setIsEditing(true);
    setEditID(id);
    setTask(editedTask.title);
  };
  const toggleComplete = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
    showAlert(true, 'your task is completed', 'success');
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      <form className='task-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>todo app</h3>
        <div className='form-control'>
          <input
            type='text'
            className='input-task'
            placeholder='add a new task...'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='tasks-container'>
          <List
            list={list}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleComplete={toggleComplete}
          />
          <button className='clear-btn' onClick={clearAllTasks}>
            clear tasks
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
