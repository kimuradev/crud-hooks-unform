import styled from 'styled-components';

export const H1 = styled.h1`
  text-align: center;
  color: rgb(113, 89, 193);
`;

export const H2 = styled.h2`
  font-stretch: normal;
  line-height: 1.33;
  margin: 0;
  padding: 0;
  letter-spacing: -1px;
  color: ${props => props.color};
`;

export const GridFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -1rem;
  margin-right: -1rem;
`;
