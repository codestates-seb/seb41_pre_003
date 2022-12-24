/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
// import { useEffect } from 'react';
import styled from 'styled-components';

const QuestionList = () => {
  const Question = styled.div`
    height: 140px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 50px;
    font-size: 30px;
    display: grid;
    color: #0b96ff;
    width: 1000px;
    margin-bottom: 10px;
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
    fetch('http://localhost:3002/members')
      .then((res) => res.json())
      .then((myJson) => {
        setdata(myJson);
      });
  }, []);
  return (
    <>
      {data.map((it) => (
        <Question>
          {it.content}
          <div>{it.name}</div>
        </Question>
      ))}
    </>
  );
};

export default QuestionList;
