import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import Button from '../Component/Button';
import ToastEditor from '../Component/ToastEditor';
import Content from '../Component/Content';
import Loading from '../Component/Loading';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState();
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { question_id } = useParams();

  useEffect(() => {
    axios
      // .get(`/questions/${question_id}`)
      .get(`http://localhost:3001/questions/${question_id}`)
      .then((res) => {
        setQuestion(res.data);
        axios
          // .get(`/questions/${question_id}/answers`)
          // .get(`http://localhost:3001/questions/${question_id}/answers`)
          .get(`http://localhost:3001/answers`)
          .then((res) => {
            setAnswer(res.data);
            setLoading(false);
            console.log('answer: ', answer);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePatch = () => {
    axios
      .patch(`/questions/${question_id}`, {
        title: question.title,
        content: question.content,
      })
      .then(() => {
        navigate(`/questions/${question_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/questions/${question_id}`)
      .then((res) => {
        console.log(res);
        navigate(`/questions`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header></Header>
      <main>
        <Nav></Nav>
        {!isLoading ? (
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
            <Content
              data={question}
              handlePatch={handlePatch}
              handleDelete={handleDelete}
            ></Content>
            <h2>{answer.length !== undefined ? answer.length : 0} Answer</h2>
            {answer.length > 0
              ? answer.map((el) => {
                  <Content
                    data={el}
                    handlePatch={handlePatch}
                    handleDelete={handleDelete}
                  ></Content>;
                })
              : ''}
            <AnswerCreate>
              <p>
                Know someone who can answer? Share a link to this question via
                email, Twitter, or Facebook.
              </p>
              <h2>Your Answer</h2>
              <AnswerForm>
                <ToastEditor></ToastEditor>
                {/* <Button value="Post Your Answer"></Button> */}
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
