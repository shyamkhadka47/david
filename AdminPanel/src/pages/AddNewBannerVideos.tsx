/* eslint-disable @next/next/no-img-element */
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsUpload } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';

const AddNewBannerVideos = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    description: '',
    title: '',
    page: '', // ✅ Added page field
  });
  const [loading, setLoading] = useState(false);

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPage = data.page.replace(/[\s-]/g, '').toLowerCase();
    setLoading(true);
    if (!videoFile) {
      setLoading(false)
      return toast.error('Please upload a video file');
    }

    const formData = new FormData();
    formData.append('description', data.description);
    formData.append('title', data.title);
    formData.append('page', cleanPage); // ✅ Append page field
    formData.append('videoFile', videoFile);

    try {
      const res = await axiosInstance.post('/addbannervideo', formData);
      if (res.status === 200) {
        toast.success(res.data.message);
        setData({ title: '', description: '', page: '' }); // ✅ Reset page
        setVideoFile(null);
        navigate('/banner-videos');
        setLoading(false);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Failed to upload video');
        setLoading(false);
      }
    }
    finally{
      setLoading(false)

    }
  };

  return (
    <div className="bg-white w-full h-[80vh] shadow-md flex flex-col gap-3">
      <h1 className="text-center mt-5 p-5 font-bold text-black text-[20px] underline underline-offset-8">
        Add New Banner Video
      </h1>

      <div className="flex justify-between w-[80%]">
        <div className="pl-20 flex flex-col gap-5">
          <input
            value={data.title}
            onChange={handleChange}
            type="text"
            name="title"
            className="rounded-md w-[500px] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Video title"
          />
          <input
            value={data.page}
            onChange={handleChange}
            type="text"
            name="page"
            className="rounded-md w-[500px] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Page name (e.g., home, about)"
          />
          <input
            value={data.description}
            onChange={handleChange}
            type="text"
            name="description"
            className="rounded-md w-[500px] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter description of video"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="border border-dotted border-blue-600 w-[200px] h-[200px] flex items-center justify-center">
            {videoFile ? (
              <video
                src={URL.createObjectURL(videoFile)}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/no-photo.png"
                alt="No video selected"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            onChange={handleVideo}
            id="banner-video"
            type="file"
            accept="video/*"
            className="hidden"
            name="videoFile"
          />
          <label
            htmlFor="banner-video"
            className="cursor-pointer font-bold text-black p-5"
          >
            <BsUpload className="ml-[40px] mb-[10px] text-black cursor-pointer" size={30} />
            Upload Video
          </label>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-5">
        <input
          type="button"
          onClick={() => {
            setData({ title: '', description: '', page: '' });
            setVideoFile(null);
            navigate('/banner-videos');
          }}
          value="Cancel"
          className="bg-red-600 py-3 px-5 rounded-md cursor-pointer text-white"
        />
        <input
          type="submit"
          onClick={handleSubmit}
          value={loading ? 'Uploading' : 'Submit'}
          disabled={loading}
          className={`py-3 px-5 rounded-md text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-800 cursor-pointer'
          }`}
        />
      </div>
    </div>
  );
};

export default AddNewBannerVideos;
