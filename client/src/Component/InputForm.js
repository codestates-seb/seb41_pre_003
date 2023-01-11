import ToastEditor from './ToastEditor';
import Button from './Button';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MainContainer = styled.div`
  form {
    > div {
      border-radius: 10px;
      border: 1px solid var(--gray);
      padding: 30px;
      margin: 10px;
      > div {
        margin-bottom: 10px;
      }
    }
  }

  input {
    width: 100%;
    height: 40px;
    border: none;
    outline: 2px solid var(--gray);
    transition: 0.2s ease-in-out;
    font-size: 18px;
    padding: 5px 10px;
    &:focus {
      outline: 2px solid var(--blue);
      transition: 0.2s ease-in-out;
    }
  }

  > div:last-child {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      margin: 10px 10px 30px 10px;
    }
  }
`;

const TagContainer = styled.div`
  border-radius: 10px;
  border: 1px solid var(--gray);
  padding: 30px;
  margin: 10px;
  > div:first-child {
    margin-bottom: 10px;
  }
  > div:last-child {
    display: flex;
    align-items: center;
    height: 50px;
  }
`;

const AutoCompleteBox = styled.div`
  position: relative;
  width: 100%;
  &:focus-within {
    div {
      display: block;
    }
  }
`;

const Tag = styled.div`
  background-color: #e2ecf5;
  color: #487698;
  border-radius: 5px;
  padding: 10px;
  height: 35px;
  margin-right: 10px;
  white-space: nowrap;
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    margin-left: 5px;
    border: none;
    background-color: #e2ecf5;
    padding: 0px 3px;
    transition: 0.2s ease-in-out;
    color: #487698;
    &:hover {
      cursor: pointer;
      outline: 1px solid #487698;
      transition: 0.2s ease-in-out;
    }
  }
`;

const DropDownList = styled.div`
  list-style: none;
  padding: 0;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  display: none;
  button {
    width: 100%;
    text-align: left;
    white-space: nowrap;
    padding: 10px;
    margin-bottom: 2px;
    border: 1px solid var(--gray);
    border-radius: 5px;
    background-color: white;
    transition: 0.2s ease-in-out;
    &:nth-child(${(props) => props.selectedTagNum}),
    &:hover {
      cursor: pointer;
      background-color: var(--light-gray);
      font-weight: bold;
      transition: 0.2s ease-in-out;
    }
  }
`;

// const TagForm = styled.form`
//   border: 2px solid var(--gray);
//   border-radius: 5px;
//   height: 35px;
//   display: flex;
//   align-items: center;
//   margin: 0px 10px 10px 0px;
//   i {
//     margin: 0px 5px;
//   }
//   input {
//     outline: none;
//     border: none;
//     outline: none;
//     width: 120px;
//     height: 30px;
//     font-size: 15px;
//     &:focus {
//       outline: none;
//     }
//   }
// `;

