import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const QuestionList = ({ _data }) => {
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
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setdata(_data);
    setLoading(false);
  }, []);

  return (
    <>
      {!isLoading ? (
        data.map((it) => (
          <Link to={`/questions/${it.questionId}`}>
            <Question>
              {it.title}
              <div>{it.create_date}</div>
              <div>{it.memberId}</div>
            </Question>
          </Link>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};

export default QuestionList;
