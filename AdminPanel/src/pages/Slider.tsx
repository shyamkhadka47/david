/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCheckLocalColor } from '../hooks/useCheckLocalColor';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../hooks/axiosConfig';
import Modal from '../components/Modal';

const Slider = () => {
  const { color } = useCheckLocalColor();
  const [data, setData]: any = React.useState();
  const [id, setId] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const getsliders = async () => {
    try {
      setloading(true);
      const res = await axiosInstance.get('/getallslider');

      if (res.status == 200) {
        setData(res.data.data);
        return setloading(false);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setloading(false);
        return toast.error(error.response?.data.message);
      }
    }
  };
  React.useEffect(() => {
    getsliders();
  }, []);

  const column = [
    { title: 'SN' },
    { title: 'Title' },
    { title: 'Slogan' },
    { title: 'Description' },
    { title: 'Image' },
  ];

  const handleDelete = async (so: any) => {
    try {
      const res = await axiosInstance.delete(`/deleteslider/${so}`);
      if (res.status == 200) {
        setShow(false);
        setId('');
        toast.success(res.data.message);

        getsliders();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      {show && (
        <Modal
          show={show}
          setshow={setShow}
          id={id}
          handleDelete={handleDelete}
        />
      )}
      <div className="mt-[-25px]">
        <div className="flex flex-col gap-5 relative">
          <div className=" bg-transparent text-white w-[200px] font-bold py-4 hover:bg-transparent "></div>
          <Link to="/addnewslider">
            <button
              className={`${
                color == 'dark' && 'hover:bg-white hover:text-black'
              } bg-green-900 text-white w-[200px] font-bold py-4 hover:bg-transparent hover:border-[2px] hover:border-green-600 hover:text-black  absolute right-[0] top-5 `}
            >
              Add New Slider
            </button>
          </Link>
          <div className="mt-[20px]">
            <div className="max-w-[1020px] mx-auto">
              <div className="w-full flex justify-between items-center mb-5 mt-1 pl-3">
                <div>
                  <h3
                    className={`${
                      color == 'dark' && 'text-white'
                    } "text-[25px] font-semibold text-black"`}
                  >
                    View All Sliders
                  </h3>
                </div>
              </div>

              <div className="relative flex flex-col w-full h-full overflow-hidden text-black-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                  <thead className="py-4">
                    <tr>
                      {column?.map((el, i) => (
                        <th
                          className="p-4  border-b border-slate-200 bg-green-900 border-r"
                          key={i}
                        >
                          <p className="text-sm font-normal leading-none text-white">
                            {el.title}
                          </p>
                        </th>
                      ))}
                      <th className="p-4 border-b border-slate-200 bg-green-900 border-r">
                        <p className="text-sm font-normal leading-none text-white text-center">
                          Actions
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data?.map((el: any, ind: number) => (
                        <tr
                          className="hover:bg-slate-50 border-b border-slate-200"
                          key={ind}
                        >
                          <td className="p-4 py-5 border border-r">
                            <p className=" font-semibold text-sm text-black flex items-center justify-center gap-4">
                              {ind + 1}
                            </p>
                          </td>
                          <td className="p-4 py-5 border border-r">
                            <p className=" font-semibold text-sm text-black flex items-center justify-center gap-4">
                              {el.title}
                            </p>
                          </td>
                          <td className="p-4 py-5 border border-r">
                            <p className=" font-semibold text-sm text-black flex items-center justify-center gap-4">
                              {el.slogan}
                            </p>
                          </td>
                          <td className="p-4 py-5 border border-r">
                            <p className=" font-semibold text-sm text-black flex items-center justify-center gap-4">
                              {el.description}
                            </p>
                          </td>
                          <td className="p-4 py-5 border border-r">
                            <div className="w-[50px] h-[50px] font-semibold text-sm text-black flex items-center justify-center gap-4">
                              <img
                                src={`${import.meta.env.VITE_BACKEND_URI}/${
                                  el.sliderimage
                                }`}
                                className="w-[100%] h-[100%] object-cover"
                                alt=""
                              />
                            </div>
                          </td>
                          <td className="">
                            <Link to={`/editslider/${el.id}`}>
                              {' '}
                              <button className="px-4 py-1 text-sm font-medium mr-1 text-white bg-green-900 rounded">
                                Edit
                              </button>
                            </Link>
                            <button
                              className="px-2 py-1 text-sm font-medium text-white bg-deleteButton rounded"
                              onClick={() => {
                                setShow(true);
                                setId(el.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          {/*                            
                            {replybutton && (
                              <button
                                className="px-2 py-1 text-sm font-medium text-white bg-green-900 rounded"
                                // onClick={() => handleDelete(product)}
                              >
                                {replybutton}
                              </button>
                            )} */}
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="mt-4 text-center ">
                  {data?.length < 1 && !loading && 'No Sliders found'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
