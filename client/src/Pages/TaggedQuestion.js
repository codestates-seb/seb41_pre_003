import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import MidTitle from '../Component/MidTitle';
import ButtonLink from '../Component/ButtonLink';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Component/Pagination';
import QuestionList from '../Component/QuestionList';
import Loading from '../Component/Loading';
import TagRank from '../Component/TagRank';

const MainContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);

  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
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

const TaggedQuestions = () => {
  const { id: tagId, name: tagName } = useParams();
  const [tagList, setTagList] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // TODO: 한 페이지 표시 개수
  const limit = 10;
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/search/tags/${tagId}`)
      .then((res) => {
        const questions = res.data.questionId;
        const getAll = (questions) => {
          const getQs = questions.map((q) =>
            axios
              .get(`${process.env.REACT_APP_API_URL}/questions/${q}`)
              .then((res) => res.data)
              .catch((err) => console.log(err))
          );
          return Promise.allSettled(getQs);
        };

        getAll(questions).then((res) => {
          const result = res.reduce((result, element) => {
            result.push(element.value);
            return result;
          }, []);
          setData(result.sort((a, b) => b.questionId - a.questionId));
          setPage(1);
          setPageCount(Math.ceil(result.length / limit));
          setLoading(false);
        });
      })

      .catch((err) => console.log(err));
  }, [tagId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags`)
      .then((res) => {
        const obj = res.data.reduce((result, element) => {
          result[element.tagName] = element.tagId;
          return result;
        }, {});
        setTagList(obj);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, tagId]);

  return (
    <>
      <Header />
      <main>
        <Nav />
        <MainContainer>
          <div>
            <MidTitle title={`Questions tagged [${tagName}]`} />
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

export default TaggedQuestions;
