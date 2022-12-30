import Header from '../Component/Header';
import styled from 'styled-components';
import miniLogo from '../img/mini-logo.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(auto-fill, 1fr));
  gap: 20px;
`;

const LogInContainer = styled.section`
  width: 100%;
  height: 100%;
  margin-top: var(--top-bar-allocated-space);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
  height: 120px;
`;

const OAuth = styled.div`
  width: 300px;
  text-align: center;
`;

const GoogleBtn = styled.button`
  background-color: white;
  color: black;
  border-radius: 10px;
  width: 100%;
  padding: 5px;
  border: 1px solid gray;
  margin-bottom: 5px;
`;

const GithubBtn = styled(GoogleBtn)`
  background-color: var(--black);
  color: white;
`;

const FaceBookBtn = styled(GoogleBtn)`
  background-color: var(--blue);
  color: white;
`;

const LogInFormContainer = styled.div`
  background-color: white;
  padding: 25px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid gray;
  width: 300px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  div,
  input {
    width: 100%;
    height: auto;
  }
  button {
    border-radius: 5px;
    background-color: var(--blue);
    color: white;
    border: 1px solid var(--light-gray);
    width: 100%;
    padding: 5px;
    margin: 10px;
    &:hover {
      background-color: #0074cc;
      cursor: pointer;
      box-shadow: inset 0 0 10px #00457a;
      transition: 0.2s ease-in-out;
    }
  }
`;

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = () => {
    axios
      .post('/auth/login', {
        email: email,
        pw: password,
      })
      .then((res) => {
        console.log(res);
        const AccessToken = res.headers.get('Authorization');
        const RefreshToken = res.headers.get('Refresh');
        console.log('Access:', AccessToken);
        console.log('Refresh: ', RefreshToken);
        console.log(res.data.memberId);
        localStorage.setItem('AccessToken', AccessToken);
        localStorage.setItem('RefreshToken', RefreshToken);
        localStorage.setItem('memberId', res.data.memberId);
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Header />
      <Main>
        <LogInContainer>
          <Logo src={miniLogo} alt=""></Logo>
          <OAuth>
            <GoogleBtn>Log in with Google</GoogleBtn>
            <GithubBtn>Log in with Github</GithubBtn>
            <FaceBookBtn>Log in with FaceBook</FaceBookBtn>
          </OAuth>
          <LogInFormContainer>
            <div>
              <div>Email</div>
              <input
                type="email"
                value={email}
                onChange={handleChangeEmail}
              ></input>
              <div>Password</div>
              <input
                type="password"
                value={password}
                onChange={handleChangePassword}
              ></input>
            </div>
            <button type="submit" onClick={handleButtonClick}>
              Log in
            </button>
          </LogInFormContainer>
        </LogInContainer>
      </Main>
    </>
  );
};

export default LogIn;
