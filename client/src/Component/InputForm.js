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

const InputForm = ({
  title,
  handleChangeTitle,
  inputContent,
  setContent,
  handleButtonClick,
  buttonContent,
}) => {
  return (
    <QuestionForm>
      {title !== undefined ? (
        <InputContainer>
          <div>Title</div>
          <input type="text" value={title} onChange={handleChangeTitle} />
        </InputContainer>
      ) : (
        ''
      )}
      <InputContainer>
        <div>{inputContent}</div>
        <ToastEditor setContent={setContent}></ToastEditor>
      </InputContainer>
      <Button value={buttonContent} onClick={handleButtonClick}></Button>
    </QuestionForm>
  );
};
export default InputForm;
