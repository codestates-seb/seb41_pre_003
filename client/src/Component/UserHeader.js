/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import user from './../img/user.png';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Component/Loading';
import logo from '../img/logo.png';

const MainContainer = styled.div`
  color: black;
  width: 100%;
  height: auto;
  /* margin-top: var(--top-bar-allocated-space); */
  position: relative;
  flex-direction: column;

  img:first-child {
    width: 200px;
    height: 200px;
  }
  section {
    font-size: 50px;
    width: 100%;
    display: flex;
    div {
      margin-left: 100px;
      margin-right: 100px;
      padding: 0px;
      display: flex;
      align-items: center;
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
  margin-left: 10px;
  margin-top: 50px;
  padding: 0;
`;

const Setting = styled(Link)`
  width: 150px;
  height: 60px;
  background-color: var(--orange);
  border: 1px solid #ffb951;
  border-radius: 30px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 5px 5px 5px 5px gray;
  margin-left: 20px;
  :hover {
    background-color: #ce800b;
  }
`;
const Profile = styled.div`
  width: 150px;
  height: 60px;
  background-color: var(--orange);
  border: 1px solid #ffb951;
  border-radius: 30px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 5px 5px 5px 5px gray;
  margin-left: 20px;
`;

const LogoImg = styled.img`
  width: 450px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-top: 70px;
`;
const UserHeader = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
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
      {!loading ? (
        <MainContainer>
          <section>
            <img src={user}></img>
            <div>{data.name}</div>
            <LogoImg src={logo}></LogoImg>
          </section>
          <FlexBox>
            <Profile>Profile</Profile>
            <Setting to={'/editprofile/'}>Setting</Setting>
          </FlexBox>
        </MainContainer>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserHeader;
