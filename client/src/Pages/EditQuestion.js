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
  const [tags, setTags] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { questionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}`)
      .then((res) => {
        const data = res.data;
        setTitle(data.title);
        setContent(data.content);
        axios
          .get(`${process.env.REACT_APP_API_URL}/tags`)
          .then((res) => {
            // {tagName: {tagId, tagName, tagCount}} 이렇게 변환
            const tagsList = res.data.reduce((result, element) => {
              result[element.tagName] = element;
              return result;
            }, {});
            setTags(data.tagList.map((e) => tagsList[e]));
            setLoading(false);
          })
          .catch((err) => console.log(err));
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
              tags={tags}
              setTags={setTags}
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
