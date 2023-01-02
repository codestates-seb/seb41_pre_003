import styled from 'styled-components';

const ButtonContainer = styled.button`
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

  &:disabled {
    background-color: rbga(1, 1, 1, 0);
    color: rgba(1, 1, 1, 0.3);
    transition: 0.2s ease-in-out;
  }
`;

const Button = ({ value, onClick }) => {
  return <ButtonContainer onClick={onClick}>{value}</ButtonContainer>;
};

export default Button;
