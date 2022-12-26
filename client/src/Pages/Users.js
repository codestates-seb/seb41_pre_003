import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import MidTitle from '../Component/MidTitle';
import Loading from '../Component/Loading';
import Pagination from '../Component/Pagination';
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

const Filter = styled.form`
  outline: 1px solid var(--gray);
  padding: 10px;
  width: 250px;
  margin-left: 30px;
  i {
    margin-right: 10px;
  }
  input {
    width: 200px;
    border: none;
    height: 30px;
    font-size: 17px;
    padding: 5px;
    &:focus {
      outline: none;
    }
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
  const [page, setPage] = useState(1);
  // TODO: 한 페이지 표시 개수
  const limit = 12;
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    axios
      .get('/members')
      .then((res) => {
        const data = res.data;
        setUsers(data);
        setPage(1);
        setPageCount(Math.ceil(data.length / limit));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleFilterName = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target['keyword'].value;
    axios
      .get('/members')
      .then((res) => {
        const data = res.data;
        const filtered_data = data.filter((el) => el.name.includes(name));
        setUsers(filtered_data);
        setPage(1);
        setPageCount(Math.ceil(filtered_data.length / limit));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <main>
        <Nav />
        <UsersContainer>
          <MidTitle title="Users" />
          <Filter onSubmit={handleFilterName}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input placeholder="Filter by user" name="keyword" />
          </Filter>
          {!isLoading ? (
            <>
              <ul>
                {users.slice((page - 1) * limit, page * limit).map((data) => (
                  <UserItem key={data.id}>
                    <img
                      src={`https://picsum.photos/seed/${data.id}/200/200`}
                      alt={`avatar of ${data.name}`}
                    />
                    <UserInfo>
                      <UserName to={`/users/${data.id}/${data.name}`}>
                        {data.name}
                      </UserName>
                      <div>{data.email}</div>
                      <div>{data.gender}</div>
                    </UserInfo>
                  </UserItem>
                ))}
              </ul>
              <Pagination
                pageCount={pageCount}
                active_page={page}
                setPage={setPage}
              />
            </>
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
