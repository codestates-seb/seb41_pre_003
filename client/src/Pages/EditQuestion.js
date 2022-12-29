import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import InputForm from '../Component/InputForm';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
`;

const EditQuestion = () => {
  const [data, setData] = useState('');
  const { questionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      //.get('/questions')
      .get(`/questions/${questionId}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }, []);

  const handlePatch = () => {
    axios
      .patch(`/questions/${questionId}`, {
        title: data.title,
        content: data.content,
        memberId: data.memberId,
      })
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
      <Nav></Nav>
      <EditContainer>
        <InputForm
          title={data.title}
          // handleChangeTitle={handleChangeTitle}
          inputContent={'질문을 수정하세요.'}
          // setContent={setContent}
          handleButtonClick={handlePatch}
          buttonContent={'Submit your Question'}
        ></InputForm>
      </EditContainer>
      <Footer></Footer>
    </>
  );
};
export default EditQuestion;
