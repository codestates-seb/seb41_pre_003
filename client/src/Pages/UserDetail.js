/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import Nav from '../Component/Nav';
import user from './../img/user.png';
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Component/Loading';
import logo from '../img/logo.png';
import UserHeader from '../Component/UserHeader';

const MainContainer = styled.section`
  width: 100%;
  height: auto;
  margin-top: var(--top-bar-allocated-space);
  padding: 20px;
`;

const ProfileList = styled.div`
  font-size: 40px;
  border: 5px solid var(--orange);
  border-radius: 30px;
  margin: 30px;
  margin-bottom: 100px;
  /* margin: 30px 100px 20px 30px; */
  padding: 50px;
  box-shadow: 5px 5px 5px 5px gray;
  ul {
    li {
      margin-bottom: 10px;
    }
  }
`;

const HellowBox = styled.div`
  margin-top: 20px;
  width: 200px;
  height: 100px;
  background-color: var(--orange);
  border-radius: 30px;
  animation-name: hello;
  animation-duration: 5s;
  animation-direction: alternate;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  font-size: 25px;
  right: -200px;
  box-shadow: 5px 5px 5px 5px gray;
  :after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    bottom: 0;
    left: 50%;
    border: 20px solid transparent;
    border-top-color: var(--orange);
    border-bottom: 0;
    border-left: 0;
    margin-left: -50px;
    margin-bottom: -20px;
  }
  @keyframes hello {
    0% {
      opacity: 0;
      left: 0px;
    }
    50% {
      opacity: 1;
      left: 500px;
    }
    100% {
      opacity: 0;
      left: -200px;
    }
  }
`;

const UserDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, name } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/members/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Nav />
        {!loading ? (
          <MainContainer>
            {/* <HellowBox>Hello~</HellowBox>
            <section>
              <img src={user}></img>
              <div>{data.name}</div>
              <LogoImg src={logo}></LogoImg>
            </section>
            <FlexBox>
              <Button>Profile</Button>
              <Button>Setting</Button>
            </FlexBox> */}
            <UserHeader id={id} name={name} />
            <HellowBox>Welcome!</HellowBox>
            <ProfileList>
              <ul>
                <li>성별 : {data.gender}</li>
                <li>나이 : {data.age}</li>
                <li>이메일 : {data.email}</li>
              </ul>
            </ProfileList>
          </MainContainer>
        ) : (
          <Loading />
        )}
      </main>
      <Footer />
    </>
  );
};

export default UserDetail;
