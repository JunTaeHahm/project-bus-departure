import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/* 버스 시간표 가져오기 */
export const useGetBusTimeTable = (busNumber) => {
  const { data, isLoading, error, refetch } = useQuery(
    ['timeTable'],
    async () => {
      return await axios
        .get('/api/timetable', { params: { busNumber } })
        .then((res) => {
          return res.data?.table || null;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    {
      staleTime: Infinity,
      refetchInterval: 5 * 60 * 1000,
    },
  );

  return { data, isLoading, error, refetch };
};
