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
    if (!email.includes('@')) {
      return alert('이메일 형식이 올바르지 않습니다.');
    }
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
      .then(function (response) {
        console.log(response);
        navigate(`/login`);
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

  const validCheck = (password) => {
    if (!/^[a-zA-Z0-9]{10,15}$/.test(password)) {
      alert('숫자와 영문자 조합으로 10~15자리를 사용해야 합니다.');
      return false;
    }

    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/gi);

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
          <SignUpForm>
            <div>
              <div>Display name</div>
              <input
                type="text"
                value={name}
                onChange={handleChangeName}
              ></input>
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
              <input
                type="number"
                value={age}
                onChange={handleChangeAge}
              ></input>
            </div>
            <button type="submit" onClick={handleButtonClick}>
              Sign up
            </button>
          </SignUpForm>
        </SignUpSec>
      </SignUpContainer>
    </>
  );
};

export default SignUp;
