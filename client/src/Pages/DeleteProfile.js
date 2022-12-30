import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import SettingsNav from '../Component/SettingsNav';
import SettingsTitle from '../Component/SettingsTitle';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const SettingsContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
  display: flex;
`;

const Settings = styled.div`
  margin-left: 20px;
  p {
    margin: 20px 0px;
  }
  li {
    padding: 10px;
  }
`;

const CheckBox = styled.div`
  display: flex;
  margin: 30px 0px;
  input {
    margin-right: 15px;
    width: 30px;
    &:hover {
      cursor: pointer;
    }
  }
  label:hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  text-decoration: none;
  border-radius: 12px;
  background-color: #d0393e;
  color: white;
  padding: 13px 20px;
  margin-bottom: 30px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  transition: 0.2s ease-in-out;
  &:not(:disabled) {
    &:hover {
      filter: brightness(85%);
      cursor: pointer;
      transition: 0.2s ease-in-out;
    }
  }
  &:disabled {
    background-color: #e89ca0;
    transition: 0.2s ease-in-out;
  }
`;

const DeleteProfile = () => {
  const [checked, setchecked] = useState(false);
  const { pathname: path } = useLocation();
  // TODO: memberId부분은 이후에 로그인 api를 통해 받은 id를 이용할 것.
  const memberId = localStorage.getItem('memberId');
  const navigate = useNavigate();

  const deleteAccount = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/members/${memberId}`)
      .then(() => {
        // TODO: 성공하면 로그아웃
        localStorage.removeItem('AccessToken');
        localStorage.removeItem('RefreshToken');
        localStorage.removeItem('memberId');
        // 홈페이지로 이동
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <main>
        <Nav />
        <SettingsContainer>
          <SettingsNav path={path} memberId={memberId} />
          <Settings>
            <SettingsTitle title="Delete profile" />
            <p>
              Before confirming that you would like your profile deleted, we
              {"'"}d like to take a moment to explain the implications of
              deletion:
            </p>
            <ul>
              <li>
                Deletion is irreversible, and you will have no way to regain any
                of your original content, should this deletion be carried out
                and you change your mind later on.
              </li>
              <li>
                Your questions and anonymized answers will remain on the site,
                but will be disassociated and
                {`(the author will be listed as "user${memberId}")`} and will
                not indicate your authorship even if you later return to the
                site.
              </li>
            </ul>
            <p>
              Confirming deletion will only delete your profile on Stack
              Overflow - it will not affect any of your other profiles on the
              Stack Exchange network. If you want to delete multiple profiles,
              you{"'"}ll need to visit each site separately and request deletion
              of those individual profiles.
            </p>
            <CheckBox>
              <input
                type="checkbox"
                onChange={() => setchecked(!checked)}
                checked={checked}
                id="delete-checkbox"
              />
              <label htmlFor="delete-checkbox">
                I have read the information stated above and understand the
                implications of having my profile deleted. I wish to proceed
                with the deletion of my profile.
              </label>
            </CheckBox>
            <DeleteButton disabled={!checked} onClick={deleteAccount}>
              Delete profile
            </DeleteButton>
          </Settings>
        </SettingsContainer>
      </main>
      <Footer />
    </>
  );
};

export default DeleteProfile;
