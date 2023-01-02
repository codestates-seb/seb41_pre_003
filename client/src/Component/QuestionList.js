import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import timePassed from '../utils/timePassed';
import axios from 'axios';

const ListContainer = styled.li`
  display: flex;
  width: 800px;
  background-color: var(--light-gray);
  padding: 20px;
  margin-top: 10px;
  height: 190px;
  font-size: 15px;
  cursor: default;
  transition: 0.2s ease-in-out;
  border-radius: 10px;
  &:hover {
    transition: 0.2s ease-in-out;
    box-shadow: 0px 0px 20px 5px #dfe1e0;
  }

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    width: 15%;
    padding-right: 20px;
    white-space: nowrap;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    i {
      margin-right: 5px;
    }
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 85%;
    p {
      color: var(--black);
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

const Title = styled(Link)`
  text-decoration: none;
  color: var(--blue);
  font-weight: bold;
  font-size: 22px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  &:hover {
    color: #62bbff;
    transition: 0.2s ease-in-out;
  }
`;

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const User = styled(Link)`
  text-decoration: none;
  color: var(--blue);
  font-weight: bold;
  margin-right: 5px;
  display: flex;
  align-items: center;
  transition: 0.2s ease-in-out;
  &:hover {
    color: #62bbff;
    transition: 0.2s ease-in-out;
  }
  img {
    border-radius: 50%;
    margin-right: 2px;
    object-fit: cover;
    object-position: center;
  }
`;

const TagsContainer = styled.div`
  margin-bottom: 10px;
  button {
    margin-right: 10px;
  }
`;

const Tag = styled(Link)`
  text-decoration: none;
  background-color: #e2ecf5;
  color: #487698;
  border-radius: 5px;
  padding: 7px;
  border: none;
  margin-right: 10px;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #d0e3f1;
    transition: 0.2s ease-in-out;
  }
`;

const QuestionList = ({ data, tagList }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/questions/${data.questionId}/answers`
      )
      .then((res) => {
        setAnswers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ListContainer>
      <div>
        <span>
          <i className="fa-regular fa-thumbs-up"></i>
          {data.likeCount}
        </span>
        <span>
          <i className="fa-regular fa-comment-dots"></i>
          {answers.length}
        </span>
        <span>
          <i className="fa-solid fa-eye"></i>
          {data.viewCount}
        </span>
      </div>
      <div>
        <Title to={`/questions/${data.questionId}`}>{data.title}</Title>
        <p>{data.content}</p>
        <TagsContainer>
          {data.tagList.map((t, i) => (
            <Tag key={`tag${i + 1}`} to={`/tags/${tagList[t]}/${t}`}>
              {t}
            </Tag>
          ))}
        </TagsContainer>
        <UserContainer>
          <User to={`/users/${data.memberId}/${data.name}`}>
            <img
              src={`https://picsum.photos/seed/${data.memberId}/20/20.webp`}
              alt={`avatar of ${data.name}`}
            />
            {data.name}
          </User>
          <span>asked {timePassed(data.create_date)} ago</span>
        </UserContainer>
      </div>
    </ListContainer>
  );
};

export default QuestionList;
