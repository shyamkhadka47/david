/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCheckLocalColor } from '../hooks/useCheckLocalColor';
import axiosInstance from '../hooks/axiosConfig';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import Modal from '../components/Modal';

const Storyteller = () => {
  const { color } = useCheckLocalColor();
  const [data, setData] = React.useState<any[]>([]);
  const [id, setId] = React.useState('');
  const [show, setShow] = React.useState(false);

  const columns = [
    { title: 'SN' },
    { title: 'Title' },
    { title: 'Content' },
    { title: 'Image' },
  ];

  const getAllStorytellers = async () => {
    try {
      const res = await axiosInstance.get('/getallstories');
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message || 'Failed to fetch storytellers',
        );
      }
    }
  };

  React.useEffect(() => {
    getAllStorytellers();
  }, []);

  const handleDelete = async (storyId: string) => {
    try {
      const res = await axiosInstance.delete(`/deletestory/${storyId}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setShow(false);
        setId('');
        getAllStorytellers();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Deletion failed');
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
          <Link to="/add-new-story">
            <button
              className={`${
                color === 'dark' && 'hover:bg-white hover:text-black'
              } bg-green-900 text-white w-[200px] font-bold py-4 hover:bg-transparent hover:border-[2px] hover:border-green-600 hover:text-black absolute right-0 top-5`}
            >
              Add New Story
            </button>
          </Link>

          <div className="mt-[80px] w-[1020px] mx-auto">
            <div className="w-full flex justify-between items-center mb-5 mt-1 pl-3">
              <h3
                className={`text-[25px] font-semibold ${
                  color === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                View All Storytellers
              </h3>
            </div>

            <div className="relative flex flex-col w-full h-full overflow-hidden bg-white shadow-md rounded-lg">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    {columns.map((col, i) => (
                      <th
                        key={i}
                        className="p-4 border-b border-slate-200 bg-green-900 border-r"
                      >
                        <p className="text-sm font-normal leading-none text-white">
                          {col.title}
                        </p>
                      </th>
                    ))}
                    <th className="p-4 border-b border-slate-200 bg-green-900 border-r text-center">
                      <p className="text-sm font-normal text-white">Actions</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((story, index) => (
                    <tr
                      key={story.id}
                      className="hover:bg-slate-50 border-b border-slate-200"
                    >
                      <td className="p-4 py-5 border border-r">{index + 1}</td>
                      <td className="p-4 py-5 border border-r max-w-[300px]">
                        <p className="font-semibold text-sm text-black">
                          {story.title}
                        </p>
                      </td>
                      <td className="p-4 py-5 border border-r max-w-[300px]">
                        <p className="text-sm text-black truncate">
                          {story.content}
                        </p>
                      </td>
                      <td className="p-4 py-5 border border-r">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URI}/${
                            story.featuredImage
                          }`}
                          alt="Story"
                          className="w-[100px] h-[100px] object-cover rounded shadow"
                        />
                      </td>
                      <td className="p-4 py-5 border border-r text-center">
                        <div className="flex justify-center gap-2">
                          <Link to={`/edit-story/${story.slug}`}>
                            <button className="px-4 py-1 text-sm font-medium text-white bg-green-900 rounded">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="px-2 py-1 text-sm font-medium text-white bg-deleteButton rounded"
                            onClick={() => {
                              setShow(true);
                              setId(story.slug);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Optional pagination UI (static) */}
              <div className="flex justify-between items-center px-4 py-3">
                <div className="text-sm text-black">
                  Showing <b>1–{data?.length}</b> of {data?.length}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-white border border-slate-200 rounded hover:bg-slate-50">
                    Prev
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600">
                    1
                  </button>
                  <button className="px-3 py-1 text-sm bg-white border border-slate-200 rounded hover:bg-slate-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Storyteller;