const InputForm = ({
  title,
  handleChangeTitle,
  inputContent,
  content,
  setContent,
  // tags, setTags는 선택된 태그들을 의미
  tags,
  setTags,
  handleButtonClick,
  buttonContent,
}) => {
  // const [allTagList, setAllTagList] = useState([]);
  // const [newTag, setNewTag] = useState('');
  const [tag, setTag] = useState('');
  const [searchTagList, setSearchTagList] = useState([]);
  const [selectedTagNum, setSelectedTagNum] = useState(1);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/tags`)
  //     .then((res) => {
  //       setAllTagList(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    // 검색어가 없다면 드롭다운을 없애고 있을때만 드롭다운
    tag === ''
      ? setSearchTagList([])
      : axios
          .get(`${process.env.REACT_APP_API_URL}/tags/search?keyword=${tag}`)
          .then((res) => {
            if (res.data.length === 0) {
              setSearchTagList([{ tagId: -1, tagName: `Enter to add ${tag}` }]);
              setSelectedTagNum(1);
            } else {
              setSearchTagList(res.data);
              setSelectedTagNum(1);
            }
          })
          .catch((err) => console.log(err));
  }, [tag]);

  // const updateTag = (e, t) => {
  //   e.preventDefault();
  //   const tagIdList = tags.map((e) => e.tagId);
  //   // TODO: tags에 없다면 tag추가
  //   if (!tagIdList.includes(t.tagId)) setTags([...tags, t]);
  //   // TODO: tags에 있다면 tag제거
  //   else {
  //     setTags(tags.filter((e) => e.tagId !== t.tagId));
  //   }
  // };

  // const addNewTag = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_URL}/tags`,
  //       {
  //         tagName: newTag,
  //       },
  //       {
  //         headers: {
  //           Authorization: `${localStorage.getItem('AccessToken')}`,
  //           Refresh: `${localStorage.getItem('RefreshToken')}`,
  //         },
  //       }
  //     )
  //     .then(() => {
  //       // setAllTagList([...allTagList, res.data]);
  //       setNewTag('');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const addTagByEnter = (e) => {
    e.preventDefault();
    if (e.key === 'ArrowUp') {
      selectedTagNum === 1
        ? setSelectedTagNum(searchTagList.length)
        : setSelectedTagNum(selectedTagNum - 1);
    } else if (e.key === 'ArrowDown') {
      selectedTagNum === searchTagList.length
        ? setSelectedTagNum(1)
        : setSelectedTagNum(selectedTagNum + 1);
    } else if (e.key === 'Enter') {
      // 이미 선택한 태그에 있는지 확인하는 함수
      const exists = (tag, arr) => {
        let answer = false;
        arr.forEach((e) => {
          if (e.tagId === tag.tagId) answer = true;
        });
        return answer;
      };

      // 아직 등록되지 않은 태그라면 post로 생성 후 추가
      searchTagList[selectedTagNum - 1].tagId === -1
        ? axios
            .post(
              `${process.env.REACT_APP_API_URL}/tags`,
              {
                tagName: tag,
              },
              {
                headers: {
                  Authorization: `${localStorage.getItem('AccessToken')}`,
                  Refresh: `${localStorage.getItem('RefreshToken')}`,
                },
              }
            )
            .then((res) => {
              // setAllTagList([...allTagList, res.data]);
              setTags([...tags, res.data]);
            })
            .catch((err) => {
              console.log(err);
            })
        : // 이미 등록된 태그이고 아직 목록에 없으면 tags에 추가
        !exists(searchTagList[selectedTagNum - 1], tags) && tags.length < 5
        ? setTags([...tags, searchTagList[selectedTagNum - 1]])
        : '';
    }
  };

  const addTagByClick = (t) => {
    // 이미 선택한 태그에 있는지 확인하는 함수
    const exists = (tag, arr) => {
      let answer = false;
      arr.forEach((e) => {
        if (e.tagId === tag.tagId) answer = true;
      });
      return answer;
    };

    // 아직 등록되지 않은 태그라면 post로 생성 후 추가
    t.tagId === -1
      ? axios
          .post(
            `${process.env.REACT_APP_API_URL}/tags`,
            {
              tagName: tag,
            },
            {
              headers: {
                Authorization: `${localStorage.getItem('AccessToken')}`,
                Refresh: `${localStorage.getItem('RefreshToken')}`,
              },
            }
          )
          .then((res) => {
            // setAllTagList([...allTagList, res.data]);
            setTags([...tags, res.data]);
          })
          .catch((err) => {
            console.log(err);
          })
      : // 이미 등록된 태그이고 아직 목록에 없으면 tags에 추가
      !exists(t, tags) && tags.length < 5
      ? setTags([...tags, t])
      : '';
  };

  const removeFromTags = (t) => {
    setTags(tags.filter((e) => e.tagId !== t.tagId));
  };

  return (
    <MainContainer>
      <form onSubmit={handleButtonClick}>
        {title !== undefined ? (
          <div>
            <div>Title</div>
            <input
              type="text"
              value={title}
              onChange={handleChangeTitle}
              maxLength="50"
            />
          </div>
        ) : (
          ''
        )}
        <div>
          <div>{inputContent}</div>
          <ToastEditor content={content} setContent={setContent}></ToastEditor>
        </div>
      </form>
      {tags === false ? (
        ''
      ) : (
        <TagContainer>
          <div>Tags (Maximum 5 tags)</div>
          <div>
            {/* {allTagList.map((t) => (
              <Tag
                key={t.tagId}
                onClick={(e) => updateTag(e, t)}
                isAdded={tags.map((e) => e.tagId).includes(t.tagId)}
              >
                {t.tagName}
              </Tag>
            ))}
            <TagForm onSubmit={addNewTag}>
              <i className="fa-solid fa-plus"></i>
              <input
                type="text"
                name="new_tag"
                value={newTag}
                placeholder="Add tag here"
                required
                onChange={(e) => setNewTag(e.target.value.trim())}
              />
            </TagForm> */}
            {tags.map((t) => (
              <Tag key={t.tagId}>
                {t.tagName}
                <button onClick={() => removeFromTags(t)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </Tag>
            ))}
            <AutoCompleteBox>
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value.trim())}
                onKeyUp={addTagByEnter}
                placeholder="Search Tag Here..."
              />
              {searchTagList.length > 0 ? (
                <DropDownList selectedTagNum={selectedTagNum}>
                  {searchTagList.map((t) => (
                    <button key={t.tagId} onClick={() => addTagByClick(t)}>
                      {t.tagName}
                    </button>
                  ))}
                </DropDownList>
              ) : (
                ''
              )}
            </AutoCompleteBox>
          </div>
        </TagContainer>
      )}

      <div>
        <Button
          value={buttonContent}
          type="submit"
          onClick={handleButtonClick}
        ></Button>
      </div>
    </MainContainer>
  );
};

export default InputForm;
