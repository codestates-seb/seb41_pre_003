import styled from 'styled-components';
import { Link } from 'react-router-dom';

const UserItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  &:hover {
    background-color: var(--light-gray);
    box-shadow: inset 0 0 20px #b7b7b7;
    transition: 0.2s ease-in-out;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-right: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  font-size: 15px;

  .fa-person {
    color: #3f51b5;
  }

  .fa-person-dress {
    color: #ef6191;
  }
`;

const UserName = styled(Link)`
  text-decoration: none;
  color: var(--blue);
  font-weight: bold;
  font-size: 23px;
`;

const UserItem = ({ data }) => {
  return (
    <UserItemContainer>
      <img
        src={`https://picsum.photos/seed/${data.member_id}/200/200`}
        alt={`avatar of ${data.name}`}
      />
      <UserInfo>
        <UserName to={`/users/${data.member_id}/${data.name}`}>
          {data.name}
        </UserName>
        <div>{data.email}</div>
        <div>{data.gender}</div>
      </UserInfo>
    </UserItemContainer>
  );
};

export default UserItem;
