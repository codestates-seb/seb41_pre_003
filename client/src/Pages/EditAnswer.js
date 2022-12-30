import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputForm from '../Component/InputForm';

const EditContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
`;

const EditAnswer = () => {
  const [content, setContent] = useState(null);
  const { questionId, answerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/questions/${questionId}/answers/${answerId}`
      )
      .then((res) => {
        console.log('content:', res.data.content);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePatch = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/questions/${questionId}/answers/${answerId}`,
        {
          content: content,
          memberId: `${localStorage.getItem('memberId')}`,
          questionId: questionId,
        }
      )
      .then(() => {
        navigate(`/questions/${questionId}`);
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
        <EditContainer>
          {content && (
            <InputForm
              inputContent={'답변을 수정하세요'}
              content={content}
              setContent={setContent}
              handleButtonClick={handlePatch}
              buttonContent={'Submit your Answer'}
            ></InputForm>
          )}
        </EditContainer>
      </main>
      <Footer></Footer>
    </>
  );
};
export default EditAnswer;
