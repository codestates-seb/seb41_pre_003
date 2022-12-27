import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import Button from '../Component/Button';
import Writer from '../Component/Writer';
import Content from '../Component/Content';
import Loading from '../Component/Loading';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [isLoading, setLoading] = useState(true);
  const { question_id } = useParams();

  useEffect(() => {
    axios
      // .get(`http://:3001/questions/${question_id}`)
      .get(`/questions/${question_id}`)
      .then((res) => {
        console.log(res);
        setQuestion(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      // .get(`http://localhost:3001/questions/${question_id}/answer`)
      .get(`/questions/${question_id}/answers`)
      .then((res) => {
        console.log(res);
        setAnswer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <Nav></Nav>
        {isLoading ? (
          <QDContainer>
            <Title>
              <h1>{question.title}</h1>
              <Link to="/questions/ask">
                <Button value="Ask Question"></Button>
              </Link>
            </Title>
            <Info>
              <span>Asked {question.create_date}</span>
              <span>Modified {question.modifiedAt}</span>
            </Info>
            <Content></Content>
            <h2>{answer.length !== undefined ? answer.length : 0}Answer</h2>
            {answer.length > 0 ? <Content></Content> : ''}
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
        ) : (
          <Loading></Loading>
        )}
      </main>
      <Footer></Footer>
    </>
  );
};
export default QuestionDetail;
