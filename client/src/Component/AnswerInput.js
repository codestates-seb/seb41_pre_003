import ToastEditor from './ToastEditor';
import Button from './Button';
import styled from 'styled-components';

const QuestionForm = styled.form`
  input {
    width: 100%;
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

const AnswerInput = ({ setContent, handleButtonClick }) => {
  return (
    <QuestionForm>
      <InputContainer>
        <div>
          What are the details of your problem?
          <br></br>
          What did you try and what were you expecting?
        </div>
        <ToastEditor setContent={setContent}></ToastEditor>
      </InputContainer>
      <Button value="Review your question" onClick={handleButtonClick}></Button>
    </QuestionForm>
  );
};
export default AnswerInput;
