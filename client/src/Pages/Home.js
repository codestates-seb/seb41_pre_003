import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import MidTitle from '../Component/MidTitle';
import ButtonLink from '../Component/ButtonLink';
import Loading from '../Component/Loading';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import timePassed from '../utils/timePassed';

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
  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  table {
    margin-top: 10px;
    width: 80%;
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
      tr:nth-child(1) {
        background-color: rgba(254, 215, 0, 0.5);
      }
      tr:nth-child(2) {
        background-color: rgba(192, 192, 192, 0.5);
      }
      tr:nth-child(3) {
        background-color: rgba(205, 128, 50, 0.5);
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

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const getName = async (memberId) => {
  //   const memo = {};
  //   const aux = async (memberId) => {
  //     if (memo[memberId] === undefined) {
  //       await axios
  //         .get(`/members/${memberId}`)
  //         .then((res) => (memo[memberId] = res.data.name))
  //         .catch((err) => console.log(err));
  //     }
  //     return memo[memberId];
  //   };
  //   console.log(memo);
  //   return aux(memberId);
  // };

  return (
    <>
      <Header />
      <main>
        <Nav />
        <MainContainer>
          <div>
            <MidTitle title="Top Questions" />
            <ButtonLink value="Ask Question" to="/questions/ask" />
          </div>
          <TableContainer>
            <div>
              <span>※추천 수가 많은 질문부터 순서대로 10개가 표시됩니다※</span>
              {!isLoading ? (
                <table>
                  <thead>
                    <tr>
                      <th>추천수</th>
                      <th>제목</th>
                      <th>작성자</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .slice()
                      .sort((a, b) => b.voteCount - a.voteCount)
                      .slice(0, 10)
                      .map((data) => (
                        <tr key={data.questionId}>
                          <td>{data.voteCount}</td>
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
              ) : (
                <Loading />
              )}
            </div>
            <div>
              <span>※조회 수가 많은 질문부터 순서대로 10개가 표시됩니다※</span>
              {!isLoading ? (
                <table>
                  <thead>
                    <tr>
                      <th>조회수</th>
                      <th>제목</th>
                      <th>작성자</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .slice()
                      .sort((a, b) => b.viewCount - a.viewCount)
                      .slice(0, 10)
                      .map((data) => (
                        <tr key={data.questionId}>
                          <td>{data.viewCount}</td>
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
              ) : (
                <Loading />
              )}
            </div>
          </TableContainer>
        </MainContainer>
      </main>
      <Footer />
    </>
  );
};

export default Home;
