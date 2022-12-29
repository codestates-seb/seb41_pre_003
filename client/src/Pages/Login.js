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
  height: auto;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
`;

const OAuth = styled.div`
  width: 300px;
  text-align: center;
  margin: 10px 0px;
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

const LogInFormContainer = styled.form`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--gray);
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  label {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    position: relative;
  }

  input {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: none;
    outline: 1px solid var(--gray);
    font-size: 15px;
    &:focus {
      outline: 1px solid var(--blue);
      box-shadow: 0px 0px 5px 5px #d9eaf7;
    }
  }

  button {
    border-radius: 12px;
    background-color: var(--blue);
    color: white;
    margin-top: 20px;
    padding: 13px 20px;
    width: 95%;
    font-size: 15px;
    font-weight: bold;
    border: none;
    transition: 0.2s ease-in-out;

    &:not(:disabled):hover {
      background-color: #0074cc;
      cursor: pointer;
      box-shadow: inset 0 0 10px #00457a;
      transition: 0.2s ease-in-out;
    }
    &:disabled {
      background-color: #b5dfff;
      transition: 0.2s ease-in-out;
    }
  }
`;

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    e.preventDefault();
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
          <LogInFormContainer onSubmit={handleButtonClick}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log in</button>
          </LogInFormContainer>
        </LogInContainer>
      </Main>
    </>
  );
};

export default LogIn;
