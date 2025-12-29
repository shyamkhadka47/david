/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { BsUpload } from 'react-icons/bs';
import toast from 'react-hot-toast';
import axiosInstance from '../hooks/axiosConfig';
import { isAxiosError } from 'axios';
import { downloadImage } from '../hooks/convertImageToFile';

const Settings = () => {
  const [data, setData] = React.useState({
    businessname: '',
    phonenumber: '',
    email: '',
    fblink: '',
    twitterlink: '',
    linkedlink: '',
    youtubelink: '',
    shortdescriptionaboutbusiness: '',
    businesslogo: '',
  });
  const [hasData, setHasData] = React.useState(false);
  const [blogo, setblogo] = React.useState<File | null>(null);

  React.useEffect(() => {
    const getsitesetting = async () => {
      try {
        const res = await axiosInstance.get('/sitesettings');
        if (res?.data?.data?.length < 1) {
          setHasData(false);
          return;
        }
  
        if (res.status === 200) {
          const siteData = res.data.data;
          setHasData(true);
          setData({
            businessname: siteData.businessname || '',
            phonenumber: siteData.phonenumber || '',
            email: siteData.email || '',
            fblink: siteData.fblink || '',
            twitterlink: siteData.twitterlink || '',
            linkedlink: siteData.linkedlink || '',
            youtubelink: siteData.youtubelink || '',
            shortdescriptionaboutbusiness: siteData.shortdescriptionaboutbusiness || '',
            businesslogo: siteData.businesslogo || '',
          });
        }
      } catch {
        toast.error('Failed to load site settings.');
      }
    };
    getsitesetting();
  }, []);

  React.useEffect(() => {
    if (data.businesslogo) {
      const getFile = async () => {
        try {
          const file = await downloadImage(data.businesslogo);
          setblogo(file);
        } catch {
          setblogo(null);
        }
      };
      getFile();
    }
  }, [data.businesslogo]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Max_Size = 1 * 1024 * 1024; // 1MB
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > Max_Size) {
        return toast.error('File Size Larger Than 1MB');
      }
      setblogo(e.target.files[0]);
    } else {
      toast.error('No file selected');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    formdata.append('email', data.email);
    formdata.append('fblink', data.fblink);
    formdata.append('twitterlink', data.twitterlink);
    formdata.append('linkedlink', data.linkedlink);
    formdata.append('youtubelink', data.youtubelink);
    formdata.append('shortdescriptionaboutbusiness', data.shortdescriptionaboutbusiness);
    formdata.append('image', blogo);

    try {
      const res = await axiosInstance.post('/addsitesettings', formdata);
      if (res.status === 200) {
        toast.success(res.data.message);
        setHasData(true);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
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
      if (res.status === 200) {
        toast.success('Site Settings Updated Successfully');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <Breadcrumb pageName="Settings" />
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Business Information
          </h2>
          <form onSubmit={hasData ? handleUpdate : handleSubmit} className="space-y-8">
            {/* Business Name and Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="businessname"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  Business Name
                </label>
                <input
                  id="businessname"
                  name="businessname"
                  value={data.businessname}
                  onChange={handleChange}
                  placeholder="Enter Business Name"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phonenumber"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  Phone Number
                </label>
                <input
                  id="phonenumber"
                  name="phonenumber"
                  value={data.phonenumber}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fblink"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  Facebook Link
                </label>
                <input
                  id="fblink"
                  name="fblink"
                  value={data.fblink}
                  onChange={handleChange}
                  placeholder="Enter Facebook Link"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="twitterlink"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  Twitter Link
                </label>
                <input
                  id="twitterlink"
                  name="twitterlink"
                  value={data.twitterlink}
                  onChange={handleChange}
                  placeholder="Enter Twitter Link"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="linkedlink"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  LinkedIn Link
                </label>
                <input
                  id="linkedlink"
                  name="linkedlink"
                  value={data.linkedlink}
                  onChange={handleChange}
                  placeholder="Enter LinkedIn Link"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="youtubelink"
                  className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  YouTube Link
                </label>
                <input
                  id="youtubelink"
                  name="youtubelink"
                  value={data.youtubelink}
                  onChange={handleChange}
                  placeholder="Enter YouTube Link"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label
                htmlFor="shortdescriptionaboutbusiness"
                className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
              >
                Short Description About Business
              </label>
              <textarea
                id="shortdescriptionaboutbusiness"
                name="shortdescriptionaboutbusiness"
                rows={5}
                value={data.shortdescriptionaboutbusiness}
                onChange={handleChange}
                placeholder="Write a brief description about your business"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            {/* Business Logo Upload */}
            <div>
              <label
                htmlFor="businesslogo"
                className="block mb-3 font-medium text-gray-700 dark:text-gray-200"
              >
                Business Logo
              </label>

              <div className="flex flex-col items-center gap-6">
                {blogo ? (
                  <img
                    src={typeof blogo === 'string' ? blogo : URL.createObjectURL(blogo)}
                    alt="business-logo"
                    className="h-[300px] w-full rounded-md object-contain border border-gray-300 dark:border-gray-600"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                    No Logo Selected
                  </div>
                )}

                <label
                  htmlFor="upload-business-logo"
                  className="cursor-pointer rounded-md border border-primary bg-primary text-white px-4 py-2 hover:bg-primary-dark transition"
                >
                  <BsUpload size={20} className="inline mr-2" />
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    id="upload-business-logo"
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-primary px-8 py-3 font-semibold text-white hover:bg-primary-dark transition"
              >
                {hasData ? 'Update Settings' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
