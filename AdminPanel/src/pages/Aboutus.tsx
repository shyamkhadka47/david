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
  const [data, setData] = React.useState({
    title: '',
    content: '',
    shortContent: '',
    aboutImages: [],
  });

  const [image1, setImage1] = React.useState<File | null>(null);
  const [image2, setImage2] = React.useState<File | null>(null);
  const [hasData, setHasData] = React.useState(false);

  const getaboutus = async () => {
    try {
      const res = await axiosInstance.get(`/getaboutus`);

      if (res?.data?.data.length < 1) return setHasData(false);

      if (res.status === 200) {
        setHasData(true);
        setData({
          title: res?.data?.data[0]?.title,
          content: res?.data?.data[0]?.content,
          shortContent: res?.data?.data[0]?.shortContent,
          aboutImages: res?.data?.data[0]?.aboutImages || [],
        });

        // download images
        if (res?.data?.data[0]?.aboutImages?.[0]) {
          const file1 = await downloadImage(res.data.data[0].aboutImages[0]);
          setImage1(file1);
        }
        if (res?.data?.data[0]?.aboutImages?.[1]) {
          const file2 = await downloadImage(res.data.data[0].aboutImages[1]);
          setImage2(file2);
        }
      }
    } catch (error) {
      if (isAxiosError(error)) toast.error(error.response?.data.message);
    }
  };

  React.useEffect(() => {
    getaboutus();
  }, []);

  const handleImage1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Max_Size = 1 * 1024 * 1024;
    if (e.target.files && e.target.files[0]) {
      // if (e.target.files[0].size > Max_Size) {
      //   return toast.error('File Size Larger Than 1MB');
      // }
      setImage1(e.target.files[0]);
    } else {
      toast.error('No file selected');
    }
  };

  const handleImage2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Max_Size = 1 * 1024 * 1024;
    if (e.target.files && e.target.files[0]) {
      // if (e.target.files[0].size > Max_Size) {
      //   return toast.error('File Size Larger Than 1MB');
      // }
      setImage2(e.target.files[0]);
    } else {
      toast.error('No file selected');
    }
  };

  const handleChange = (e: any) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image1 || !image2) {
      return toast.error('Please Upload Both Images Less Than 1Mb');
    }

    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('content', data.content);
    formdata.append('shortContent', data.shortContent);
    formdata.append('images', image1);
    formdata.append('images', image2);

    try {
      const res = await axiosInstance.post('/addaboutus', formdata);
      if (res.status === 200) {
        toast.success(res.data.message);
        setHasData(true);
      }
    } catch (error) {
      if (isAxiosError(error)) toast.error(error.response?.data.message);
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!image1 || !image2) {
      return toast.error('Please Upload Both Images Less Than 1MB');
    }

    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('content', data.content);
    formdata.append('shortContent', data.shortContent);
    formdata.append('images', image1);
    formdata.append('images', image2);

    try {
      const res = await axiosInstance.put('/updateaboutus', formdata);
      if (res.status === 200) toast.success('About Us Updated Successfully');
    } catch (error) {
      if (isAxiosError(error)) toast.error(error.response?.data.message);
    }finally{
      setImage1(null)
      setImage2(null)
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
              <form onSubmit={handleSubmit}>
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
                    <label className="mb-3 block text-sm font-bold text-black dark:text-white">
                      Enter Short Content
                    </label>
                    <ReactQuill
                      className="h-[250px]"
                      theme="snow"
                      value={data.shortContent}
                      onChange={(shortContent) =>
                        setData((prev) => ({ ...prev, shortContent }))
                      }
                      modules={modules}
                    />
                  </div>
                  <div className="mt-25">
                    <label className="mb-3 block text-sm font-bold text-black dark:text-white">
                      Enter Full Description
                    </label>
                    <ReactQuill
                      className="h-[400px]"
                      theme="snow"
                      value={data.content}
                      onChange={(content) =>
                        setData((prev) => ({ ...prev, content }))
                      }
                      modules={modules}
                    />
                  </div>
                </div>

                <div className="mt-[100px] flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                    onClick={() => {
                      setImage1(null);
                      setImage2(null);
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
                Featured About Us Images
              </h3>
            </div>
            <div className="p-7 flex flex-col gap-5">
              {/* Image 1 */}
              <div className="flex flex-col items-center justify-center">
                <div className="border border-dotted border-blue-600 w-[200px] h-[200px]">
                  {image1 ? (
                    <img
                      src={URL.createObjectURL(image1)}
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  ) : (
                    <img
                      src="/no-photo.png"
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  )}
                </div>
                <input
                  onChange={handleImage1}
                  id="slider-image-1"
                  type="file"
                  className="hidden"
                  name="images"
                  accept="image/*"
                />
                <label
                  htmlFor="slider-image-1"
                  className="cursor-pointer font-bold text-black p-5"
                >
                  <BsUpload
                    className=" ml-[40px] mb-[10px] text-black cursor-pointer"
                    size={30}
                  />
                  Upload Image 1
                </label>
              </div>

              {/* Image 2 */}
              <div className="flex flex-col items-center justify-center">
                <div className="border border-dotted border-blue-600 w-[200px] h-[200px]">
                  {image2 ? (
                    <img
                      src={URL.createObjectURL(image2)}
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  ) : (
                    <img
                      src="/no-photo.png"
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  )}
                </div>
                <input
                  onChange={handleImage2}
                  id="slider-image-2"
                  type="file"
                  name="images"
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="slider-image-2"
                  className="cursor-pointer font-bold text-black p-5"
                >
                  <BsUpload
                    className=" ml-[40px] mb-[10px] text-black cursor-pointer"
                    size={30}
                  />
                  Upload Image 2
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
