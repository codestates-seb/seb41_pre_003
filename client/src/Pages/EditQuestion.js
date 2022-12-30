import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import InputForm from '../Component/InputForm';
import Loading from '../Component/Loading';
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setLoading] = useState(true);
  const { questionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePatch = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/questions/${questionId}`,
        {
          title: title,
          content: content,
          memberId: `${localStorage.getItem('memberId')}`,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('AccessToken')}`,
            Refresh: `${localStorage.getItem('RefreshToken')}`,
          },
        }
      )
      .then(() => {
        navigate(`/questions/${questionId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header></Header>
      <main>
        <Nav></Nav>
        <EditContainer>
          {!isLoading ? (
            <InputForm
              title={title}
              handleChangeTitle={(e) => setTitle(e.target.value)}
              inputContent={'질문을 수정하세요.'}
              content={content}
              setContent={setContent}
              handleButtonClick={handlePatch}
              buttonContent={'Submit your Question'}
            ></InputForm>
          ) : (
            <Loading />
          )}
        </EditContainer>
      </main>
      <Footer></Footer>
    </>
  );
};
export default EditQuestion;
