/* eslint-disable @next/next/no-img-element */
import { isAxiosError } from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { BsUpload } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';
import { downloadImage } from '../hooks/convertImageToFile';

const EditSlider = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mainpage, setMainpage] = React.useState('');
  const [servicepage, setServicepage] = React.useState('');
  const [page, setPage] = React.useState('');
  const [data, setData] = React.useState({
    title: '',

    description: '',
  });
  const [serviceslug, setServiceSlugs] = React.useState([]);

  const [imgsrc, setImgSrc] = React.useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };


  const getserviceslugs = async () => {
    try {
      const res = await axiosInstance.get('/getallservices');
      if (res.status == 200) {
        setServiceSlugs(() => res?.data?.data.map((el: any) => el.slug));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error?.response?.data?.message);
      }
    }
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

  const handlemainpageChange = (e: any) => {
    setMainpage(e.target.value);
    setPage(e.target.value);
    setServicepage('');
  };

  const handleServicePageChange = (e: any) => {
    setServicepage(e.target.value);
    setPage(e.target.value);
    setMainpage('');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!imgsrc) {
      return toast.error('Image Required Less Than 1MB');
    }
    try {
      const formdata = new FormData();
      formdata.append('page', page);
      formdata.append('title', data.title);

      formdata.append('description', data.description);
      formdata.append('image', imgsrc);
      const res = await axiosInstance.put(`/updateslider/${id}`, formdata);
      if (res.status == 200) {
        toast.success(res.data.message);
        getsingleslider(id);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  //   Get Data
  const getsingleslider = async (id: any) => {
    try {
      const res = await axiosInstance.get(`/getsingleslider/${id}`);
      if (res.status == 200) {
        const imagefile = await downloadImage(res?.data?.data?.sliderImage);
        setData(() => ({
        
          title: res?.data?.data?.title,
         
          description: res?.data?.data.description,
        }));
        setPage(()=>(res?.data?.data?.page))
        setImgSrc(imagefile);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  React.useEffect(() => {
    getsingleslider(id);
    getserviceslugs()
  }, [id]);

  return (
    <div className="bg-white w-full h-auto shadow-md flex flex-col  gap-3">
      <h1 className="text-center mt-5 p-5 font-bold text-black-0 text-[20px] underline underline-offset-8 ">
        Edit Slider
      </h1>
      <div className="flex justify-between w-[80%]">
        <div className="pl-20 flex flex-col gap-5">
        <div className="flex gap-3">
            <select
              name="page"
              onChange={(e) => handlemainpageChange(e)}
              value={mainpage}
              className="rounded-md w-max  h-[60px] p-5 text-black bg-[#f1f3f9]"
            >
              <option>Choose Main Page</option>
              <option value="home">Home</option>
              <option value="about">About</option>
              <option value="services">Services</option>
              <option value="servicearea">Service-Area</option>
              <option value="gallery">Gallery</option>
              <option value="Contact">Contact</option>
            </select>
            <select
              name="page"
              value={servicepage}
              onChange={(e) => handleServicePageChange(e)}
              className="rounded-md w-max  h-[60px] p-5 text-black bg-[#f1f3f9]"
            >
              <option>Choose Service Page</option>
              {serviceslug.length > 0 &&
                serviceslug?.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
            </select>
          </div>

          <input
            value={page}
            
            type="text"
           placeholder='Current Selected Page'
            className=" rounded-md w-[500px]  h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            disabled
          />
          <input
            value={data.title}
            onChange={(e) => handleChange(e)}
            type="text"
            name="title"
            className=" rounded-md w-[500px]  h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Title"
          />
        
          <textarea
            value={data.description}
            onChange={(e: any) => handleChange(e)}
            rows={6}
            name="description"
            className=" rounded-md w-[500px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Description"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="border border-dotted border-blue-600 w-[200px] h-[200px] ">
            {imgsrc ? (
              <img
                src={URL.createObjectURL(imgsrc)}
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
      <div className="flex items-center justify-center gap-4 my-5">
        <input
          type="submit"
          onClick={() => {
            setData({  title: '',description: '' });
            setImgSrc(null);
            navigate('/slider');
          }}
          value={'Cancel'}
          className="bg-red-600 py-3 px-5 rounded-md cursor-pointer text-white"
        />
        <input
          type="submit"
          onClick={handleSubmit}
          value={'Update'}
          className="bg-green-800 py-3 px-5 rounded-md cursor-pointer text-white"
        />
      </div>
    </div>
  );
};

export default EditSlider;
