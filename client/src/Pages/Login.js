import Header from '../Component/Header';
import styled from 'styled-components';
import miniLogo from '../img/mini-logo.png';

const LogInContainer = styled.section`
  width: auto;
  height: calc(100vh - 71px);
  margin-top: var(--top-bar-allocated-space);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--light-gray);
`;

const Logo = styled.img`
  width: 30%;
  height: 35%;
`;

const OAuth = styled.div`
  width: 20%;
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
  width: 20%;
  bottom: 0;
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

const LogIn = () => {
  return (
    <LogInContainer>
      <Header />
      <OAuth>
        <Logo src={miniLogo} alt=""></Logo>
        <GoogleBtn>Log in with Google</GoogleBtn>
        <GithubBtn>Log in with Github</GithubBtn>
        <FaceBookBtn>Log in with FaceBook</FaceBookBtn>
      </OAuth>
      <LogInFormContainer>
        <div>
          <div>Email</div>
          <input type="email"></input>
          <div>Password</div>
          <input type="password"></input>
        </div>
        <button type="submit">Log in</button>
      </LogInFormContainer>
    </LogInContainer>
  );
};

export default LogIn;
