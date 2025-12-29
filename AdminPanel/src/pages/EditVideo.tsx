import { isAxiosError } from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';

const EditVideo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = React.useState({
    title: '',
    description: '',
    videolink: '',
  });

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get(`/singlevideo/${id}`);
        if (res.status === 200) {
          const {
            data: {
              data: { title, description, videolink },
            },
          } = res;
          setData({ title, description, videolink });
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    })();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/updatevideo/${id}`, data);
      if (res.status === 200) {
        toast.success(res.data.message);
        setData({
          title: '',
          description: '',
          videolink: '',
        });
        navigate('/videos');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div className="bg-white w-full h-[80vh] shadow-md flex flex-col gap-3">
      <h1 className="text-center mt-5 p-5 font-bold text-black text-[20px] underline underline-offset-8">
        Update Video
      </h1>
      <div className="flex justify-between w-[80%]">
        <div className="pl-20 flex flex-col gap-5">
          <input
            value={data.title}
            onChange={handleChange}
            type="text"
            name="title"
            className="rounded-md w-[60vw] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Title"
          />

          <textarea
            value={data.description}
            onChange={handleChange}
            name="description"
            rows={6}
            className="rounded-md w-[60vw] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Description"
          />

          <input
            value={data.videolink}
            onChange={handleChange}
            type="text"
            name="videolink"
            className="rounded-md w-[60vw] h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Video Link"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-5">
        <input
          type="button"
          onClick={() => {
            setData({ title: '', description: '', videolink: '' });
            navigate('/videos');
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

export default EditVideo;
