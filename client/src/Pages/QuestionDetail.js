import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';
import MidTitle from '../Component/MidTitle';
import Button from '../Component/Button';

const QDContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
`;

const QContent = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid red;
`;

const AnswerContainer = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid blue;
`;

const QuestionDetail = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Nav></Nav>
        <QDContainer>
          <MidTitle title="Question 1" />
          <Button value="Ask Question"></Button>
          <QContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            consectetur laoreet elit eu varius. Morbi luctus ex ac luctus
            ultricies. Nullam tincidunt non erat vel gravida. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Nunc congue nisi eget ante consectetur, at porta
            massa maximus. Ut consectetur nisi et eros aliquet efficitur sed in
            mauris. Morbi lobortis tortor quis nibh dignissim, eu eleifend sem
            ultricies. Aliquam bibendum a lectus a dignissim.
          </QContent>
          <button>edit</button>
          <AnswerContainer>
            <p>
              Know someone who can answer? Share a link to this question via
              email, Twitter, or Facebook.
            </p>
            <h2>Your Answer</h2>
            <form action="/answer/:id" method="post">
              <textarea cols="92" rows="15"></textarea>
              <Button value="Post Your Answer"></Button>
            </form>
          </AnswerContainer>
        </QDContainer>
      </main>
      <Footer></Footer>
    </>
  );
};
export default QuestionDetail;
