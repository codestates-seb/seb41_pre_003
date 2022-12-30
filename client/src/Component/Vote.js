import styled from 'styled-components';

const VoteContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
`;
const Plus = styled.div`
  width: 10px;
  height: 10px;
  border-bottom: 360px solid #666666;
  border-left: 180px solid transparent;
  border-right: 180px solid transparent;
`;

const Count = styled.div`
  width: auto;
`;

const Minus = styled.div`
  width: 0px;
  height: 0px;
  border-top: 360px solid #666666;
  border-left: 180px solid transparent;
  border-right: 180px solid transparent;
`;

const Vote = ({ count }) => {
  return (
    <>
      <VoteContainer>
        <Plus></Plus>
        <Count>{count}</Count>
        <Minus></Minus>
      </VoteContainer>
    </>
  );
};
export default Vote;
