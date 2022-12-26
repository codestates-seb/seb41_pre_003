import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import Button from '../Component/Button';
import Writer from '../Component/Writer';

const QDContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
`;

const QContent = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  padding: 10px;

  button {
    border: none;
    margin: 10px;
  }
`;

const QTitle = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    margin-bottom: 10px;
  }
  Button {
    width: 20%;
    height: 5%;
  }
`;

const QInfo = styled.div`
  border-bottom: 5px solid var(--light-gray);
  span {
    margin: 10px;
  }
`;

const Question = styled.div`
  width: 100%;
  padding: 10px;
`;

const AnswerContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  h2 {
    margin: 10px 0 10px 0;
  }
`;

const AnswerForm = styled.form`
  width: 100%;
  overflow: hidden;
  Button {
    margin-top: 10px;
  }
`;

const QuestionDetail = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Nav></Nav>
        <QDContainer>
          <QContent>
            <QTitle>
              <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
              <Button value="Ask Question"></Button>
            </QTitle>
            <QInfo>
              <span>Asked</span>
              <span>Modified</span>
            </QInfo>
            <Question>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              consectetur laoreet elit eu varius. Morbi luctus ex ac luctus
              ultricies. Nullam tincidunt non erat vel gravida. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Nunc congue nisi eget ante consectetur, at porta
              massa maximus. Ut consectetur nisi et eros aliquet efficitur sed
              in mauris. Morbi lobortis tortor quis nibh dignissim, eu eleifend
              sem ultricies. Aliquam bibendum a lectus a dignissim.
            </Question>
            <button>edit</button>
          </QContent>
          <AnswerContainer>
            <p>
              Know someone who can answer? Share a link to this question via
              email, Twitter, or Facebook.
            </p>
            <h2>Your Answer</h2>
            <AnswerForm action="/answer" method="post">
              <Writer></Writer>
              <Button value="Post Your Answer"></Button>
            </AnswerForm>
          </AnswerContainer>
        </QDContainer>
      </main>
      <Footer></Footer>
    </>
  );
};
export default QuestionDetail;
