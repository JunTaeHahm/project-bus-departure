import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetBusInfo = () => {
  const { data, isLoading, error, refetch } = useQuery(
    ['businfo'],
    async () => {
      return await axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/6410000/busrouteservice/getBusRouteList?serviceKey=${process.env.BUS_DATA_API_KEY}&keyword=6004&origin=http://localhost:3000`,
        )
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    {
      staleTime: Infinity,
      // refetchInterval: 60 * 1000,
    },
  );

  return { data, isLoading, error, refetch };
};
