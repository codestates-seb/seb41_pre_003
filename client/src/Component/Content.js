import UserItem from '../Component/UserItem';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const UserItemContainer = styled.div`
  /* width: 200px; */
`;

const Content = ({ data, handleDelete }) => {
  return (
    <>
      <ContentContainer>
        <MiniContent>{data.content}</MiniContent>
        <div>
          <ButtonContainer>
            {!data.answer_id ? (
              <Link to={`/questions/edit/${data.question_id}`}>
                <button>edit</button>
              </Link>
            ) : (
              <Link
                to={`/questions/${data.question_id}/answers/edit/${data.answer_id}`}
              >
                <button>edit</button>
              </Link>
            )}
            <button onClick={handleDelete}>delete</button>
          </ButtonContainer>
          <UserItemContainer>
            <UserItem data={data.member_id}></UserItem>
          </UserItemContainer>
        </div>
      </ContentContainer>
    </>
  );
};
export default Content;
