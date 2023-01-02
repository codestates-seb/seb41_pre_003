import UserItem from '../Component/UserItem';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ContentContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  > div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const MiniContent = styled.div`
  width: 100%;
  padding: 15px;
  min-height: 200px;
  border-radius: 10px;
  background-color: var(--light-gray);
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  /* width: 200px; */

  button {
    border: none;
    padding: 10px;
    height: 40px;
    width: 100px;
    border-radius: 10px;
    transition: 0.2s ease-in-out;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
      filter: brightness(85%);
      transition: 0.2s ease-in-out;
    }
  }
`;

const UserItemContainer = styled.div`
  margin-left: auto;
  margin-top: 10px;
`;

const TagsContainer = styled.div`
  button {
    margin-right: 10px;
  }
`;

const Tag = styled(Link)`
  text-decoration: none;
  background-color: #e2ecf5;
  color: #487698;
  border-radius: 5px;
  padding: 7px;
  border: none;
  margin-right: 10px;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #d0e3f1;
    transition: 0.2s ease-in-out;
  }
`;

const Content = ({ data, handleDelete }) => {
  let token = localStorage.getItem('AccessToken');
  let memberId = localStorage.getItem('memberId');
  const navigate = useNavigate();
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags`)
      .then((res) => {
        const obj = res.data.reduce((result, element) => {
          result[element.tagName] = element.tagId;
          return result;
        }, {});
        setTagList(obj);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteAnswer = () => {
    {
      confirm('삭제하시겠습니까?') === true
        ? axios
            .delete(
              `${process.env.REACT_APP_API_URL}/questions/${data.questionId}/answers/${data.answerId}`,
              {
                headers: {
                  Authorization: `${localStorage.getItem('AccessToken')}`,
                  Refresh: `${localStorage.getItem('RefreshToken')}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              navigate(`/questions/${data.questionId}`);
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            })
        : '';
    }
  };

  return (
    <>
      <ContentContainer>
        <MiniContent>{data.content}</MiniContent>
        <TagsContainer>
          {data.tagList !== undefined
            ? data.tagList.map((t, i) => (
                <Tag key={`tag${i + 1}`} to={`/tags/${tagList[t]}/${t}`}>
                  {`#${t}`}
                </Tag>
              ))
            : ''}
        </TagsContainer>
        <div>
          {token && Number(memberId) === data.memberId ? (
            <ButtonContainer>
              {data.answerId === undefined ? (
                <Link to={`/questions/edit/${data.questionId}`}>
                  <button>edit</button>
                </Link>
              ) : (
                <Link
                  to={`/questions/${data.questionId}/answers/edit/${data.answerId}`}
                >
                  <button>edit</button>
                </Link>
              )}
              {data.answerId === undefined ? (
                <button onClick={handleDelete} type="button">
                  delete
                </button>
              ) : (
                <button onClick={handleDeleteAnswer} type="button">
                  delete
                </button>
              )}
            </ButtonContainer>
          ) : (
            ''
          )}
          <UserItemContainer>
            <UserItem memberId={data.memberId}></UserItem>
          </UserItemContainer>
        </div>
      </ContentContainer>
    </>
  );
};
export default Content;
