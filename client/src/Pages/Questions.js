import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
// import/no-named-as-default
import styled from 'styled-components';
import MidTitle from '../Component/MidTitle';
import QuestionList from '../Component/QuestionList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Component/Loading';

const Questions = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get('/questions')
      .then((res) => {
        console.log('여기', res);
        setData(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log('여기2', err);
      });
  }, []);

  const MainContainer = styled.section`
    width: 100%;
    height: auto;
    padding: 20px;
    margin-top: var(--top-bar-allocated-space);
  `;
  return (
    <>
      {!isLoading ? (
        <>
          <Header />
          <main>
            <Nav />
            <MainContainer>
              <MidTitle title="All Questions" />
              <QuestionList _data={data}></QuestionList>
            </MainContainer>
          </main>
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Questions;
