import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from './AuthCard';
import { TextInput } from './TextInput';
import { PrimaryButton } from '../utils/PrimaryButton';
import api from '../api/Axios';
import Navbar from '../components/Navbar';
export const LoginPage = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav('/books');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <AuthCard title="Sign in to your account" onSubmit={submit} loading={loading}>
      <TextInput name="email" type="email" placeholder="Email" value={form.email} onChange={handle} />
      <TextInput name="password" type="password" placeholder="Password" value={form.password} onChange={handle} />
      {error && <p className="text-sm text-rose-500">{error}</p>}
      <PrimaryButton label={loading ? 'Signing in…' : 'Sign in'} />
      <p className="pt-3 text-center text-sm">
        New here?{' '}
        <span className="cursor-pointer text-sky-600 hover:text-sky-700" onClick={() => nav('/signup')}>
          Create an account
        </span>
      </p>
    </AuthCard>
    </>
  );
};