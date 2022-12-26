import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const Logo = styled(Link)`
  margin-left: 10px;
  margin-right: 20px;
  img {
    width: 170px;
  }
`;
const Search = styled.form`
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  width: 400px;
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

const Header = () => {
  return (
    <header>
      <div>
        <Logo to="/">
          <img src={logo} alt="logo" />
        </Logo>
        <Search>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Search..." type="search" />
        </Search>
      </div>
      <div>
        <Link to="/login">
          <Button value="Log in" />
        </Link>
        <Link to="/signup">
          <Button value="Sign up" />
        </Link>
      </div>
    </header>
  );
};

export default Header;