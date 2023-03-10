import React from 'react';

import { useGetBusInfo } from '@utils/useGetBusInfo';

const App = () => {
  const { data, isLoading, error, refetch } = useGetBusInfo();

  return (
    <div id='app'>
      <h1>BUSGO</h1>
      <div>{data}</div>
    </div>
  );
};

export default App;
