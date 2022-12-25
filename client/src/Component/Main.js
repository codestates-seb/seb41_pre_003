import styled from 'styled-components';
import MidTitle from './MidTitle';
// import { Link } from 'react-router-dom';
import QuestionList from './QuestionList';

function Main() {
  const MainContainer = styled.section`
    width: 100%;
    height: auto;
    padding: 20px;
    margin-top: var(--top-bar-allocated-space);
  `;
  // const Question = styled.div`
  //   height: 140px;
  //   border: 1px solid black;
  //   border-radius: 10px;
  //   padding: 50px;
  //   font-size: 30px;
  //   display: grid;
  //   color: #0b96ff;
  //   width: 900px;
  //   margin-bottom: 30px;
  //   background-color: var(--light-gray);
  //   box-shadow: 5px 5px 5px 5px gray;
  //   &:hover {
  //     background-color: white;
  //   }
  //   div {
  //     font-size: 20px;
  //     display: flex;
  //     justify-content: end;
  //     align-items: flex-end;
  //     color: black;
  //   }
  // `;
  return (
    <main>
      <MainContainer>
        <MidTitle title="Top Questions" />
        <QuestionList></QuestionList>
        {/* <Link to={`/questions/1`}>
          <Question></Question>
        </Link> */}
      </MainContainer>
    </main>
  );
}

export default Main;
