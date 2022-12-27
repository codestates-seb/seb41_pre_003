import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import MidTitle from '../Component/MidTitle';
import Loading from '../Component/Loading';
import Pagination from '../Component/Pagination';
import UserItem from '../Component/UserItem';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
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

const Users = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // TODO: 한 페이지 표시 개수
  const limit = 12;
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    axios
      // .get('/member')
      .get('http://localhost:3001/member')
      .then((res) => {
        const data = res.data;
        console.log(res.data);
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
      .get('/member')
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
                  <UserItem data={data} key={data.id} />
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
