import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

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

const UserItem = ({ memberId }) => {
  const [data, setData] = useState(''); //null

  useEffect(() => {
    axios
      .get(`/members/${memberId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <UserItemContainer>
      {data && (
        <>
          <img
            src={`https://picsum.photos/seed/${data.memberId}/200/200`}
            alt={`avatar of ${data.name}`}
          />
          <UserInfo>
            <UserName to={`/users/${data.memberId}/${data.name}`}>
              {data.name}
            </UserName>
            <div>{data.email}</div>
            <div>{data.gender}</div>
          </UserInfo>
        </>
      )}
    </UserItemContainer>
  );
};

export default UserItem;
