import Header from '../Component/Header';
import styled from 'styled-components';
import miniLogo from '../img/mini-logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: 20px;
  margin-top: var(--top-bar-allocated-space);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  p {
    font-weight: bold;
    margin-bottom: 10px;
    width: 400px;
  }
`;

const SignUpSec = styled.section`
  width: 300px;
  grid-auto-flow: column;
  margin: 50px 0px;
`;

const Logo = styled.img`
  width: 30%;
  height: 35%;
`;

const OAuth = styled.div`
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

const SignUpForm = styled.form`
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid gray;
  bottom: 0;
  margin-top: 10px;
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
  }

  input,
  select {
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
    border-radius: 5px;
    background-color: var(--blue);
    color: white;
    border: 1px solid var(--light-gray);
    width: 95%;
    font-size: 15px;
    font-weight: bold;
    padding: 7px;
    margin-top: 20px;

    &:hover {
      background-color: #0074cc;
      cursor: pointer;
      box-shadow: inset 0 0 10px #00457a;
      transition: 0.2s ease-in-out;
    }
  }
`;

// const MessagePop = styled.div`
//   .speech-bubble {
//     position: relative;
//     background: #000000;
//     border-radius: 0.4em;
//   }

//   .speech-bubble:after {
//     content: '';
//     position: absolute;
//     right: 0;
//     top: 50%;
//     width: 0;
//     height: 0;
//     border: 47px solid transparent;
//     border-left-color: #000000;
//     border-right: 0;
//     border-top: 0;
//     margin-top: -23.5px;
//     margin-right: -47px;
//   }
// `;

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (password !== passwordRetype) {
      return alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
    }
    validCheck(password);

    axios
      .post('/members', {
        pw: password,
        gender: gender,
        name: name,
        email: email,
        age: age,
      })
      .then((res) => {
        console.log(res);
        navigate(`/login`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordRetype = (event) => {
    setPasswordRetype(event.target.value);
  };

  const validCheck = (password) => {
    if (!/^[a-zA-Z0-9]{10,15}$/.test(password)) {
      alert('숫자와 영문자 조합으로 10~15자리를 사용해야 합니다.');
      return false;
    }

    let checkNumber = password.search(/[0-9]/g);
    let checkEnglish = password.search(/[a-z]/gi);

    if (checkNumber < 0 || checkEnglish < 0) {
      alert('숫자와 영문자를 혼용하여야 합니다.');
      return false;
    }

    if (/(\w)\1\1\1/.test(password)) {
      alert('444같은 문자를 4번 이상 사용하실 수 없습니다.');
      return false;
    }
    return true;
  };

  return (
    <>
      <Header />
      <SignUpContainer>
        <p>Join the Stack Overflow Community</p>
        <SignUpSec>
          <OAuth>
            <Logo src={miniLogo} alt=""></Logo>
            <GoogleBtn>Sign up with Google</GoogleBtn>
            <GithubBtn>Sign up with Github</GithubBtn>
            <FaceBookBtn>Sign up with FaceBook</FaceBookBtn>
          </OAuth>
          <SignUpForm onSubmit={handleButtonClick}>
            <label htmlFor="name">Display name</label>
            <input
              type="text"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={handleChangePassword}
            ></input>
            <label htmlFor="confirm-pw">Password Retype</label>
            <input
              type="password"
              id="confirm-pw"
              value={passwordRetype}
              required
              onChange={handleChangePasswordRetype}
            ></input>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="dwm">Do not want to mention</option>
            </select>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              required
              onChange={(e) => setAge(e.target.value)}
            ></input>
            <button type="submit">Sign up</button>
          </SignUpForm>
        </SignUpSec>
      </SignUpContainer>
    </>
  );
};

export default SignUp;
