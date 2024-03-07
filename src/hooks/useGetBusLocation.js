import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';

/* 버스 실시간 위치 */
export const useGetBusLocation = (busNumber, busId) => {
  const [refetchIntervalTime, setRefetchIntervalTime] = useState(30 * 1000);

  // 실시간으로 운행 중인 모든 버스 정보 가져오기
  const { data, isLoading, error, refetch } = useQuery(
    ['busLocation'],
    async () => {
      return await axios.get(`/api/location/${busId}`).then((res) => {
        // 현재 시간 dayjs 라이브러리 사용
        const now = dayjs();

        if (res.data.response.msgBody) {
          res.data.response.msgBody[0].busLocationList.forEach((location) => {
            // 운행 중인 모든 버스 중에 현재 정류장이 기점인 경우
            if (parseInt(location.stationSeq[0]) <= 1) {
              console.log(now.format('동탄국제고등학교 : HH시 mm분'));

              // 서버로 시간표에 시간 추가 POST 요청
              axios
                .post(`/api/timetable/departure`, { busId, busNumber })
                .then((res) => {
                  console.log(res.data);
                  // refetch 시간 10분으로 설정
                  setRefetchIntervalTime(10 * 60 * 1000);
                  // 10분 후에 다시 30초로 설정
                  setTimeout(() => {
                    setRefetchIntervalTime(30 * 1000);
                  }, 10 * 60 * 1000);
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              console.log(now.format('HH:mm:ss 기점 버스 없음'));
            }
          });
        } else {
          console.log('운행 중인 버스가 없습니다.');
        }

        // useQuery의 data값으로 리턴
        return res.data;
      });
    },
    {
      cacheTime: Infinity,
      retry: 3,
      retryDelay: 10000,
      refetchInterval: refetchIntervalTime, // state로 시간 관리
      refetchIntervalInBackground: true,
    },
  );

  return { data, isLoading, error, refetch };
};
