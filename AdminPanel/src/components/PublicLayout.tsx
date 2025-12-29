import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../common/Loader';

const PublicLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Handle loading state
  const [loading, setLoading] = useState<boolean>(true); // Loading state for authentication check

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/me`,
          '',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false); // Once authentication is checked, stop loading
      }
    })();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // Show a loading state or spinner while the auth check is in progress
  }

  return (
    <div>{isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />}</div>
  );
};

export default PublicLayout;
