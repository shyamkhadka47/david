import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { checkValidUser } from '../hooks/CheckToken';

const ProtectedLayout: React.FC = () => {
  const [token, setToken] = React.useState(() => localStorage.getItem('token'));
  const [isValid, setIsValid] = React.useState<boolean | null | undefined>(
    null,
  );

  const navigate = useNavigate();
  React.useEffect(() => {
    const validateUser = async () => {
      const valid = await checkValidUser(navigate);
      setIsValid(valid);
    };

    validateUser();
  }, [navigate]);

  React.useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [token]);

  if (!token) {
    navigate('/');
  }

  if (isValid === null) {
    return <div></div>;
  }

  return isValid ? <Outlet /> : <Navigate to={'/'} />;
};

export default ProtectedLayout;
