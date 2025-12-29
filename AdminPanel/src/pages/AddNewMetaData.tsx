import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';

const AddNewMetaData = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    page: '',
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post('/addmetadata', data);
      if (res.status === 201 || res.status === 200) {
        toast.success(res.data.message || 'Metadata added successfully');
        setData({ page: '', title: '', description: '' });
        navigate('/metadata');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Upload failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full min-h-screen shadow-md flex flex-col gap-6 p-10">
      <h1 className="text-center font-bold text-black text-[20px] underline underline-offset-8">
        Add New Metadata
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[80%] mx-auto max-w-[600px]">
        <input
          value={data.page}
          onChange={handleChange}
          type="text"
          name="page"
          className="rounded-md h-[50px] p-4 text-black bg-[#f1f3f9] outline-none"
          placeholder="Page Slug (e.g., about, contact)"
        />
        <input
          value={data.title}
          onChange={handleChange}
          type="text"
          name="title"
          className="rounded-md h-[50px] p-4 text-black bg-[#f1f3f9] outline-none"
          placeholder="Meta Title"
        />
        <textarea
          value={data.description}
          onChange={handleChange}
          name="description"
          rows={5}
          className="rounded-md p-4 text-black bg-[#f1f3f9] outline-none"
          placeholder="Meta Description"
        ></textarea>

        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/metadata')}
            className="bg-red-600 py-3 px-6 rounded-md text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`py-3 px-6 rounded-md text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-800'
            }`}
          >
            {loading ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewMetaData;
