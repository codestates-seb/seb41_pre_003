import styled from 'styled-components';
import MidTitle from './MidTitle';
import QuestionList from './QuestionList';
import Button from './Button';
import { Link } from 'react-router-dom';

const MainContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
`;
const QuestionContainer = styled(Link)`
  display: flex;
  justify-content: flex-end;
  text-decoration-line: none;
`;
function Main() {
  return (
    <>
      <MainContainer>
        <MidTitle title="Top Questions" />
        <QuestionContainer to="/questions/ask">
          <Button value="Ask Question" />
        </QuestionContainer>
        <QuestionList></QuestionList>
      </MainContainer>
    </>
  );
}

export default Main;
