import styled from 'styled-components';

const Main = () => {
  const MainContainer = styled.section`
    overflow: scroll;
    width: 100%;
    overflow-x: hidden;
  `;
  const Box = styled.div`
    width: 50px;
    height: 50px;
    background-color: tomato;
    display: block;
  `;
  return (
    <MainContainer>
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
      <Box /> <Box />
      <Box />
      <Box />
      <Box />
      <Box /> <Box />
      <Box />
      <Box />
      <Box />
      <Box /> <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      ※본문 글이 들어가는 자리※
    </MainContainer>
  );
};

export default Main;
