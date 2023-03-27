import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Heading = styled.h1`
  font-size: 32px;
`;

export const TimeTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 2rem;
`;
export const TableHead = styled.thead`
  /* background-color: #f2f2f2; */
  th {
    padding: 0.8rem;
    font-weight: bold;
    text-align: center;
  }
`;
export const TableBody = styled.tbody`
  td {
    text-align: center;
    padding: 0.8rem 1.5rem;
    border: 1px solid #ddd;
  }
  tr {
    padding: 0.8rem;
  }
`;
