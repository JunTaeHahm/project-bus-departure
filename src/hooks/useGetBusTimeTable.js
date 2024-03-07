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
          const filteredData = res.data?.filter((v) => v.busNumber === busNumber);

          return filteredData[0]?.table || null;
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

/* 시간표가 등록 된 버스 리스트 가져오기 */
export const useGetAllBusTimeTable = () => {
  const { data, isLoading, error, refetch } = useQuery(
    ['timeTable'],
    async () => {
      return await axios
        .get('/api/timetable')
        .then((res) => {
          return res.data || null;
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
