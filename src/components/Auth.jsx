import { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../authContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '', country: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const path = isLogin ? '/auth/login' : '/auth/signup';
    const payload = isLogin ? { email: form.email, password: form.password } : form;
    const res = await api.post(path, payload);
    login(res.data.token);
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <>
            <input
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              style={styles.input}
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              required
            />
          </>
        )}
        <input
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        style={styles.switchButton}
      >
        {isLogin ? 'Need an account? Signup' : 'Have an account? Login'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: 5,
    border: '1px solid #ccc',
    fontSize: 16,
    outline: 'none',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 20,
    background: 'none',
    color: '#007bff',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: 16,
  },
};
