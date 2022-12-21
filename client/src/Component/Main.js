import styled from 'styled-components';
import MidTitle from './MidTitle';

const Main = () => {
  const MainContainer = styled.section`
    width: 100%;
    height: auto;
    padding: 20px;
    margin-top: var(--top-bar-allocated-space);
  `;
  const Box = styled.div`
    width: 50px;
    height: 50px;
    background-color: tomato;
    display: block;
  `;
  return (
    <MainContainer>
      <MidTitle title="Top Questions" />
      ※본문 글이 들어가는 자리※
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      ※본문 글이 들어가는 자리※
    </MainContainer>
  );
};

export default Main;
