import { useContext, useState } from 'react';
import { AuthContext } from '../authContext';
import ProjectList from './ProjectList';
import TaskList from './TaskList';

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Task Tracker</h1>
      <button onClick={logout} style={styles.logoutButton}>Logout</button>
      <div style={styles.dashboardContent}>
        <ProjectList onSelect={setSelectedProject} />
        {selectedProject && <TaskList project={selectedProject} />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#333',
    marginBottom: '20px',
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dashboardContent: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};
