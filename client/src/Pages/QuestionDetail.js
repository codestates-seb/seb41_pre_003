import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import Button from '../Component/Button';
import ToastEditor from '../Component/ToastEditor';
import Content from '../Component/Content';
import Loading from '../Component/Loading';
// import Vote from '../Component/Vote';
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
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { questionId, answerId } = useParams();

  useEffect(() => {
    axios
      .get(`/questions/${questionId}`)
      .then((res) => {
        setQuestion(res.data);

        axios
          .get(`/questions/${questionId}/answers`)
          .then((res) => {
            setAnswer(res.data);
            setLoading(false);
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
  }, [isLoading]);

  const handleDeleteQuestion = () => {
    {
      confirm('삭제하시겠습니까?') === true
        ? axios
            .delete(`/questions/${questionId}`, {
              headers: {
                Authorization: `${localStorage.getItem('AccessToken')}`,
                Refresh: `${localStorage.getItem('RefreshToken')}`,
              },
            })
            .then((res) => {
              console.log(res);
              navigate(`/questions`);
            })
            .catch((err) => {
              console.log(err);
            })
        : '';
    }
  };

  const handleDeleteAnswer = () => {
    {
      confirm('삭제하시겠습니까?') === true
        ? axios
            .delete(`/questions/${questionId}/answers/${answerId}`, {
              headers: {
                Authorization: `${localStorage.getItem('AccessToken')}`,
                Refresh: `${localStorage.getItem('RefreshToken')}`,
              },
            })
            .then((res) => {
              console.log(res);
              navigate(`/questions`);
            })
            .catch((err) => {
              console.log(err);
            })
        : '';
    }
  };

  const handleCreateAnswer = (e) => {
    e.preventDefault();
    axios
      .post(
        `/questions/${question.questionId}/answers`,
        {
          content: inputContent,
          memberId: `${localStorage.getItem('memberId')}`,
          questionId: question.questionId,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('AccessToken')}`,
            Refresh: `${localStorage.getItem('RefreshToken')}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate(`/questions/${question.questionId}`);
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
              {/* <span>Modified {question.modifiedAt}</span> */}
              <span>View {question.viewCount}</span>
            </Info>
            {/* <Vote count={question.voteCount}></Vote> */}
            <Content
              data={question}
              handleDelete={handleDeleteQuestion}
            ></Content>
            <h2>
              {answer.length > 1
                ? `${answer.length} Answers`
                : `${answer.length} Answer`}
            </h2>
            {answer.map((el) => {
              return (
                <Content
                  data={el}
                  handleDelete={handleDeleteAnswer}
                  key={el.answerId}
                ></Content>
              );
            })}
            <AnswerCreate>
              <p>
                Know someone who can answer? Share a link to this question via
                email, Twitter, or Facebook.
              </p>
              <h2>Your Answer</h2>
              <AnswerForm onSubmit={handleCreateAnswer}>
                <ToastEditor setContent={setInputContent}></ToastEditor>
                <Button type="submit" value="Submit your Answer"></Button>
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
