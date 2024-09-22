import React, { useState } from 'react';
import TaskService from '../services/TaskService';
import { useNavigate } from 'react-router-dom';


const AddTask = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError('Both fields are required!');
      return;
    }
    const newTask = { name, description };
    TaskService.createTask(newTask).then(() => {
      setError('');
      navigate('/');
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group mb-3">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Task Description</label>
          <textarea
            className="form-control"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
