import logo from '../img/logo.png';
import styled from 'styled-components';
import ButtonLink from './ButtonLink';
import Button from './Button';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    button {
      margin-left: 10px;
    }
    a {
      margin-left: 10px;
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
    margin-right: 10px;
  }
  select {
    margin-right: 5px;
    border: none;
    font-size: 16px;
  }
  input {
    width: 100%;
    font-size: 16px;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

const LogoutBtn = styled(Button)`
  background-color: var(--orange);
  &:hover {
    background-color: #c3661c;
    box-shadow: inset 0 0 10px #00457a;
  }
`;

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem('AccessToken'));
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/login`, {
        headers: {
          Authorization: `${localStorage.getItem('AccessToken')}`,
          Refresh: `${localStorage.getItem('RefreshToken')}`,
        },
      })
      .then((res) => {
        const AccessToken = res.headers.get('Authorization');
        const RefreshToken = res.headers.get('Refresh');
        console.log(AccessToken, RefreshToken);
        // localStorage.setItem('RefreshToken', RefreshToken);
        // localStorage.setItem('memberId', res.data.memberId);
        // setToken(AccessToken);
      })
      .catch((err) => {
        // ????????? ????????? ???????????? ???????????????????????? ????????? ????????? ???????????? ????????? ?????????
        localStorage.removeItem('AccessToken');
        localStorage.removeItem('RefreshToken');
        localStorage.removeItem('memberId');
        setToken(null);
        console.log(err);
      });
  }, []);

  const LogOut = () => {
    // TODO: ?????????????????? ????????? localstorage??? ?????? token ????????? ??? home ???????????? ???????????????
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
        <Search action="/search" method="GET">
          <i className="fa-solid fa-magnifying-glass"></i>
          <select name="type" id="type" required>
            <option value="1">??????</option>
            <option value="2">??????</option>
            <option value="3">??????</option>
          </select>
          <input
            placeholder="Search..."
            name="keyword"
            id="keyword"
            type="text"
          />
        </Search>
      </div>
      {!token ? (
        <div>
          <ButtonLink value="Log in" to="/login" />
          <ButtonLink value="Sign up" to="/signup" />
        </div>
      ) : (
        <div>
          <ButtonLink
            value="Edit profile"
            to={`/users/edit/${localStorage.getItem('memberId')}`}
          />
          <LogoutBtn onClick={LogOut} value="Logout" />
        </div>
      )}
    </HeaderContainer>
  );
};

export default Header;
