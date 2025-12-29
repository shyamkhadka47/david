/* eslint-disable @next/next/no-img-element */
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsUpload } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';
// import dynamic from 'next/dynamic';

// Load Quill dynamically to avoid SSR issues (if using Next.js)
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const AddNewStory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const handleQuillChange = (value: string) => {
    setData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!featuredImage) {
      toast.error('Please upload a featured image');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', featuredImage);

    try {
      const res = await axiosInstance.post('/addnewstory', formData);
      if (res.status === 201 || res.status === 200) {
        toast.success(res.data.message);
        setData({ title: '', content: '' });
        setFeaturedImage(null);
        navigate('/story-tellers');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Upload failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3,4,5,6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
   
    
  };
  

  return (
    <div className="bg-white w-full h-screen shadow-md flex flex-col gap-3 ">
      <h1 className="text-center mt-5 p-5 font-bold text-black text-[20px] underline underline-offset-8">
        Add New Storyteller
      </h1>

      <form onSubmit={handleSubmit} className="flex justify-between w-[80%] mx-auto gap-10">
        <div className="flex flex-col gap-5 w-full max-w-[600px]">
          <input
            value={data.title}
            onChange={handleChange}
            type="text"
            name="title"
            className="rounded-md h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Story Title"
          />
          <ReactQuill
            value={data.content}
            onChange={handleQuillChange}
            theme="snow"
            className="bg-white h-[300px]"
            placeholder="Write your story..."
            modules={modules}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="border border-dotted border-blue-600 w-[200px] h-[200px] flex items-center justify-center overflow-hidden">
            {featuredImage ? (
              <img
                src={URL.createObjectURL(featuredImage)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/no-photo.png"
                alt="No image selected"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            onChange={handleImage}
            id="story-image"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <label htmlFor="story-image" className="cursor-pointer font-bold text-black p-5">
            <BsUpload className="w-full mx-auto mb-[10px] text-black cursor-pointer" size={30} />
            Upload Featured Image
          </label>
        </div>
      </form>

      <div className="flex items-center justify-center gap-4 mt-16">
        <input
          type="button"
          onClick={() => {
            setData({ title: '', content: '' });
            setFeaturedImage(null);
            navigate('/story-tellers');
          }}
          value="Cancel"
          className="bg-red-600 py-3 px-5 rounded-md cursor-pointer text-white"
        />
        <input
          type="submit"
          onClick={handleSubmit}
          value={loading ? 'Uploading...' : 'Submit'}
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

export default AddNewStory;
