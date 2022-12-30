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
  padding: 10px;
`;

const ButtonContainer = styled.div`
  width: 200px;

  button {
    border: none;
    margin: 10px;
    height: 40px;
    width: 100px;
  }
`;

const Content = ({ data, handleDelete }) => {
  console.log(data);
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
          <UserItem memberId={data.memberId}></UserItem>
        </div>
      </ContentContainer>
    </>
  );
};
export default Content;
