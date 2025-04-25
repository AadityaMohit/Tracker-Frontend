import { useState, useEffect } from 'react';
import api from '../api';

export default function ProjectList({ onSelect }) {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    api.get('/projects').then(res => setProjects(res.data));
  }, []);

  const createProject = async () => {
    const res = await api.post('/projects', { name });
    setProjects([...projects, res.data]);
    setName('');
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Your Projects</h3>
      <div style={styles.createProject}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
          style={styles.input}
        />
        <button onClick={createProject} style={styles.createButton}>Create</button>
      </div>
      <ul style={styles.projectList}>
        {projects.map(p => (
          <li
            key={p._id}
            onClick={() => onSelect(p)}
            style={styles.projectItem}
          >
            {p.name}
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
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  createProject: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    flex: 1,
  },
  createButton: {
    padding: '8px 16px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  projectList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  projectItem: {
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
