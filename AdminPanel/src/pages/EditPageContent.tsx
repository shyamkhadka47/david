/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import toast from 'react-hot-toast';
import axiosInstance from '../hooks/axiosConfig';
import { isAxiosError } from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditPageContent = () => {
  const [mainpage, setMainpage] = React.useState('');

  const [page, setPage] = React.useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    content: '',
  });

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    }),
    [],
  );

  // Fetch content by ID
  const getContentById = async () => {
    try {
      const res = await axiosInstance.get(`/getpagecontentbyid/${id}`);
      if (res.status === 200) {
        setData({
         
          content: res.data.data.content,
        });
        setPage(res?.data?.data?.page)
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    if (id) getContentById();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };


  const handlemainpageChange = (e: any) => {
    setMainpage(e.target.value);
    setPage(e.target.value);

  };

  // Handle update PUT request
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!page || !data.content) {
      return toast.error('Please fill all fields');
    }

    try {
      const res = await axiosInstance.put(`/editcontent/${id}`, {content:data.content, page});
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate('/contents');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
    finally{
      setData({  content: '' });
      setPage("")
      setMainpage("")
 
    }
  };

  return (
    <div className="w-full px-4 py-2">
      <Breadcrumb pageName="Edit Content" />

      <form onSubmit={handleUpdate}>
        <div className="rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
          {/* Header */}
          <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Edit Content
            </h3>
          </div>

          {/* Flex Layout */}
          <div className="p-6 flex flex-col gap-8">
            {/* Page Name */}
            <div className="flex gap-3">
              <select
                name="page"
                onChange={(e) => handlemainpageChange(e)}
                value={mainpage}
                className="rounded-md w-max  h-[60px] p-5 text-black bg-[#f1f3f9]"
              >
                <option>Choose Main Page</option>
                <option value="home">Home</option>
                {/* <option value="about">About</option> */}
                <option value="services">Services</option>
                <option value="servicearea">Service-Area</option>
                {/* <option value="gallery">Gallery</option> */}
                {/* <option value="Contact">Contact</option> */}
              </select>
            </div>
            <div>
              <label
                htmlFor="page"
                className="mb-2 block text-sm font-medium text-black dark:text-white"
              >
               Current Selected Page Name
              </label>
              <input
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-3 px-4 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                type="text"
                name="page"
                id="page"
                value={page}
                onChange={handleChange}
                placeholder="Current Page Name"
              />
            </div>

            {/* Content */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Content
              </label>
              <div className="rounded-md bg-white dark:border-strokedark dark:bg-meta-4">
                <ReactQuill
                  className="h-[380px]"
                  modules={modules}
                  theme="snow"
                  value={data.content}
                  onChange={(content) =>
                    setData((prev) => ({ ...prev, content }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6 pt-4 mt-10 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/user-questions')}
              className="rounded border border-gray-300 bg-white py-2 px-6 text-black hover:shadow-md dark:border-strokedark dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPageContent;
