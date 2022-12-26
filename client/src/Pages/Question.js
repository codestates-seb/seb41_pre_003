import styled from 'styled-components';
import Header from '../Component/Header';
import Writer from '../Component/Writer';
import Button from '../Component/Button';
import { useState, useEffect } from 'react';

const QuestionContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
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
  ul {
    margin: 10px 0;
  }
`;

const QuestionForm = styled.form`
  input {
    width: 100%;
  }
  button {
  }
`;

const InputContainer = styled.div`
  border: 1px solid black;
  padding: 30px;
  margin: 10px;
  div {
    margin-bottom: 10px;
  }
`;

const Question = () => {
  const [title, setTitle] = useState();

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <QuestionContainer>
        <Header></Header>
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
        <QuestionForm>
          <InputContainer>
            <div>Title</div>
            <input type="text" value={title} onChange={handleChangeTitle} />
          </InputContainer>
          <InputContainer>
            <div>What are the details of your problem?</div>
            <Writer></Writer>
          </InputContainer>
          <InputContainer>
            <div>What did you try and what were you expecting?</div>
            <Writer></Writer>
          </InputContainer>
          <Button value="Review your question"></Button>
        </QuestionForm>
      </QuestionContainer>
    </>
  );
};
export default Question;
