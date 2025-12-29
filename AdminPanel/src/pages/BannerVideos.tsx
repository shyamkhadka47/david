/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCheckLocalColor } from '../hooks/useCheckLocalColor';
import axiosInstance from '../hooks/axiosConfig';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import Modal from '../components/Modal';

const BannerVideos = () => {
  const { color } = useCheckLocalColor();
  const [data, setData] = React.useState<any[]>([]);
  const [id, setId] = React.useState('');
  const [show, setShow] = React.useState(false);

  const columns = [
    { title: 'SN' },
    { title: 'Title' },
    { title: 'Page' }, // ✅ Added page column here
    { title: 'Description' },
    { title: 'Video' },
  ];

  const getAllBannerVideos = async () => {
    try {
      const res = await axiosInstance.get('/getallbannervideos');

      if (res.status === 200) {
        setData(res.data.videos);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Failed to fetch videos');
      }
    }
  };

  React.useEffect(() => {
    getAllBannerVideos();
  }, []);

  const handleDelete = async (videoId: string) => {
    try {
      const res = await axiosInstance.delete(`/deletebannervideo/${videoId}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setShow(false);
        setId('');
        getAllBannerVideos();
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
          <Link to="/add-new-banner-video">
            <button
              className={`${
                color === 'dark' && 'hover:bg-white hover:text-black'
              } bg-green-900 text-white w-[200px] font-bold py-4 hover:bg-transparent hover:border-[2px] hover:border-green-600 hover:text-black absolute right-0 top-5`}
            >
              Add New Banner Video
            </button>
          </Link>

          <div className="mt-[80px] w-[1020px] mx-auto">
            <div className="w-full flex justify-between items-center mb-5 mt-1 pl-3">
              <h3
                className={`text-[25px] font-semibold ${
                  color === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                View All Banner Videos
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
                  {data.map((video, index) => (
                    <tr
                      key={video.id}
                      className="hover:bg-slate-50 border-b border-slate-200"
                    >
                      <td className="p-4 py-5 border border-r">{index + 1}</td>
                      <td className="p-4 py-5 border border-r max-w-[250px]">
                        <p className="font-semibold text-sm text-black ">
                          {video.title}
                        </p>
                      </td>
                      <td className="p-4 py-5 border border-r max-w-[150px]">
                        {' '}
                        {/* ✅ Page cell */}
                        <p className="font-semibold text-sm text-black">
                          {video.page}
                        </p>
                      </td>
                      <td className="p-4 py-5 border border-r max-w-[250px]">
                        <p className="font-semibold text-sm text-black">
                          {video.description}
                        </p>
                      </td>
                      <td className="p-4 py-5 border border-r">
                        <video
                          controls
                          width="120"
                          className="rounded shadow"
                          src={`${import.meta.env.VITE_BACKEND_URI}/${
                            video.videoFile
                          }`}
                        />
                      </td>
                      <td className="p-4 py-5 border border-r text-center">
                        <div className="flex justify-center gap-2">
                          <Link to={`/edit-banner-video/${video.id}`}>
                            <button className="px-4 py-1 text-sm font-medium text-white bg-green-900 rounded">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="px-2 py-1 text-sm font-medium text-white bg-deleteButton rounded"
                            onClick={() => {
                              setShow(true);
                              setId(video.id);
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

export default BannerVideos;
