import React from 'react';
import { Link } from 'react-router-dom';

import { useCheckLocalColor } from '../hooks/useCheckLocalColor';
import axiosInstance from '../hooks/axiosConfig';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import Modal from '../components/Modal';

const Gallery = () => {
  const { color } = useCheckLocalColor();
  const [data, setData] = React.useState<any>(null);
  const [id, setId] = React.useState('');
  const [show, setShow] = React.useState(false);

  // Pagination state
  const [page, setPage] = React.useState(1);
  const limit = 5; // Fixed limit per page
  const [total, setTotal] = React.useState(0);

  const column = [
    { title: 'SN' },
    { title: 'Title' },
    { title: 'Description' },
    { title: 'Image' },
    { title: 'Category' },
  ];

  const getallgallery = async (pageNumber = 1) => {
    try {
      const res = await axiosInstance.get('/getallgallery', {
        params: { page: pageNumber, limit },
      });

      if (res.status == 200) {
        setData(res.data.data);
        setTotal(res.data.total);
        setPage(pageNumber);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
    }
  };

  React.useEffect(() => {
    getallgallery(page);
  }, []);

  const handleDelete = async (so: any) => {
    try {
      const res = await axiosInstance.delete(`/deletegallery/${so}`);
      if (res.status == 200) {
        setShow(false);
        setId('');
        toast.success(res.data.message);
        getallgallery(page);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  // Pagination handlers
  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => {
    if (page > 1) getallgallery(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) getallgallery(page + 1);
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
      <div>
        <div className="mt-[-25px]">
          <div className="flex flex-col gap-5 relative">
            <div className=" bg-transparent text-white w-[200px] font-bold py-4 hover:bg-transparent "></div>
            <Link to="/add-new-gallery">
              <button
                className={`${
                  color == 'dark' && 'hover:bg-white hover:text-black'
                } bg-green-900 text-white w-[200px] font-bold py-4 hover:bg-transparent hover:border-[2px] hover:border-green-600 hover:text-black  absolute right-[0] top-5 `}
              >
                Add new Gallery Image
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
                      View All Gallery
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
                      {data?.map((el: any, ind: number) => (
                        <tr
                          className="hover:bg-slate-50 border-b border-slate-200"
                          key={el.id}
                        >
                          <td className="p-4 py-5 border border-r">
                            {(page - 1) * limit + ind + 1}
                          </td>

                          <td className="p-4 py-5 border border-r max-w-[450px]">
                            <p className="block font-semibold text-sm text-black">
                              {el.caption.slice(0, 30)}...
                            </p>
                          </td>
                          <td className="p-4 py-5 border border-r max-w-[450px]">
                            <p className="block font-semibold text-sm text-black">
                              {el.description.slice(0, 30)}...
                            </p>
                          </td>
                          <td className="p-4 py-5 border border-r max-w-[450px]">
                            <div className="w-[50px] h-[50px] font-semibold text-sm text-black flex items-center justify-center gap-4">
                              <img
                                src={`${import.meta.env.VITE_BACKEND_URI}/${
                                  el.galleryImage
                                }`}
                                className="w-[100%] h-[100%] object-cover"
                                alt=""
                              />
                            </div>
                          </td>
                          <td className="p-4 py-5 border border-r max-w-[450px]">
                            <p className="block font-semibold text-sm text-black">
                              {el.Category.name}
                            </p>
                          </td>

                          <td className="p-4 py-5 border border-r">
                            <p className=" font-semibold text-sm text-black flex items-center justify-center gap-4">
                              <Link to={`/edit-gallery/${el.id}`}>
                                <button className="px-4 py-1 text-sm font-medium text-white bg-green-900 rounded">
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
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-between items-center px-4 py-3">
                    <div className="text-sm text-black">
                      Showing <b>{(page - 1) * limit + 1}</b> -{' '}
                      <b>{Math.min(page * limit, total)}</b> of <b>{total}</b>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-black bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Prev
                      </button>
                      <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                        {page}
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={page === totalPages || totalPages === 0}
                        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-black bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
