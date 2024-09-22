import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from '../services/TaskService';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    TaskService.getTaskById(id).then((response) => {
      setTask(response.data);
    }).catch(() => {
      setError("Task not found.");
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!task.name || !task.description) {
      setError('Both fields are required!');
      return;
    }
    TaskService.updateTask(id, task).then(() => {
      setError('');
      navigate('/');
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Edit Task</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdate}>
        <div className="form-group mb-3">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={task.name || ''}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Task Description</label>
          <textarea
            className="form-control"
            value={task.description || ''}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-warning w-100">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskDetail;
