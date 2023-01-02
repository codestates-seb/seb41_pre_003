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
    padding: 5px;
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
    flex-wrap: wrap;
    align-items: center;
    height: auto;
  }
`;

const Tag = styled.button`
  text-decoration: none;
  background-color: ${(props) => (props.isAdded ? '#bbccd8' : '#e2ecf5')};
  box-shadow: ${(props) => (props.isAdded ? 'inset 0 0 10px #929292' : '')};
  color: #487698;
  border-radius: 5px;
  padding: 10px;
  border: none;
  height: 35px;
  margin: 0px 10px 10px 0px;
  white-space: nowrap;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #bbccd8;
    transition: 0.2s ease-in-out;
    cursor: pointer;
  }
`;

const TagForm = styled.form`
  border: 2px solid var(--gray);
  border-radius: 5px;
  height: 35px;
  display: flex;
  align-items: center;
  margin: 0px 10px 10px 0px;
  i {
    margin: 0px 5px;
  }
  input {
    outline: none;
    border: none;
    outline: none;
    width: 120px;
    height: 30px;
    font-size: 15px;
    &:focus {
      outline: none;
    }
  }
`;

const InputForm = ({
  title,
  handleChangeTitle,
  inputContent,
  content,
  setContent,
  tags,
  setTags,
  handleButtonClick,
  buttonContent,
}) => {
  const [tagList, setTagList] = useState([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags`)
      .then((res) => {
        setTagList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateTag = (e, t) => {
    e.preventDefault();
    const tagIdList = tags.map((e) => e.tagId);
    // TODO: tags에 없다면 tag추가
    if (!tagIdList.includes(t.tagId)) setTags([...tags, t]);
    // TODO: tags에 있다면 tag제거
    else {
      setTags(tags.filter((e) => e.tagId !== t.tagId));
    }
  };

  const addNewTag = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/tags`,
        {
          tagName: newTag,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('AccessToken')}`,
            Refresh: `${localStorage.getItem('RefreshToken')}`,
          },
        }
      )
      .then((res) => {
        setTagList([...tagList, res.data]);
        setNewTag('');
      })
      .catch((err) => {
        console.log(err);
      });
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
          <div>Tags</div>
          <div>
            {tagList.map((t) => (
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
            </TagForm>
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
