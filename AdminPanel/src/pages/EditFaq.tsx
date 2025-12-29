import { isAxiosError } from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';

const EditFaq = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = React.useState({
    question: '',
    answer: '',
  });

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get(`/getfaq/${id}`);
        if (res.status == 200) {
          const {
            data: {
              data: { question, answer },
            },
          } = res;
          setData({ question: question, answer: answer });
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/updatefaq/${id}`, data);
      if (res.status == 200) {
        toast.success(res.data.message);
        setData({
          question: '',
          answer: '',
        });
        navigate("/faq")
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
        Update Faq
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
          value={'Updata'}
          className="bg-green-800 py-3 px-5 rounded-md cursor-pointer text-white"
        />
      </div>
    </div>
  );
};

export default EditFaq;
