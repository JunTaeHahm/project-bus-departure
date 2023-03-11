import React, { useCallback, useState } from 'react';

import axios from 'axios';

import useInput from './hooks/useInput';

const App = () => {
  const [busType, setBusType] = useState([]);
  const [busLocationList, setBusLocationList] = useState([]);
  const [busNumber, onChangeBusNumber] = useInput('');

  const handleGetBusInfo = useCallback(
    async (e) => {
      e.preventDefault();

      let busId;
      await axios.get(`/api/info/${busNumber}`).then((res) => {
        console.log(res.data);
        setBusType(res.data.response.msgBody[0].busRouteList[0].routeTypeName[0]);
        busId = res.data.response.msgBody[0].busRouteList[0].routeId[0];
      });

      await axios.get(`/api/location/${busId}`).then((res) => {
        console.log(res.data);
        setBusLocationList(res.data.response.msgBody[0].busLocationList);
      });
    },
    [busNumber],
  );

  return (
    <div id='app'>
      <h1>BUSGO</h1>
      <form onSubmit={handleGetBusInfo}>
        <label htmlFor='busNumber'>
          노선번호 :
          <input
            autoFocus
            autoComplete='off'
            type='text'
            id='busNumber-label'
            placeholder='노선번호를 입력하세요.'
            value={busNumber}
            onChange={onChangeBusNumber}
          />
        </label>
        <button type='submit'>입력</button>
      </form>
      <div>버스타입 : {busType}</div>
      <div>{busLocationList.length}대 운행 중</div>
    </div>
  );
};

export default App;
