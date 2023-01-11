import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import MidTitle from '../Component/MidTitle';
import ButtonLink from '../Component/ButtonLink';
import Loading from '../Component/Loading';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Component/Pagination';
import QuestionList from '../Component/QuestionList';
import { useLocation } from 'react-router-dom';
import TagRank from '../Component/TagRank';

const MainContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);

  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
    > div:first-child {
      span {
        display: block;
        margin-top: 20px;
        font-size: 20px;
      }
    }
  }

  > div:nth-child(2) {
    display: flex;
    justify-content: space-evenly;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;

      h3 {
        width: 100%;
        text-align: left;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid var(--gray);
      }
    }
    aside {
      width: 200px;
      margin-left: 20px;
      position: relative;
    }
  }
`;

const Search = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // TODO: 한 페이지 표시 개수
  const limit = 10;
  const [pageCount, setPageCount] = useState();
  const [tagList, setTagList] = useState([]);

  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const type = params.get('type');
  const keyword = params.get('keyword');
  const condition = type === '1' ? '제목' : type === '2' ? '내용' : '유저';

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/questions/search?type=${type}&keyword=${keyword}`
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
            <div>
              <MidTitle title="Search Results" />
              <span>
                {condition}기준으로 전체질문글에서 <strong>{keyword}</strong>에
                대해 검색한 결과입니다
              </span>
            </div>
            <ButtonLink value="Ask Question" to="/questions/ask" />
          </div>
          <div>
            <ul>
              {!isLoading ? (
                <>
                  <h3>
                    Total{' '}
                    {data.length > 1
                      ? `${data.length} questions`
                      : `${data.length} question`}
                  </h3>
                  {data.slice((page - 1) * limit, page * limit).map((data) => (
                    <QuestionList
                      key={data.quesionId}
                      data={data}
                      tagList={tagList}
                    />
                  ))}
                </>
              ) : (
                <Loading />
              )}
              <Pagination
                pageCount={pageCount}
                active_page={page}
                setPage={setPage}
              />
            </ul>
            <aside>
              <TagRank />
            </aside>
          </div>
        </MainContainer>
      </main>
      <Footer />
    </>
  );
};

export default Search;
