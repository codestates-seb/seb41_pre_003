import styled from 'styled-components';
import MidTitle from './MidTitle';
import QuestionList from './QuestionList';

const Main = () => {
  const MainContainer = styled.section`
    width: 100%;
    height: auto;
    padding: 20px;
    margin-top: var(--top-bar-allocated-space);
  `;

  return (
    <main>
      <MainContainer>
        <MidTitle title="Top Questions" />
        <QuestionList></QuestionList>
      </MainContainer>
    </main>
  );
};

export default Main;
