/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { BsUpload } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const AddNewMenuItem = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const [imgsrc, setImgSrc] = React.useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImgSrc(e.target.files[0]);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
    console.log(imgsrc);
  };

  return (
    <div className="bg-white w-full h-[90vh] shadow-md flex flex-col  gap-3">
      <h1 className="text-center mt-5 p-5 font-bold text-black-0 text-[20px] underline underline-offset-8 ">
        Add New Menu Item
      </h1>
      <div className="flex justify-between w-[80%]">
        <div className="pl-20 flex flex-col gap-5">
          <select
            className="h-[40px] rounded-md outline-none bg-slate-100"
            name="category"
            value={data.category}
            onChange={(e) =>
              setData((prev: any) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          >
            <option> Select a Category</option>
            <option value="shyam">shyam</option>
            <option value="lilu">lilu</option>
          </select>
          <input
            value={data.name}
            onChange={(e) => handleChange(e)}
            type="text"
            name="name"
            className=" rounded-md w-[500px]  h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Name of Item"
          />
          <input
            value={data.name}
            onChange={(e) => handleChange(e)}
            type="text"
            name="price"
            className=" rounded-md w-[500px]  h-[60px] p-5 text-black bg-[#f1f3f9] outline-none"
            placeholder="Enter Price of Item"
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
      <div className="flex items-center justify-center gap-4 mt-5">
        <input
          type="submit"
          onClick={() => {
            setData({ name: '', description: '', price: '', category: '' });
            setImgSrc(null);
            navigate('/menu-item');
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

export default AddNewMenuItem;
