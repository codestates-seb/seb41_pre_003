import styled from 'styled-components';

const TitleContainer = styled.h1`
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
`;

const SettingsTitle = ({ title }) => {
  return <TitleContainer>{title}</TitleContainer>;
};

export default SettingsTitle;
