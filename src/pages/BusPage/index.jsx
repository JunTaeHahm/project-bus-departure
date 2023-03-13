import React from 'react';
import { useLocation } from 'react-router-dom';

import { useGetBusLocation } from '@hooks/useGetBusLocation';
import { useGetBusTimeTable } from '@hooks/useGetBusTimeTable';

const BusPage = () => {
  const location = useLocation();
  const { busNumber, busId } = location.state;

  const { data: timeTables } = useGetBusTimeTable();
  const { data: busLocation } = useGetBusLocation(busNumber, busId);

  return (
    <div>
      <h2>{busNumber}번 출발 시간표</h2>
      {timeTables?.map((timeTable, i) => (
        <li key={i}>{timeTable.departure}</li>
      ))}
    </div>
  );
};

export default BusPage;
