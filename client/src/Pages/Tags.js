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

const TagsContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);

  p {
    margin: 30px 0px;
    color: #474747;
  }

  ul {
    padding: 0;
    margin: 40px 0px;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }

  > div:first-child {
    margin-bottom: 40px;
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

const TagContainer = styled.li`
  height: 150px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 10px;
  border: 1px solid var(--gray);
  &:hover {
    cursor: default;
  }
`;

const TagButton = styled(Link)`
  text-decoration: none;
  background-color: #e2ecf5;
  color: #487698;
  border-radius: 5px;
  padding: 7px;
  border: none;
  margin-right: 10px;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #d0e3f1;
    transition: 0.2s ease-in-out;
  }
`;

const Tags = () => {
  const [tags, setTags] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // TODO: 한 페이지 표시 개수
  const limit = 12;
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags`)
      .then((res) => {
        const data = res.data;
        //   [
        //     {
        //         "tagId": 1,
        //         "tagName": "JAVA",
        //         "tagCount": 2
        //     },
        //     {
        //         "tagId": 2,
        //         "tagName": "3부상조",
        //         "tagCount": 3
        //     },
        //     {
        //         "tagId": 3,
        //         "tagName": "아루",
        //         "tagCount": 4
        //     }
        // ]
        setTags(data);
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

  const handleFilterTag = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target['keyword'].value;
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags/search?keyword=${name}`)
      .then((res) => {
        setTags(res.data);
        setPage(1);
        setPageCount(Math.ceil(res.data.length / limit));
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
        <TagsContainer>
          <div>
            <MidTitle title="Tags" />
            <p>
              A tag is a keyword or label that categorizes your question with
              other, similar questions. Using the right tags makes it easier for
              others to find and answer your question.
            </p>
          </div>
          <Filter onSubmit={handleFilterTag}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input placeholder="Filter by tag name" name="keyword" />
          </Filter>
          {!isLoading ? (
            <>
              <ul>
                {tags.slice((page - 1) * limit, page * limit).map((data) => (
                  <TagContainer key={data.tagId}>
                    <TagButton to={`/tags/${data.tagId}/${data.tagName}`}>
                      {data.tagName}
                    </TagButton>
                    {data.tagCount > 1
                      ? `${data.tagCount} questions`
                      : `${data.tagCount} question`}
                  </TagContainer>
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
        </TagsContainer>
      </main>
      <Footer />
    </>
  );
};

export default Tags;
