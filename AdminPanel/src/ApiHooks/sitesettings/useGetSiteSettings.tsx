import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../hooks/axiosConfig';

const useGetSiteSettings = () => {
  return useQuery({
    queryKey: ['getsitesetting'],
    queryFn: async () => {
      const res = await axiosInstance.get('/sitesettings');
      return res;
    },
  });
};

export default useGetSiteSettings
