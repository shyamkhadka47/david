/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import { BsUpload } from 'react-icons/bs';

import toast from 'react-hot-toast';
import axiosInstance from '../hooks/axiosConfig';
import { isAxiosError } from 'axios';
import { downloadImage } from '../hooks/convertImageToFile';
// import useGetSiteSettings from '../ApiHooks/sitesettings/useGetSiteSettings';

const Settings = () => {
  const getsitesetting = async () => {
    const res = await axiosInstance.get(`/sitesettings`);

    if (!res?.data?.data) {
      return setHasData(false);
    }

    if (res.status == 200) {
      setHasData(true);
      setData({
        businessname: res?.data?.data?.businessname,
        phonenumber: res?.data?.data?.phonenumber,
        phonenumber2: res?.data?.data?.phonenumber2,
        address: res?.data?.data?.address,
        mapurl: res?.data?.data?.mapurl,
        email: res?.data?.data?.email,
        fblink: res?.data?.data?.fblink,
        twitterlink: res?.data?.data?.twitterlink,
        linkedlink: res?.data?.data?.linkedlink,
        youtubelink: res?.data?.data?.youtubelink,
        shortdescriptionaboutbusiness:
          res?.data?.data?.shortdescriptionaboutbusiness,
        businesslogo: res?.data?.data?.businesslogo,
      });
    }
  };

  //   const {data:newdata}=useGetSiteSettings()
  // console.log(newdata)
  const [data, setData] = React.useState({
    businessname: '',
    phonenumber: '',
    phonenumber2: '',
    address: '',
    mapurl: '',
    email: '',
    fblink: '',
    twitterlink: '',
    linkedlink: '',
    youtubelink: '',
    shortdescriptionaboutbusiness: '',
    businesslogo: '',
  });
  const [hasData, setHasData] = React.useState(false);
  React.useEffect(() => {
    const getFile = async () => {
      const file = await downloadImage(data?.businesslogo);

      setblogo(file);
    };
    getFile();
    getsitesetting();
  }, [data?.businesslogo]);
  const [blogo, setblogo] = React.useState<File | null>(null);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Max_Size = 1 * 1024 * 1024;
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > Max_Size) {
        return toast.error('File Size Larger Than 1MB');
      }
      setblogo(e.target.files[0]);
    } else {
      toast.error('no file selected');
    }
  };

  const handleChange = (e: any) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blogo) {
      return toast.error('Business Logo Required');
    }
    const formdata = new FormData();
    formdata.append('businessname', data.businessname);
    formdata.append('phonenumber', data.phonenumber);
    formdata.append('phonenumber2', data.phonenumber2);
    formdata.append('address', data.address);
    formdata.append('mapurl', data.mapurl);
    formdata.append('email', data.email);
    formdata.append('fblink', data.fblink);
    formdata.append('twitterlink', data.twitterlink);
    formdata.append('linkedlink', data.linkedlink);
    formdata.append('youtubelink', data.youtubelink);
    formdata.append(
      'shortdescriptionaboutbusiness',
      data.shortdescriptionaboutbusiness,
    );

    formdata.append('image', blogo);
    try {
      const res = await axiosInstance.post(`/addsitesettings`, formdata);
      if (res.status === 200) {
        getsitesetting()
        return toast.success(res.data.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!blogo) {
      return toast.error('Logo Required');
    }
    const formdata = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formdata.append(key, value);
      }
    });
    formdata.append('image', blogo);
    try {
      const res = await axiosInstance.put('/editsitesettings', formdata);

      if (res.status == 200) {
        getsitesetting()
        toast.success('Site Settings Updated SuccessFully');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Business Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Business Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="businessname"
                          value={data.businessname || ''}
                          onChange={handleChange}
                          id="fullName"
                          placeholder="Enter Business Name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 mb-3">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phonenumber"
                        id="phoneNumber"
                        value={data.phonenumber || ''}
                        placeholder="Enter Phone Number"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Secondary Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phonenumber2"
                        id="phoneNumber"
                        value={data.phonenumber2 || ''}
                        placeholder="Enter Phone Number"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Address */}
                      <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Address
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="address"
                          value={data.address || ''}
                          placeholder="Enter Business Address"
                          onChange={handleChange}
                        />
                      </div>

                      {/* Map URL */}
                      <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Google Map URL
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="mapurl"
                          value={data.mapurl || ''}
                          placeholder="Paste Google Map Link"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="email"
                        id="emailAddress"
                        value={data.email || ''}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex flex-col w-full sm:w-1/2">
                        <label
                          className="mb-3  block text-sm font-medium text-black dark:text-white"
                          htmlFor="Username"
                        >
                          Facebook Link
                        </label>
                        <input
                          className="rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fblink"
                          value={data.fblink || ''}
                          id="Username"
                          placeholder="Enter Facebook Link"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col  w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="Username"
                        >
                          Twitter Link
                        </label>
                        <input
                          className=" rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="twitterlink"
                          id="Username"
                          placeholder="Enter Twitter Link"
                          value={data.twitterlink || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex flex-col w-full sm:w-1/2">
                        {' '}
                        <label
                          className="my-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="Username"
                        >
                          LinkedIn Link
                        </label>
                        <input
                          className="rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="linkedlink"
                          id="Username"
                          placeholder="Enter Linkedin Link"
                          value={data.linkedlink || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col w-full sm:w-1/2">
                        {' '}
                        <label
                          className="my-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="Username"
                        >
                          Youtube link
                        </label>
                        <input
                          className="rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="youtubelink"
                          id="Username"
                          placeholder="Enter Youtube Link"
                          value={data.youtubelink || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Short Description About Business
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="shortdescriptionaboutbusiness"
                        value={data.shortdescriptionaboutbusiness || ''}
                        onChange={handleChange}
                        id="bio"
                        rows={6}
                        placeholder="Write Short Description About business"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                    >
                      Cancel
                    </button>
                    {!hasData && (
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Submit
                      </button>
                    )}
                    {hasData && (
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Business Logo
                </h3>
              </div>
              <div className="p-7">
                <div className="flex flex-col items-center justify-center">
                  <div className="border border-dotted border-blue-600 w-[200px] h-[200px] ">
                    {blogo ? (
                      <img
                        src={URL.createObjectURL(blogo) || ''}
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
                    name="image"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
