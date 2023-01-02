import styled from 'styled-components';
import Header from '../Component/Header';
import InputForm from '../Component/InputForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 50px;
  margin-top: var(--top-bar-allocated-space);

  h1 {
    margin: 30px;
  }
`;

const TipDiv = styled.div`
  background-color: rgb(237, 244, 250);
  border: 1px solid rgb(175, 208, 234);
  padding: 30px;
  margin: 10px;
  border-radius: 10px;
  ul {
    margin: 10px 0;
  }
`;

const CreateQuestion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleChangeTitle = (event) => {
    setTitle('');
    setTitle(event.target.value);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/questions/`,
        {
          title: title,
          content: content,
          tagList: tags.reduce((r, e) => {
            r.push({ tagId: e.tagId });
            return r;
          }, []),
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
        navigate('/questions');
      })
      .catch((err) => {
        console.log(err);
        navigate('/login');
      });
  };

  return (
    <>
      <QuestionContainer>
        <Header />
        <h1>Ask a public question</h1>
        <TipDiv>
          <p>Writing a good question</p>
          <p>
            You’re ready to ask a programming-related question and this form
            will help guide you through the process.
            <br></br>
            Looking to ask a non-programming question? See the topics here to
            find a relevant site.
          </p>
          <ul>
            Steps
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </TipDiv>
        <InputForm
          title={title}
          handleChangeTitle={handleChangeTitle}
          inputContent={'What are the details of your problem?'}
          content={content}
          setContent={setContent}
          tags={tags}
          setTags={setTags}
          handleButtonClick={handleButtonClick}
          buttonContent={'Submit your Question'}
        ></InputForm>
      </QuestionContainer>
    </>
  );
};
export default CreateQuestion;
