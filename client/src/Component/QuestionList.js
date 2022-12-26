/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
// import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const QuestionList = () => {
  const Question = styled.div`
    height: 140px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 50px;
    font-size: 30px;
    display: grid;
    color: #0b96ff;
    width: 900px;
    margin-bottom: 30px;
    background-color: var(--light-gray);
    box-shadow: 5px 5px 5px 5px gray;
    &:hover {
      background-color: white;
    }
    div {
      font-size: 20px;
      display: flex;
      justify-content: end;
      align-items: flex-end;
      color: black;
    }
  `;
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get('/members')
      .then((res) => {
        const Data = Object.values(res.data[0].question[0]);
        console.log(Data);
        setdata(Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {data.map((it) => (
        <Question>
          {it.content}
          <div>{it.memberid}</div>
        </Question>
      ))}
    </>
  );
};

export default QuestionList;
