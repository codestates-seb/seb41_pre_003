import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import styled from 'styled-components';

const EditContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
`;

const EditQuestion = () => {
  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <EditContainer></EditContainer>
      <Footer></Footer>
    </>
  );
};
export default EditQuestion;
