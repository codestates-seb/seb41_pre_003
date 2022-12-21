import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled(Link)`
  margin-right: 20px;
  img {
    width: 170px;
  }
`;
const Input = styled.form`
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  width: 400px;
  height: 20px;
  background-color: white;
  i {
    padding-right: 5px;
  }
  input {
    width: 100%;
    font-size: 15px;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;
const Button = styled.button`
  border-radius: 10px;
  background-color: var(--blue);
  color: white;
  width: 100px;
  height: 45px;
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  &:hover {
    background-color: #0074cc;
    cursor: pointer;
  }
`;

const Header = () => {
  return (
    <header>
      <div>
        <Logo to="/">
          <img src={logo} alt="logo" />
        </Logo>
        <Input>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Search..." type="search" />
        </Input>
      </div>
      <div>
        <Button>Log in</Button>
        <Button>Sign up</Button>
      </div>
    </header>
  );
};

export default Header;
