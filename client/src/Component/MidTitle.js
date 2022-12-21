import styled from 'styled-components';

const TitleContainer = styled.h1`
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
`;

const MidTitle = ({ title }) => {
  return <TitleContainer>{title}</TitleContainer>;
};

export default MidTitle;
