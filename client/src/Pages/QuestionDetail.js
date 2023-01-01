import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import Button from '../Component/Button';
import ButtonLink from '../Component/ButtonLink';
import ToastEditor from '../Component/ToastEditor';
import Content from '../Component/Content';
import Loading from '../Component/Loading';
import timePassed from '../utils/timePassed';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
  border-bottom: 3px solid var(--gray);
  span {
    margin: 10px;
  }
`;

const LikeButton = styled.button`
  border-radius: 10px;
  width: 50px;
  margin: 5px;
`;

const AnswerCreate = styled.div`
  border-top: 3px solid var(--gray);
  padding: 0 10px;
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

const LoginAlert = styled.div`
  margin: 10px;
  button {
    border-radius: 10px;
    padding: 10px;
    margin: 0;
    background-color: var(--orange);
    color: white;
    border: none;
  }
`;

const QuestionDetail = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [isLoading, setLoading] = useState(true);
  let token = localStorage.getItem('AccessToken');

  const navigate = useNavigate();
  const { questionId } = useParams();

  useEffect(() => {
    axios
      .get(`/questions/${questionId}`)
      .then((res) => {
        setQuestion(res.data);
        console.log('question: ', question);

        axios
          .get(`/questions/${questionId}/answers`)
          .then((res) => {
            setAnswer(res.data);
            setLoading(false);
            console.log('answer: ', answer);

            axios
              .get(`questions/${questionId}/like`)
              .then((res) => {
                console.log('like:', res);
              })
              .catch((err) => {
                console.log('err:', err);
              });
          })
          .catch((err) => {
            console.log('answer err: ', err);
          });
      })
      .catch((err) => {
        console.log('question err:', err);
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

  const handleLikeClick = () => {
    axios
      .post(
        `/questions/${question.questionId}/like`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem('AccessToken')}`,
            Refresh: `${localStorage.getItem('RefreshToken')}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
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
              <ButtonLink value="Ask Question" to="/questions/ask"></ButtonLink>
            </Title>
            <Info>
              <span>Asked {`${timePassed(question.create_date)} ago`}</span>
              <span>Viewed {question.viewCount}</span>
              <span>Liked {question.likeCount}</span>
              {/* {? <LikeButton onClick={handleLikeClick}>
                <i className="fa-regular fa-thumbs-up"></i>
              </LikeButton> : ''} */}
              <LikeButton onClick={handleLikeClick}>
                <i className="fa-regular fa-thumbs-up"></i>
              </LikeButton>
            </Info>
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
              return <Content data={el} key={el.answerId}></Content>;
            })}
            <AnswerCreate>
              <p>
                Know someone who can answer? Share a link to this question via
                email, Twitter, or Facebook.
              </p>
              <h2>Your Answer</h2>
              <AnswerForm onSubmit={handleCreateAnswer}>
                <ToastEditor setContent={setInputContent}></ToastEditor>
                {!token ? (
                  <LoginAlert>
                    <p>Log in to add new answers</p>
                    <Link to="/login">
                      <button>Log in</button>
                    </Link>
                  </LoginAlert>
                ) : (
                  <Button
                    type="submit"
                    value="Submit your Answer"
                    onClick={handleCreateAnswer}
                  ></Button>
                )}
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
