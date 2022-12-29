import Header from '../Component/Header';
import styled from 'styled-components';
import miniLogo from '../img/mini-logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 20px;
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
  margin: 40px 0px;
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
    position: relative;
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

const MessagePop = styled.div`
  position: absolute;
  top: 70%;
  right: 105%;
  color: ${(props) => (props.isValid ? 'var(--green)' : 'var(--orange)')};
  font-weight: ${(props) => (props.isValid ? 'bold' : '')};
  font-size: 15px;

  .speech-bubble {
    word-break: keep-all;
    position: relative;
    border: 1px solid var(--gray);
    border-radius: 0.4em;
    background-color: var(--light-gray);
    min-width: 250px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .speech-bubble:after {
    content: '';
    height: 9px;
    position: absolute;
    top: 12px;
    right: -5px;
    background-color: var(--light-gray);
    transform: rotate(210deg) skew(-24deg);
    width: 9px;
    border-left: 1px solid var(--gray);
    border-bottom: 1px solid var(--gray);
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
    if (password !== passwordRetype) {
      return alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
    }
    validCheck(password);

    axios
      .post('/members', {
        name: name,
        email: email,
        pw: password,
        gender: gender,
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

  const validCheck = (password) => {
    if (!/^[a-zA-Z0-9]{10,15}$/.test(password)) {
      return '숫자와 영문자 조합으로 10~15자리를 사용해야 합니다.';
    }

    let checkNumber = password.search(/[0-9]/g);
    let checkEnglish = password.search(/[a-z]/gi);

    if (checkNumber < 0 || checkEnglish < 0) {
      return '숫자와 영문자를 혼용하여야 합니다.';
    }

    if (/(\w)\1\1\1/.test(password)) {
      return '같은 문자를 4번 이상 사용하실 수 없습니다.';
    }
    return '사용하실 수 있습니다!';
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
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">
              Password
              <MessagePop
                isValid={validCheck(password) === '사용하실 수 있습니다!'}
              >
                <div className="speech-bubble">{validCheck(password)}</div>
              </MessagePop>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirm-pw">
              Password Retype
              <MessagePop isValid={password === passwordRetype}>
                <div className="speech-bubble">
                  {password === passwordRetype
                    ? '일치합니다!'
                    : '일치하지 않습니다'}
                </div>
              </MessagePop>
            </label>
            <input
              type="password"
              id="confirm-pw"
              value={passwordRetype}
              required
              onChange={(e) => setPasswordRetype(e.target.value)}
            />
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
            />
            <button
              type="submit"
              disabled={
                !(
                  validCheck(password) === '사용하실 수 있습니다!' &&
                  password === passwordRetype
                )
              }
            >
              Sign up
            </button>
          </SignUpForm>
        </SignUpSec>
      </SignUpContainer>
    </>
  );
};

export default SignUp;
