import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TagRankingBox = styled.div`
  position: sticky;
  top: calc(var(--top-bar-allocated-space) + 20px);
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #ffecb7;
  h4 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  table {
    text-align: center;
    white-space: nowrap;
    td {
      padding: 5px;
      font-size: 15px;
    }
    i {
      margin-right: 5px;
      display: none;
    }
    tr:nth-child(1) {
      i {
        display: inline-block;
        color: #fed700;
      }
    }
    tr:nth-child(2) {
      i {
        display: inline-block;
        color: #c0c0c0;
      }
    }
    tr:nth-child(3) {
      i {
        display: inline-block;
        color: #cd8032;
      }
    }
  }
`;

const TagRank = () => {
  const [tagRank, setTagRank] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags/right`)
      .then((res) => {
        // [
        //   {
        //     tagId: 3,
        //     tagName: "아루",
        //     tagCount: 3,
        //   },
        //   {
        //     tagId: 2,
        //     tagName: "3부상조",
        //     tagCount: 2,
        //   },
        //   {
        //     tagId: 1,
        //     tagName: "JAVA",
        //     tagCount: 1,
        //   }
        // ];
        setTagRank(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <TagRankingBox>
      <h4>태그 순위</h4>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>태그</th>
            <th>횟수</th>
          </tr>
        </thead>
        <tbody>
          {tagRank.map((data, i) => (
            <tr key={`tagRank-${i + 1}`}>
              <td>
                <i className="fa-solid fa-crown"></i>
                {i + 1}
              </td>
              <td>{data.tagName}</td>
              <td>{data.tagCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TagRankingBox>
  );
};

export default TagRank;
