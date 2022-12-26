import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
// import/no-named-as-default
import styled from 'styled-components';
import MidTitle from '../Component/MidTitle';
import QuestionList from '../Component/QuestionList';

const Questions = () => {
  const MainContainer = styled.section`
    width: 100%;
    height: auto;
    padding: 20px;
    margin-top: var(--top-bar-allocated-space);
  `;
  return (
    <>
      <Header />
      <main>
        <Nav />
        <MainContainer>
          <MidTitle title="All Questions" />
          <QuestionList></QuestionList>
        </MainContainer>
      </main>
      <Footer />
    </>
  );
};

export default Questions;
