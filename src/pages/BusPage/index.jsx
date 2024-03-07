import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetBusTimeTable } from '@hooks/useGetBusTimeTable';

import { Container, Heading, TableBody, TableHead, TimeTable } from './styles';

const BusPage = () => {
  const params = useParams();
  const busNumber = parseInt(params.bus);

  const { data: departures, refetch } = useGetBusTimeTable(busNumber);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const result = departures?.reduce(
    (acc, dep) => {
      const dayOfWeek = dep.departure.slice(0, 3);

      switch (dayOfWeek) {
        case 'Sun':
          acc.sundays.push(dep.departure);
          break;
        case 'Sat':
          acc.saturdays.push(dep.departure);
          break;
        default:
          acc.weekdays.push(dep.departure);
          break;
      }
      return acc;
    },
    { weekdays: [], saturdays: [], sundays: [] },
  );

  const getRows = (arr) => {
    // 배열을 받아서 행(row)으로 변환하는 함수
    const rows = []; // 행(row)을 저장할 빈 배열 생성
    const rowCount = Math.ceil(arr?.length / 10); // 배열의 길이를 10으로 나눈 후, 올림하여 행(row)의 개수 계산
    for (let i = 0; i < rowCount; i++) {
      // 행(row)의 개수만큼 반복
      const startIndex = i * 10; // 현재 행(row)의 시작 인덱스 계산
      const endIndex = Math.min(startIndex + 10, arr?.length); // 현재 행(row)의 끝 인덱스 계산
      rows.push(arr?.slice(startIndex, endIndex)); // 현재 행(row)을 배열에서 추출하여 rows 배열에 추가
    }
    return rows; // 변환된 행(row) 배열 반환
  };

  const weekdaysRows = getRows(result?.weekdays.filter((v) => v.includes('Tue')));
  const saturdaysRows = getRows(result?.saturdays);
  const sundaysRows = getRows(result?.sundays);

  return (
    <Container>
      <Heading>BUSGO</Heading>
      <h2>{busNumber}번 기점 출발 시간표</h2>

      {/* Weekdays */}
      <TimeTable>
        <TableHead>
          <th>평일</th>
        </TableHead>
        <TableBody>
          {weekdaysRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((time, columnIndex) => {
                // row 배열의 각 요소에 대해 반복문 실행
                const num = parseInt(time.split(':')[1], 10); // time 문자열에서 ':' 뒤의 숫자를 추출하여 정수로 변환
                const roundedNum = Math.floor(num / 10) * 10 + (num % 10 >= 5 ? 5 : 0); // 추출한 숫자를 10으로 나눈 몫에 10을 곱하고, 나머지가 5 이상이면 5를 더하여 반올림
                const roundedTime = `${time.slice(4, 6)}:${roundedNum.toString().padStart(2, '0')}`; // time 문자열에서 4~5번째 문자열과 반올림한 숫자를 조합하여 문자열 생성
                return <td key={columnIndex}>{roundedTime}</td>; // 생성한 문자열을 td 태그로 감싸서 반환
              })}
            </tr>
          ))}
        </TableBody>
      </TimeTable>

      {/* Saturday */}
      <TimeTable>
        <TableHead>
          <th style={{ color: 'blue' }}>토요일</th>
        </TableHead>
        <TableBody>
          {saturdaysRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((time, columnIndex) => {
                // row 배열의 각 요소에 대해 반복문 실행
                const num = parseInt(time.split(':')[1], 10);
                const roundedNum = Math.floor(num / 10) * 10 + (num % 10 >= 5 ? 5 : 0);
                const roundedTime = `${time.slice(4, 6)}:${roundedNum.toString().padStart(2, '0')}`;
                return <td key={columnIndex}>{roundedTime}</td>;
              })}
            </tr>
          ))}
        </TableBody>
      </TimeTable>

      {/* Sunday */}
      <TimeTable>
        <TableHead>
          <th style={{ color: 'red' }}>일요일</th>
        </TableHead>
        <TableBody>
          {sundaysRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((time, columnIndex) => {
                // row 배열의 각 요소에 대해 반복문 실행
                const num = parseInt(time.split(':')[1], 10);
                const roundedNum = Math.floor(num / 10) * 10 + (num % 10 >= 5 ? 5 : 0);
                const roundedTime = `${time.slice(4, 6)}:${roundedNum.toString().padStart(2, '0')}`;
                return <td key={columnIndex}>{roundedTime}</td>;
              })}
            </tr>
          ))}
        </TableBody>
      </TimeTable>
    </Container>
  );
};

export default BusPage;
