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
  margin-top: 100px;
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

  p {
    margin: 10px;
    padding: 10px;
    font-weight: 600;
    font-size: medium;
  }
`;

const Logo = styled.img`
  width: 100px;
`;

const LogInFormContainer = styled.form`
  position: relative;
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

const Alert = styled.div`
  width: 100%;
  color: var(--orange);
  font-weight: bold;
  position: absolute;
  bottom: 80px;
  left: 20px;
  font-size: 14px;
  display: ${(props) => (props.alert ? '' : 'none')};
`;

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    e.preventDefault();
    axios
      .post(`/auth/login`, {
        email: email,
        pw: password,
      })
      .then((res) => {
        const AccessToken = res.headers.get('Authorization');
        const RefreshToken = res.headers.get('Refresh');
        localStorage.setItem('AccessToken', AccessToken);
        localStorage.setItem('RefreshToken', RefreshToken);
        localStorage.setItem('memberId', res.data.memberId);
        navigate(`/`);
      })
      .catch((err) => {
        setAlert(true);
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <Main>
        <LogInContainer>
          <Logo src={miniLogo} alt=""></Logo>
          <p>Log in to use more features</p>
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
            <Alert alert={alert}>
              이메일 또는 비밀번호가 일치하지 않습니다
            </Alert>
            <button type="submit">Log in</button>
          </LogInFormContainer>
        </LogInContainer>
      </Main>
    </>
  );
};

export default LogIn;
