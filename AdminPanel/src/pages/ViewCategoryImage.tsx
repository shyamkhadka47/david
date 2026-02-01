import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../hooks/axiosConfig';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import React from 'react';
import { useCheckLocalColor } from '../hooks/useCheckLocalColor';

const ViewCategoryImage = () => {
  const { id } = useParams();
  const { color } = useCheckLocalColor();

  const [galleryImages, setGalleryImages] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const limit = 10; // Adjust as needed

  const fetchGalleryByCategory = async (pageNumber = 1) => {
    try {
      const res = await axiosInstance.get(
        `/getcategorygallerybyid/${id}?page=${pageNumber}&limit=${limit}`,
        {},
      );

      if (res.status === 200 && res.data.success) {
        setGalleryImages(res.data.data);
        setTotal(res.data.total || res.data.data.length); // fallback if `total` isn't provided
        setPage(pageNumber);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to fetch gallery');
      }
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      const res = await axiosInstance.delete(`/deletegallery/${imageId}`);
      if (res.status === 200) {
        toast.success('Image deleted successfully');
        fetchGalleryByCategory(page);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to delete image');
      }
    }
  };

  React.useEffect(() => {
    if (id) {
      fetchGalleryByCategory(page);
    }
  }, [id]);

  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => {
    if (page > 1) fetchGalleryByCategory(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) fetchGalleryByCategory(page + 1);
  };

  const columns = ['SN', 'Image', 'Title', 'Description', 'Actions'];

  return (
    <div className="px-4 sm:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Gallery for Category ID: {id}
        </h2>
        <Link to="/category">
          <button className="bg-green-900 text-white font-bold py-2 px-4 rounded ">
            Back to Category List
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-green-900 text-white">
              {columns.map((title, idx) => (
                <th key={idx} className="px-6 py-3 text-left border">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {galleryImages.length > 0 ? (
              galleryImages.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 border">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-6 py-4 border">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URI}/${
                        item.galleryImage
                      }`}
                      alt={item.caption || 'Image'}
                      className="h-20 w-auto rounded"
                    />
                  </td>
                  <td className="px-6 py-4 border">{item.caption}</td>
                  <td className="px-6 py-4 border">{item.description}</td>
                  <td className="px-6 py-4 border">
                    <div className="flex gap-2">
                      <Link to={`/edit-gallery/${item.id}`}>
                        <button className="bg-green-900 hover:bg-green-7900 text-white text-xs px-3 py-1 rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-800 hover:bg-red-900 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-gray-500 px-6 py-4"
                >
                  No gallery images found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm text-black">
            Showing <b>{(page - 1) * limit + 1}</b> -{' '}
            <b>{Math.min(page * limit, total)}</b> of <b>{total}</b>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-3 py-1 text-sm font-normal text-black bg-white border border-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button className="px-3 py-1 text-sm font-bold text-white bg-slate-800 border border-slate-800 rounded">
              {page}
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages || totalPages === 0}
              className="px-3 py-1 text-sm font-normal text-black bg-white border border-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategoryImage;
