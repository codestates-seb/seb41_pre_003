import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 30px;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 20px;
  background-size: cover; /*<-- background size */
  background-position: center; /*<-- background position */
  background-image: ${(props) =>
    `url("https://picsum.photos/seed/${props.memberId}/400/400.webp")`};
  > div {
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    div {
      margin-top: 4px;
    }
    > div:first-child {
      color: var(--blue);
      font-weight: bold;
      font-size: 33px;
    }
  }
`;

const NavTabContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const NavTab = styled(Link)`
  text-decoration: none;
  width: 150px;
  height: 40px;
  background-color: ${(props) =>
    decodeURI(props.path) === decodeURI(props.to) ? 'var(--orange)' : 'white'};
  color: ${(props) =>
    decodeURI(props.path) === decodeURI(props.to) ? 'white' : 'black'};
  border-radius: 20px;
  display: ${(props) => (props.isLogin ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  transition: 0.2s ease-in-out;
  &:hover {
    filter: brightness(85%);
    transition: 0.2s ease-in-out;
  }
`;

const UserHeader = ({ data }) => {
  // TODO: 로그인된 멤버아이디와 회원정보페이지의 멤버아이디가 같아야만 Setting 탭이 활성화.
  const loginId = Number(localStorage.getItem('memberId'));
  const { memberId, name, email, gender, age } = data;
  const { pathname: path } = useLocation();

  return (
    <MainContainer>
      <ImgContainer memberId={memberId}>
        <div>
          <div>{name}</div>
          <div>Contact: {email}</div>
          <div>{gender}</div>
          <div>{age} years old</div>
        </div>
      </ImgContainer>
      <NavTabContainer>
        <NavTab to={`/users/${memberId}/${name}`} isLogin={true} path={path}>
          Profile
        </NavTab>
        <NavTab
          to={`/users/edit/${memberId}`}
          isLogin={memberId === loginId}
          path={path}
        >
          Setting
        </NavTab>
      </NavTabContainer>
    </MainContainer>
  );
};

export default UserHeader;
