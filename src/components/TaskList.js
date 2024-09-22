import React, { useEffect, useState } from 'react';
import TaskService from '../services/TaskService';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    TaskService.getAllTasks()
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the tasks!', error);
        setLoading(false);
      });
  };

  const deleteTask = (id) => {
    TaskService.deleteTask(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Task List</h2>
      <div className="text-center mb-4">
        <Link to="/add" className="btn btn-primary">
          Add New Task
        </Link>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="list-group">
          {tasks.map((task) => (
            <div key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{task.name}</h5>
                <p>{task.description}</p>
              </div>
              <div>
                <Link to={`/edit/${task.id}`} className="btn btn-warning btn-sm mr-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
