import Header from '../Component/Header';
import Footer from '../Component/Footer';
import Nav from '../Component/Nav';
import styled from 'styled-components';
import UserHeader from '../Component/UserHeader';
import Loading from '../Component/Loading';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import QuestionList from '../Component/QuestionList';
import Pagination from '../Component/Pagination';

const MainContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
  > div:last-child {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px;
    h3 {
      width: 100%;
      border-bottom: 1px solid var(--gray);
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    ul {
      margin: 0;
      padding: 0;
    }
  }
`;

const HelloBox = styled.div`
  margin-top: 20px;
  width: 200px;
  height: 100px;
  background-color: var(--orange);
  border-radius: 30px;
  animation-name: hello;
  animation-duration: 5s;
  animation-direction: alternate;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  font-size: 25px;
  left: -500px;
  box-shadow: 5px 5px 5px 5px var(--gray);
  :after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    bottom: 0;
    left: 50%;
    border: 20px solid transparent;
    border-top-color: var(--orange);
    border-bottom: 0;
    border-left: 0;
    margin-left: -50px;
    margin-bottom: -20px;
  }
  @keyframes hello {
    0% {
      opacity: 0;
      left: 0px;
    }
    50% {
      opacity: 1;
      left: 600px;
    }
    100% {
      opacity: 0;
      left: -200px;
    }
  }
`;

const UserDetail = () => {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { memberId } = useParams();
  const [page, setPage] = useState(1);
  // TODO: 한 페이지 표시 개수
  const limit = 10;
  const [pageCount, setPageCount] = useState();
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`)
      .then((res) => {
        const data = res.data;
        setUserData(data);
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/questions/search?type=3&keyword=${data.name}`
          )
          .then((res) => {
            // TODO: 최신등록순으로 정렬합니다.
            setData(res.data.sort((a, b) => b.questionId - a.questionId));
            setPage(1);
            setPageCount(Math.ceil(res.data.length / limit));
            axios
              .get(`${process.env.REACT_APP_API_URL}/tags`)
              .then((res) => {
                const obj = res.data.reduce((result, element) => {
                  result[element.tagName] = element.tagId;
                  return result;
                }, {});
                setTagList(obj);
                setLoading(false);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
          });
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
        {!isLoading ? (
          <MainContainer>
            <HelloBox>Welcome!</HelloBox>
            <UserHeader data={userData} />
            <div>
              <h3>{userData.name}님이 질문하신 내역입니다</h3>
              <ul>
                {data.slice((page - 1) * limit, page * limit).map((data) => (
                  <QuestionList
                    key={data.quesionId}
                    data={data}
                    tagList={tagList}
                  />
                ))}
                <Pagination
                  pageCount={pageCount}
                  active_page={page}
                  setPage={setPage}
                />
              </ul>
            </div>
          </MainContainer>
        ) : (
          <Loading />
        )}
      </main>
      <Footer />
    </>
  );
};

export default UserDetail;
