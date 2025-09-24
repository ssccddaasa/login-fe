// src/components/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../Instances/AxiosInstance';

export function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const checkAuth = async () => {
      try {
        // call protected route — your AppController @Get() at root returns { message, userId }
        const res = await instance.get('/');
        if (!mounted) return;
        setUserId(res.data?.userId ?? null);
        setLoading(false);
      } catch (err: any) {
        console.error('Protected route call failed', err);
        setLoading(false);
        setError('Not authenticated');
        // if 401 or other, redirect to login
        navigate('/login');
      }
    };
    checkAuth();
    return () => { mounted = false };
  }, [navigate]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
        <p>Welcome</p>

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
