/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
// import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Pagination from 'react-js-pagination';

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
  const PaginationBox = styled.div`
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    ul.pagination li {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 1px solid #e2e2e2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
    }
    ul.pagination li:first-child {
      border-radius: 5px 0 0 5px;
    }
    ul.pagination li:last-child {
      border-radius: 0 5px 5px 0;
    }
    ul.pagination li a {
      text-decoration: none;
      color: #337ab7;
      font-size: 1rem;
    }
    ul.pagination li.active a {
      color: white;
    }
    ul.pagination li.active {
      background-color: #337ab7;
    }
    ul.pagination li a:hover {
      background-color: red;
    }
    ul.pagination li a.active {
      color: blue;
    }
  `;

  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(5);
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    axios
      .get('https://cb63-39-112-152-140.jp.ngrok.io/questions')
      .then((res) => {
        console.log(res);
        const Data = Object.values(res.data);
        setdata(Data);
      })
      .catch((err) => {
        console.log(err);
        setItems(1);
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
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={data.length - 1}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </PaginationBox>
    </>
  );
};

export default QuestionList;
