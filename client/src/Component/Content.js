import styled from 'styled-components';

const ContentContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  padding: 10px;

  button {
    border: none;
    margin: 10px;
  }
`;

const MiniContent = styled.div`
  width: 100%;
  padding: 10px;
`;

const Content = () => {
  return (
    <>
      <ContentContainer>
        <MiniContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          consectetur laoreet elit eu varius. Morbi luctus ex ac luctus
          ultricies. Nullam tincidunt non erat vel gravida. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Nunc congue nisi eget ante consectetur, at porta massa
          maximus. Ut consectetur nisi et eros aliquet efficitur sed in mauris.
          Morbi lobortis tortor quis nibh dignissim, eu eleifend sem ultricies.
          Aliquam bibendum a lectus a dignissim.
        </MiniContent>
        <button>edit</button>
        <button>delete</button>
      </ContentContainer>
    </>
  );
};
export default Content;
