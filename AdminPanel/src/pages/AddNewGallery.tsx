/* eslint-disable @next/next/no-img-element */
import { isAxiosError } from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { BsUpload } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';

const AddNewGallery = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    description: '',
    caption: '',
    category: '',
  });

  const [imgsrc, setImgSrc] = React.useState<File | null>(null);
  const [categories, setCategories] = React.useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/getallcategories');
        setCategories(res.data.data || []);
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size <= 1 * 1024 * 1024) {
        setImgSrc(e.target.files[0]);
      } else {
        return toast.error('Please upload Image less Than 1 MB');
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!imgsrc) {
      return toast.error('Please upload an image less than 1 MB');
    }

    const formdata = new FormData();
    formdata.append('description', data.description);
    formdata.append('caption', data.caption);
    formdata.append('categoryId', data.category);
    formdata.append('image', imgsrc);

    try {
      const res = await axiosInstance.post('/addgallery', formdata);
      if (res.status === 200) {
        toast.success(res.data.message);
        setData({ caption: '', description: '', category: '' });
        setImgSrc(null);
        navigate('/gallery');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div className="bg-white w-full h-[80vh] shadow-md flex flex-col gap-3">
      <h1 className="text-center mt-5 p-5 font-bold text-black-0 text-[20px] underline underline-offset-8 ">
        Add New Gallery Image
      </h1>

      <div className="flex justify-between w-[80%]">
        <div className="pl-20 flex flex-col gap-5">
          <input
            value={data.caption}
            onChange={handleChange}
            type="text"
            name="caption"
            className="rounded-md w-[500px] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Image Title"
          />
          <input
            value={data.description}
            onChange={handleChange}
            type="text"
            name="description"
            className="rounded-md w-[500px] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Descriptive Name of image"
          />

          <select
            name="category"
            value={data.category}
            onChange={handleChange}
            className="rounded-md w-[500px] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
          >
            <option>Select a Category</option>
            {categories.map((cat: { id: string; name: string }) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="border border-dotted border-blue-600 w-[200px] h-[200px] ">
            {imgsrc ? (
              <img
                src={URL.createObjectURL(imgsrc)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/no-photo.png"
                className="w-full h-full object-cover"
                alt=""
              />
            )}
          </div>
          <input
            onChange={handleImage}
            id="gallery-image"
            type="file"
            className="hidden"
          />
          <label
            htmlFor="gallery-image"
            className="cursor-pointer font-bold text-black p-5"
          >
            <BsUpload
              className="ml-[40px] mb-[10px] text-black cursor-pointer"
              size={30}
            />
            Upload Image
          </label>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-5">
        <input
          type="button"
          onClick={() => {
            setData({ caption: '', description: '', category: '' });
            setImgSrc(null);
            navigate('/gallery');
          }}
          value="Cancel"
          className="bg-red-600 py-3 px-5 rounded-md cursor-pointer text-white"
        />
        <input
          type="submit"
          onClick={handleSubmit}
          value="Submit"
          className="bg-green-800 py-3 px-5 rounded-md cursor-pointer text-white"
        />
      </div>
    </div>
  );
};

export default AddNewGallery;
