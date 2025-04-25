import { useState, useEffect } from 'react';
import api from '../api';

export default function TaskList({ project }) {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const fetchTasks = () => {
    api.get(`/tasks?projectId=${project._id}`).then(res => setTasks(res.data));
  };

  useEffect(fetchTasks, [project]);

  const createTask = async () => {
    const res = await api.post('/tasks', { ...form, projectId: project._id });
    setTasks([...tasks, res.data]);
    setForm({ title: '', description: '' });
  };

  const updateTask = async (id, status) => {
    await api.put(`/tasks/${id}`, { status, dateCompleted: status === 'done' ? new Date() : null });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Tasks for {project.name}</h3>
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button onClick={createTask} style={styles.addButton}>Add Task</button>
      </div>

      <ul style={styles.taskList}>
        {tasks.map(t => (
          <li key={t._id} style={styles.taskItem}>
            <strong>{t.title}</strong> - {t.status}
            <br />
            {t.description}
            <br />
            <select
              style={styles.statusSelect}
              value={t.status}
              onChange={e => updateTask(t._id, e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button
              onClick={() => deleteTask(t._id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  taskList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  taskItem: {
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  statusSelect: {
    padding: '8px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
