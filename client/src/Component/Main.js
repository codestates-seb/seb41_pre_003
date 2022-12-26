import styled from 'styled-components';
import MidTitle from './MidTitle';
import QuestionList from './QuestionList';

const MainContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
`;
function Main() {
  return (
    <>
      <MainContainer>
        <MidTitle title="Top Questions" />
        <QuestionList></QuestionList>
      </MainContainer>
    </>
  );
}

export default Main;
