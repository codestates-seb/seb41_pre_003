/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import Nav from '../Component/Nav';
import user from './../img/user.png';
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { hello } from 'fund';


const MainContainer = styled.section`
  color: black;
  width: 100%;
  height: auto;
  padding-top: 50px;
  margin-top: var(--top-bar-allocated-space);
  display: grid;
  img {
    width: 200px;
    height: 200px;
  }
  section {
    margin-left: 100px;
    font-size: 50px;
    display: flex;
    align-items: center;

    div {
      margin-left: 70px;
      padding-top: 100px;
    }
  }
`;

const Profile = styled.div`
  width: 200px;
  height: 80px;
  background-color: var(--orange);
  border: 1px solid #ffb951;
  border-radius: 30px;
  margin-left: 100px;
  margin-top: 80px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileList = styled.div`
  flex-direction: column;
  height: 500px;
  font-size: 50px;
  border: 1px solid black;
  margin: 30px 30px 30px 30px;
`;
const HellowBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  margin: 0 0 0px 0px ;
  animation-name: hello;
  animation-duration: 3s;
  animation-direction: normal;


  @keyframes hello {
    from {
      opacity: 0;
      top:10px
    }
    to {
      opacity: 1;
      bottom:300px
    }
}
`
const UserDetail = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/members/1')
      .then((res) => res.json())
      .then((myJson) => {
        setdata(myJson);
      });
  }, []);
  return (
    <>
      <Header />
      <main>
        <Nav />
        <MainContainer>
          <section>
            <img src={user}></img>
            <div>{data.name}</div>
            <HellowBox></HellowBox>
          </section>
          <Profile>Profile</Profile>
          <ProfileList>
            <div>성별 : {data.gender}</div>
            <div>나이 : {data.age}</div>
            <div>이메일 : {data.email}</div>
            <div>번호 : {data.phone}</div>
          </ProfileList>
        </MainContainer>
      </main>
      <Footer />
    </>
  );
};

export default UserDetail;
