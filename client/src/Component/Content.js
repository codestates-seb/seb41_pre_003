import UserItem from '../Component/UserItem';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContentContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  padding: 10px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

const MiniContent = styled.div`
  width: 100%;
  padding: 15px;
  height: auto;
  min-height: 200px;
  border-radius: 10px;
  background-color: var(--light-gray);
`;

const ButtonContainer = styled.div`
  width: 200px;

  button {
    border: none;
    margin: 10px;
    padding: 10px;
    height: 40px;
    width: 80px;
    border-radius: 10px;
  }
`;

const UserItemContainer = styled.div`
  margin-left: auto;
`;

const Content = ({ data, handleDelete }) => {
  let token = localStorage.getItem('AccessToken');
  let memberId = localStorage.getItem('memberId');
  console.log('data.memberId: ', data.memberId);
  console.log('type of memberId: ', typeof memberId);
  console.log('type of data.memberId: ', typeof data.memberId);
  const navigate = useNavigate();

  const handleDeleteAnswer = () => {
    {
      confirm('삭제하시겠습니까?') === true
        ? axios
            .delete(`/questions/${data.questionId}/answers/${data.answerId}`, {
              headers: {
                Authorization: `${localStorage.getItem('AccessToken')}`,
                Refresh: `${localStorage.getItem('RefreshToken')}`,
              },
            })
            .then((res) => {
              console.log(res);
              navigate(`/questions`);
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
