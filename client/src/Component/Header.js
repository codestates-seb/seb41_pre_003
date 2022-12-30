import logo from '../img/logo.png';
import styled from 'styled-components';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--light-gray);
  border-top: 5px solid var(--orange);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 71px;
  box-shadow: 0px 1px 5px 2px rgba(128, 128, 128, 0.5);
  z-index: 99;
  animation: slidefromtop 1s ease-in-out;

  @keyframes slidefromtop {
    from {
      top: -71px;
    }
    to {
      top: 0px;
    }
  }

  div {
    display: flex;
    &:last-child {
      a {
        margin-left: 10px;
      }
    }
  }
`;

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
  // TODO: 로그아웃버튼 누르면 localstorage에 있는 token 없애기 후 home 페이지로 리다이렉션
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('AccessToken');
    if (token) setToken(token);
  }, []);

  const LogOut = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('memberId');
    setToken(null);
    navigate('/');
  };

  return (
    <HeaderContainer>
      <div>
        <Logo to="/">
          <img src={logo} alt="logo" />
        </Logo>
        <Search action="/questions/search" method="GET">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Search..." name="keyword" type="text" />
        </Search>
      </div>
      {!token ? (
        <div>
          <ButtonLink value="Log in" to="/login" />
          <ButtonLink value="Sign up" to="/signup" />
        </div>
      ) : (
        <div>
          <Button value="Logout" onClick={LogOut} />
        </div>
      )}
    </HeaderContainer>
  );
};

export default Header;
