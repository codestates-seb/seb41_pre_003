/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 30px;

  section {
    font-size: 50px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    img:first-child {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-position: center;
      object-fit: cover;
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
  margin-top: 50px;
`;

const NavTab = styled(Link)`
  text-decoration: none;
  width: 150px;
  height: 50px;
  background-color: var(--orange);
  border: 1px solid #ffb951;
  border-radius: 25px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 5px 5px 5px 5px gray;
  margin-right: 40px;
  &:hover {
    filter: brightness(85%);
    transition: 0.2s ease-in-out;
  }
`;

const LogoImg = styled.img`
  width: 300px;
`;

const UserHeader = ({ id, name }) => {
  return (
    <MainContainer>
      <section>
        <img src={`https://picsum.photos/seed/${id}/200/200`}></img>
        <div>{name}</div>
        <LogoImg src={logo}></LogoImg>
      </section>
      <FlexBox>
        <NavTab to={`/users/${id}/${name}`}>Profile</NavTab>
        <NavTab to={`/users/edit/${id}`}>Setting</NavTab>
      </FlexBox>
    </MainContainer>
  );
};

export default UserHeader;
