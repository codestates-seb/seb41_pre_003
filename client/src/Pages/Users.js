import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import MidTitle from '../Component/MidTitle';
import Loading from '../Component/Loading';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UsersContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);

  ul {
    padding: 0;
    margin: 40px 0px;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
`;

const UserItem = styled.li`
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

const Users = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/members')
      .then((res) => {
        const data = Object.values(res.data[0]);
        console.log(res.data[0]);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Nav />
        <UsersContainer>
          <MidTitle title="Users" />
          {!isLoading ? (
            <ul>
              {users.map((data) => (
                <UserItem key={data.memberId}>
                  <img
                    src={`https://picsum.photos/seed/${data.email}/200/200`}
                    alt={`avatar of ${data.name}`}
                  />
                  <UserInfo>
                    <UserName to={`/userdetail/${data.memberId}`}>
                      {data.name}
                    </UserName>
                    <div>{data.email}</div>
                    <div>{data.gender}</div>
                  </UserInfo>
                </UserItem>
              ))}
            </ul>
          ) : (
            <Loading />
          )}
        </UsersContainer>
      </main>
      <Footer />
    </>
  );
};

export default Users;
