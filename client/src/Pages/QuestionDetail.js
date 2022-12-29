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
  const { questionId } = useParams();

  useEffect(() => {
    axios
      // .get(`/questions/${question_id}`)
      .get(`/questions/${questionId}`)
      .then((res) => {
        setQuestion(res.data);
        console.log('question: ', question);

        axios
          .get(`/questions/${questionId}/answers`)
          // .get(`http://localhost:3001/questions/${questionId}/answers`)
          .then((res) => {
            setAnswer(res.data);
            setLoading(false);
            console.log('answer: ', answer);
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
  }, []);

  //question, answer 경로 따로
  //delete 안을 변수로 놓고 주면 어떨까?
  const handleDelete = () => {
    //{input}
    {
      confirm('삭제하시겠습니까?') === true
        ? axios
            .delete(`/questions/${questionId}`)
            // .delete(input)
            .then((res) => {
              console.log(res);
              navigate(`/questions`); //여기도
            })
            .catch((err) => {
              console.log(err);
            })
        : '';
    }
  };

  const handleCreateAnswer = () => {
    axios
      .post(`/questions/${question.questionId}`, {
        content: inputContent,
        //memberId: memberId, //이건 어떻게 알고 주지
        questionId: question.questionId,
      })
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
            <Content data={question} handleDelete={handleDelete}></Content>
            <h2>
              {answer.length > 1
                ? `${answer.length} Answers`
                : `${answer.length} Answer`}
            </h2>
            {answer.map((el) => {
              return (
                <Content
                  data={el}
                  handleDelete={handleDelete}
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
              <AnswerForm>
                <ToastEditor setInputContent={setInputContent}></ToastEditor>
              </AnswerForm>
              <Button
                value="Submit your Answer"
                onClick={handleCreateAnswer}
              ></Button>
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
