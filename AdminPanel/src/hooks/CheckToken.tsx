import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

export const checkValidUser = async (navigate: NavigateFunction) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/me`, '', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      localStorage.removeItem('token');
      navigate('/');
      toast.error(error.response?.data.message);
    }
    return false;
  }
};
