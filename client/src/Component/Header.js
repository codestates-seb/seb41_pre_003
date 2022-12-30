import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { useEffect, useState } from 'react';

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
  // 로그아웃버튼 누르면 localstorage에 있는 token 없애기 후 home 페이지로 리다이렉션
  const [token, setToken] = useState(null);

  const Logout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('freshToken');
    setToken(null);
  };
  useEffect(() => {
    const temp = localStorage.getItem('AccessToken');
    setToken(temp);
  });
  return (
    <>
      {token ? (
        <header>
          <div>
            <Logo to="/">
              <img src={logo} alt="logo" />
            </Logo>
            <Search action="/search" method="GET">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input placeholder="Search..." name="keyword" type="text" />
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
      ) : (
        <header>
          <div>
            <Logo to="/">
              <img src={logo} alt="logo" />
            </Logo>
            <Search action="/search" method="GET">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input placeholder="Search..." name="keyword" type="text" />
            </Search>
          </div>
          <div>
            <Link to="/">
              <Button value="Logout" onClick={Logout} />
            </Link>
          </div>
        </header>
      )}
      ;
    </>
  );
};

export default Header;
