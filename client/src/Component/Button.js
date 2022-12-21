import styled from 'styled-components';

const ButtonContainer = styled.button`
  text-decoration: none;
  border-radius: 12px;
  background-color: var(--blue);
  color: white;
  padding: 13px 20px;
  margin-left: 15px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  &:hover {
    background-color: #0074cc;
    cursor: pointer;
    box-shadow: inset 0 0 10px #00457a;
    transition: 0.2s ease-in-out;
  }
`;

const Button = ({ value }) => {
  return <ButtonContainer>{value}</ButtonContainer>;
};

export default Button;
