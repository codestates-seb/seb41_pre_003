import Header from '../Component/Header';
import styled from 'styled-components';
import miniLogo from '../img/mini-logo.png';

const SignUpContainer = styled.section`
  width: auto;
  height: calc(100vh - 71px);
  margin-top: var(--top-bar-allocated-space);
  display: flex;
  /* flex-direction: column; */
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

const SignUp = () => {
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
            <input type="text"></input>
            <div>Email</div>
            <input type="email"></input>
            <div>Password</div>
            <input type="password"></input>
          </div>
          <button type="submit">Sign up</button>
        </SignUpForm>
      </SignUpSec>
    </SignUpContainer>
  );
};

export default SignUp;
