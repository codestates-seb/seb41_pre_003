import Header from '../Component/Header';
import styled from 'styled-components';
import miniLogo from '../img/mini-logo.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SignUpContainer = styled.section`
  width: auto;
  height: calc(100vh - 71px);
  margin-top: var(--top-bar-allocated-space);
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--light-gray);

  p {
    font-weight: bold;
    margin-left: 10%;
    margin-bottom: 10px;
    padding-right: 20px;
    width: 50%;
  }
`;

const SignUpSec = styled.section`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-right: 150px;
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

const SignUpForm = styled.div`
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
  div,
  input {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  button {
    border-radius: 5px;
    background-color: var(--blue);
    color: white;
    border: 1px solid var(--light-gray);
    width: 95%;
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

// 비밀번호 체크
const isMatch = (password1, password2) => {
  return password1 === password2;
};

// [유효성 검증 함수]: 영어 또는 숫자만 가능
// +이메일 형식을 지켰는지도 검사할 것
// 백엔드에 @ 형식 검사 있다고 함.
// const onlyNumberAndEnglish = (str) => {
//   return /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(str);
//   // /^[A-Za-z][A-Za-z0-9]*$/.test(str);
// };

// [비밀번호 유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
const strongPassword = (str) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    str
  );
};

// const isVaild = () => {
//   isMatch && onlyNumberAndEnglish && strongPassword ? true : false;
// };

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const handleButtonClick = (event) => {
    axios
      .post('http://localhost:3002/members', {
        pw: password,
        gender: gender,
        name: name,
        email: email,
        age: age,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordRetype = (event) => {
    setPasswordRetype(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  return (
    <SignUpContainer>
      <Header />
      <p>Join the Stack Overflow Community</p>
      <SignUpSec>
        <OAuth>
          <Logo src={miniLogo} alt=""></Logo>
          <GoogleBtn>Sign up with Google</GoogleBtn>
          <GithubBtn>Sign up with Github</GithubBtn>
          <FaceBookBtn>Sign up with FaceBook</FaceBookBtn>
        </OAuth>
        <SignUpForm>
          <div>
            <div>Display name</div>
            <input type="text" value={name} onChange={handleChangeName}></input>
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
            <div>Password Retype</div>
            <input
              type="password"
              value={passwordRetype}
              onChange={handleChangePasswordRetype}
            ></input>
            <div>Gender</div>
            <select name="gender" onChange={handleChangeGender}>
              <option value="">Select your gender</option>
              <option value="mail">Male</option>
              <option value="female">Female</option>
              <option value="dwm">Do not want to mention</option>
            </select>
            <div>Age</div>
            <input type="number" value={age} onChange={handleChangeAge}></input>
          </div>
          <button type="submit" onClick={handleButtonClick}>
            Sign up
          </button>
        </SignUpForm>
      </SignUpSec>
    </SignUpContainer>
  );
};

export default SignUp;
