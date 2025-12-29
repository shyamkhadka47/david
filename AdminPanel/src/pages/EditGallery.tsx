/* eslint-disable @next/next/no-img-element */
import { isAxiosError } from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { BsUpload } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';
import { downloadImage } from '../hooks/convertImageToFile';

const EditGallery = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = React.useState({
    description: '',
    caption: '',
    category: '',
  });

  const [imgsrc, setImgSrc] = React.useState<File | null>(null);
  const [categories, setCategories] = React.useState([]);

  // Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const Max_Size = 1 * 1024 * 1024;
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > Max_Size) {
        return toast.error('File Size Larger Than 1mb');
      }
      setImgSrc(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!imgsrc) {
      return toast.error('Image Required');
    }

    try {
      const formdata = new FormData();
      formdata.append('description', data.description);
      formdata.append('caption', data.caption);
      formdata.append('categoryId', data.category);
      formdata.append('image', imgsrc);

      const res = await axiosInstance.put(`/updategallery/${id}`, formdata);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate('/gallery');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/getallcategories');
      if (res.status === 200) {
        setCategories(res.data.data || []);
      }
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  // Fetch gallery item by ID
  const getsinglegallery = async (id: any) => {
    try {
      const res = await axiosInstance.get(`/getsinglegallery/${id}`);
      if (res.status === 200) {
        const imagefile = await downloadImage(res.data.data.galleryImage);
        setData({
          description: res.data.data.description,
          caption: res.data.data.caption,
          category: res.data.data.category?.id || '',
        });
        setImgSrc(imagefile);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategories();
      getsinglegallery(id);
    }
  }, [id]);

  return (
    <div className="bg-white w-full h-[80vh] shadow-md flex flex-col gap-3">
      <h1 className="text-center mt-5 p-5 font-bold text-black-0 text-[20px] underline underline-offset-8 ">
        Edit Gallery
      </h1>

      <div className="flex justify-between w-[80%]">
        <div className="pl-20 flex flex-col gap-5">
          <input
            value={data.description}
            onChange={handleChange}
            type="text"
            name="description"
            className="rounded-md w-[500px] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Title"
          />

          <input
            value={data.caption}
            onChange={handleChange}
            type="text"
            name="caption"
            className="rounded-md w-[500px] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Caption"
          />

          <select
            name="category"
            value={data.category}
            onChange={handleChange}
            className="rounded-md w-[500px] h-[60px] p-5 text-black bg-white outline-none border border-gray-300"
          >
            <option value="">Select a Category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="border border-dotted border-blue-600 w-[200px] h-[200px]">
            {imgsrc ? (
              <img
                src={URL.createObjectURL(imgsrc)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/no-photo.png"
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            onChange={handleImage}
            id="slider-image"
            type="file"
            className="hidden"
            accept="image/*"
          />
          <label
            htmlFor="slider-image"
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
            setData({ description: '', caption: '', category: '' });
            setImgSrc(null);
            navigate('/gallery');
          }}
          value="Cancel"
          className="bg-red-600 py-3 px-5 rounded-md cursor-pointer text-white"
        />
        <input
          type="submit"
          onClick={handleSubmit}
          value="Update"
          className="bg-green-800 py-3 px-5 rounded-md cursor-pointer text-white"
        />
      </div>
    </div>
  );
};

export default EditGallery;
