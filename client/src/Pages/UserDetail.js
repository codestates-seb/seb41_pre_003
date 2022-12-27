/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import Nav from '../Component/Nav';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Component/Loading';
// eslint-disable-next-line import/namespace, import/default, import/no-named-as-default, import/no-named-as-default-member
import UserHeader from '../Component/UserHeader';

const MainContainer = styled.section`
  width: 100%;
  height: auto;
  margin-top: var(--top-bar-allocated-space);
  position: relative;
  display: grid;
  img:first-child {
    width: 200px;
    height: 200px;
  }
  section {
    margin-left: 100px;
    margin-top: 0px;
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
  left: -300px;
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
      left: 600px;
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
const SettingsContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
  display: flex;
`;

const Settings = styled.div`
  width: 100%;
  margin-left: 20px;
`;
const UserDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    axios
      // .get('/members')
      .get('http://localhost:3001/member')
      .then(async (res) => {
        const Data = Object.values(res.data);
        console.log(Data)
        let dataObj = {};
        await Promise.all(
          Data.map((item) => {
            if (item.id === parseInt(params.member_id)) {
              dataObj = item;
            }
          })
        );
        // console.log(dataObj);
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
        <SettingsContainer>
          <Settings>
            <HellowBox>Wellcome!</HellowBox>
            <UserHeader></UserHeader>
            {!loading ? (
              <MainContainer>
                <ProfileList>
                  <ul>
                    <li>이름 : {data.name}</li>
                    <li>성별 : {data.gender}</li>
                    <li>나이 : {data.age}</li>
                    <li>이메일 : {data.email}</li>
                  </ul>
                </ProfileList>
              </MainContainer>
            ) : (
              <Loading />
            )}
          </Settings>
        </SettingsContainer>
      </main>
      <Footer />
    </>
  );
};

export default UserDetail;
