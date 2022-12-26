import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import Button from '../Component/Button';
import Writer from '../Component/Writer';
import Content from '../Component/Content';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const QDContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    margin-bottom: 10px;
  }
  Link {
    width: 100%;
    height: 100%;
  }
`;

const Info = styled.div`
  border-bottom: 5px solid var(--light-gray);
  span {
    margin: 10px;
  }
`;

const AnswerCreate = styled.div`
  border-top: 5px solid var(--light-gray);
  padding: 10px;
  p,
  h2 {
    margin: 10px 0;
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <Nav></Nav>
        <QDContainer>
          <Title>
            <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
            <Link to="/questions/ask">
              <Button value="Ask Question"></Button>
            </Link>
          </Title>
          <Info>
            <span>Asked</span>
            <span>Modified</span>
          </Info>
          <Content></Content>
          <h2>{}Answer</h2>
          <Content></Content>
          <AnswerCreate>
            <p>
              Know someone who can answer? Share a link to this question via
              email, Twitter, or Facebook.
            </p>
            <h2>Your Answer</h2>
            <AnswerForm action="/answer" method="post">
              <Writer></Writer>
              <Button value="Post Your Answer"></Button>
            </AnswerForm>
          </AnswerCreate>
        </QDContainer>
      </main>
      <Footer></Footer>
    </>
  );
};
export default QuestionDetail;
