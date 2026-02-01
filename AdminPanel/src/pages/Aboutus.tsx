/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import { BsUpload } from 'react-icons/bs';

import toast from 'react-hot-toast';
import axiosInstance from '../hooks/axiosConfig';
import { isAxiosError } from 'axios';
import { downloadImage } from '../hooks/convertImageToFile';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Aboutus = () => {
  const getaboutus = async () => {
    try {
      const res = await axiosInstance.get(`/getaboutus`);

      if (res?.data?.data.length < 1) {
        return setHasData(false);
      }

      if (res.status == 200) {
        setHasData(true);
        setData({
          title: res?.data?.data[0]?.title,
          content: res?.data?.data[0]?.content,
          aboutImage: res?.data?.data[0]?.aboutImage,
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const [data, setData] = React.useState({
    title: '',
    content: '',
    aboutImage: '',
  });
  const [blogo, setblogo] = React.useState<File | null>(null);

  const [hasData, setHasData] = React.useState(false);
  React.useEffect(() => {
    const getFile = async () => {
      const file = await downloadImage(data?.aboutImage);

      setblogo(file);
    };
    getFile();
    getaboutus();
  }, [data?.aboutImage]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Max_Size = 1 * 1024 * 1024;
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > Max_Size) {
        return toast.error('File Size Larger Than 1MB');
      }
      setblogo(e.target.files[0]);
    } else {
      toast.error('no file selected');
    }
  };

  const handleChange = (e: any) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogo) {
      return toast.error('Please Upload Featured Image Less Than 1Mb');
    }
    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('content', data.content);
    formdata.append('image', blogo);
    try {
      const res = await axiosInstance.post('/addaboutus', formdata);
      if (res.status == 200) {
        return toast.success(res.data.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!blogo) {
      return toast.error('Please Upload Image Less Than 1MB');
    }
    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('content', data.content);
    formdata.append('image', blogo);
    try {
      const res = await axiosInstance.put('/updateaboutus', formdata);

      if (res.status == 200) {
        toast.success('About Us Updated SuccessFully');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
    getaboutus();
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
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
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="About Us" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  About Us
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="title"
                    >
                      Enter Title
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="title"
                        id="title"
                        value={data.title || ''}
                        onChange={handleChange}
                        placeholder="Enter Title"
                      />
                    </div>
                    <div className="my-5">
                      <ReactQuill
                        className="h-[400px]"
                        theme="snow"
                        value={data.content}
                        onChange={(content) =>
                          setData((prev) => ({ ...prev, content }))
                        }
                        modules={modules}
                      />
                      ;
                    </div>
                  </div>

                  <div className="mt-[50px] flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={() => {
                        setblogo(null);
                      }}
                    >
                      Cancel
                    </button>
                    {!hasData && (
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Submit
                      </button>
                    )}
                    {hasData && (
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Featured About Us Image
                </h3>
              </div>
              <div className="p-7">
                <div className="flex flex-col items-center justify-center">
                  <div className="border border-dotted border-blue-600 w-[200px] h-[200px] ">
                    {blogo ? (
                      <img
                        src={URL.createObjectURL(blogo) || ''}
                        alt=""
                        className="w-[100%] h-[100%] object-cover"
                      />
                    ) : (
                      <img
                        src="/no-photo.png"
                        className="w-[100%] h-[100%] object-cover"
                        alt=""
                      />
                    )}
                  </div>
                  <input
                    onChange={(e) => handleImage(e)}
                    id="slider-image"
                    name="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                  <label
                    htmlFor="slider-image"
                    className="cursor-pointer font-bold text-black p-5"
                  >
                    <BsUpload
                      className=" ml-[40px] mb-[10px] text-black cursor-pointer"
                      size={30}
                    />
                    Upload Image
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
