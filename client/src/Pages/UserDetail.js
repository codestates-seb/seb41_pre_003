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
  color: black;
  width: 100%;
  height: auto;
  padding-top: 50px;
  margin-top: var(--top-bar-allocated-space);
  position: relative;
  display: grid;
  img:first-child {
    width: 200px;
    height: 200px;
  }
  section {
    margin-left: 100px;
    font-size: 50px;
    width: 100%;
    display: flex;
    div {
      margin-left: 70px;
      padding-top: 100px;
    }
    img {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
`;

const Button = styled.div`
  width: 200px;
  height: 80px;
  background-color: var(--orange);
  border: 1px solid #ffb951;
  border-radius: 30px;
  margin-left: 30px;
  margin-top: 80px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 5px 5px 5px 5px gray;
`;

const ProfileList = styled.div`
  flex-direction: column;
  height: 400px;
  width: 1000px;
  font-size: 40px;
  border: 5px solid var(--orange);
  border-radius: 30px;
  margin: 30px 100px 20px 30px;
  padding: 50px;
  /* background-color: var(--orange); */
  color: black;
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
const LogoImg = styled.img`
  width: 400px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 70px;
  margin-top: 70px;
`;
const UserDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    console.log('memberId : ', params.memberId);
    axios
      .get('/members')
      .then(async (res) => {
        const Data = Object.values(res.data[0]);
        console.log(Data);
        let dataObj = {};
        await Promise.all(
          Data.map((item) => {
            console.log('item', item.memberId);
            console.log('params.memberId', params.memberId);
            if (item.memberId === parseInt(params.memberId)) {
              dataObj = item;
            }
          })
        );
        console.log(dataObj);
        setData(dataObj);
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
            <UserHeader></UserHeader>
            <HellowBox>Wellcome!</HellowBox>
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
