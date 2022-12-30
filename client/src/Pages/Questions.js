import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import MidTitle from '../Component/MidTitle';
import ButtonLink from '../Component/ButtonLink';
import Loading from '../Component/Loading';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import timePassed from '../utils/timePassed';
import Pagination from '../Component/Pagination';

const MainContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);

  > div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  table {
    th,
    td {
      margin-left: auto;
      margin-right: auto;
      padding: 10px 20px;
      text-align: center;
      white-space: nowrap;
    }
    th:nth-child(2) {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
    }
    tbody {
      tr:hover {
        transform: scale(1.03, 1.03);
        transition: 0.3s ease-in-out;
      }
      tr:nth-child(odd) {
        background-color: rgba(188, 187, 187, 0.5);
      }
    }
  }
`;

const Title = styled(Link)`
  text-decoration: none;
  color: var(--blue);
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Questions = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // TODO: 한 페이지 표시 개수
  const limit = 10;
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions`)
      .then((res) => {
        // TODO: 최신등록순으로 정렬합니다.
        setData(res.data.sort((a, b) => b.questionId - a.questionId));
        setLoading(false);
        setPage(1);
        setPageCount(Math.ceil(res.data.length / limit));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <>
      <Header />
      <main>
        <Nav />
        <MainContainer>
          <div>
            <MidTitle title="All Questions" />
            <ButtonLink value="Ask Question" to="/questions/ask" />
          </div>
          {!isLoading ? (
            <>
              <TableContainer>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>제목</th>
                      <th>작성자</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .slice((page - 1) * limit, page * limit)
                      .map((data) => (
                        <tr key={data.questionId}>
                          <td>{data.questionId}</td>
                          <td>
                            <Title to={`/questions/${data.questionId}`}>
                              {data.title}
                            </Title>
                          </td>
                          <td>{data.memberId}</td>
                          <td>{`${timePassed(data.create_date)} ago`}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Pagination
                  pageCount={pageCount}
                  active_page={page}
                  setPage={setPage}
                />
              </TableContainer>
            </>
          ) : (
            <Loading />
          )}
        </MainContainer>
      </main>
      <Footer />
    </>
  );
};

export default Questions;
