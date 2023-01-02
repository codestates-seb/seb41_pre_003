import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import MidTitle from '../Component/MidTitle';
import ButtonLink from '../Component/ButtonLink';
import Loading from '../Component/Loading';
import { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionList from '../Component/QuestionList';

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

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
`;

const TabContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 60px;
`;

const Tab = styled.button`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px 20px;
  border: none;
  color: ${(props) =>
    props['data-tab'] === props['data-value'] ? 'black' : 'var(--gray)'};
  border-bottom: ${(props) =>
    props['data-tab'] === props['data-value'] ? '5px solid var(--orange)' : ''};
  margin-right: 10px;
  transition: 0.2s ease-in-out;
  &:hover {
    color: black;
    transition: 0.2s ease-in-out;
    cursor: pointer;
  }
  i {
    margin-right: 10px;
  }
`;

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [tab, setTab] = useState('추천수 TOP10');
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions`)
      .then((res) => {
        setData(res.data);
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

  const handleButtonClick = (e) => {
    setTab(e.target.textContent);
    if (e.target.textContent === '추천수 TOP10')
      setData(data.sort((a, b) => b.likeCount - a.likeCount));
    if (e.target.textContent === '조회수 TOP10')
      setData(data.sort((a, b) => b.viewCount - a.viewCount));
  };

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
          <TabContainer>
            <Tab
              onClick={handleButtonClick}
              data-tab={tab}
              data-value="추천수 TOP10"
            >
              <h2>
                <i className="fa-regular fa-thumbs-up"></i>추천수 TOP10
              </h2>
            </Tab>
            <Tab
              onClick={handleButtonClick}
              data-tab={tab}
              data-value="조회수 TOP10"
            >
              <h2>
                <i className="fa-solid fa-eye"></i>조회수 TOP10
              </h2>
            </Tab>
          </TabContainer>
          <ul>
            {!isLoading ? (
              data.slice(0, 10).map((data) => {
                return (
                  <QuestionList
                    key={data.quesionId}
                    data={data}
                    tagList={tagList}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </ul>
        </MainContainer>
      </main>
      <Footer />
    </>
  );
};

export default Home;
