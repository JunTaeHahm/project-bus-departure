import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import useInput from '@hooks/useInput';

const Home = () => {
  const [busNumber, onChangeBusNumber] = useInput('');
  const navigate = useNavigate();

  const handleNavigateBusPage = useCallback(
    async (e) => {
      e.preventDefault();

      // form에서 받은 busNumber로 busId 받아오기
      let busId;
      await axios
        .get(`/api/info/${busNumber}`)
        .then((res) => {
          console.log(res.data);
          busId = res.data.response.msgBody[0].busRouteList[0].routeId[0];

          // 해당 노선페이지로 이동하면서 busNumber와 busId 전달하기
          navigate(`/${busNumber}`, { state: { busNumber, busId } });
        })
        .catch((error) => console.log(error));
    },
    [busNumber, navigate],
  );

  return (
    <div>
      <h1>BUSGO</h1>
      <form onSubmit={handleNavigateBusPage}>
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
        <button type='submit'>이동</button>
      </form>
    </div>
  );
};

export default Home;
