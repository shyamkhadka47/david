import { isAxiosError } from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';

const AddNewFaq = () => {
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    question: '',

    answer: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/addfaq', data);
      if (res.status == 200) {
        setData({question:"", answer:""})
        toast.success(res.data.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div className="bg-white w-full h-[80vh] shadow-md flex flex-col  gap-3">
      <h1 className="text-center mt-5 p-5 font-bold text-black-0 text-[20px] underline underline-offset-8 ">
        Add New Faq
      </h1>
      <div className="flex justify-between w-[80%]">
        <div className="pl-20 flex flex-col gap-5">
          <input
            value={data.question}
            onChange={(e) => handleChange(e)}
            type="text"
            name="question"
            className=" rounded-md w-[60vw]  h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Question"
          />

          <textarea
            value={data.answer}
            onChange={(e: any) => handleChange(e)}
            rows={6}
            name="answer"
            className=" rounded-md w-[60vw] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Answer"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-5">
        <input
          type="submit"
          onClick={() => {
            setData({ question: '', answer: '' });

            navigate('/faq');
          }}
          value={'Cancel'}
          className="bg-red-600 py-3 px-5 rounded-md cursor-pointer text-white"
        />
        <input
          type="submit"
          onClick={handleSubmit}
          value={'Submit'}
          className="bg-green-800 py-3 px-5 rounded-md cursor-pointer text-white"
        />
      </div>
    </div>
  );
};

export default AddNewFaq;
