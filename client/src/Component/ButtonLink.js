import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonContainer = styled(Link)`
  text-decoration: none;
  border-radius: 12px;
  background-color: var(--blue);
  color: white;
  padding: 13px 20px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #0074cc;
    cursor: pointer;
    box-shadow: inset 0 0 10px #00457a;
    transition: 0.2s ease-in-out;
  }
`;

const ButtonLink = ({ value, to }) => {
  return <ButtonContainer to={to}>{value}</ButtonContainer>;
};

export default ButtonLink;
