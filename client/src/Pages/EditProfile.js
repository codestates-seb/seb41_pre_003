import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import SettingsNav from '../Component/SettingsNav';
import SettingsTitle from '../Component/SettingsTitle';
import Loading from '../Component/Loading';
import UserHeader from '../Component/UserHeader';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SettingsContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: var(--top-bar-allocated-space);
  display: flex;
`;

const Settings = styled.div`
  width: 100%;
  margin-left: 20px;
`;

const EditTable = styled.form`
  table {
    margin-bottom: 20px;
    tr {
      display: flex;
      align-items: center;
      font-size: 17px;
      height: 30px;
      margin-bottom: 10px;
      > td:first-child {
        width: 150px;
        text-align: right;
        padding-right: 20px;
      }
      > td:nth-child(2) {
        margin-right: 20px;
      }
      input {
        border: none;
        outline: 1px solid var(--gray);
        height: 30px;
        font-size: 17px;
        padding: 5px;
        &:focus {
          outline: 1px solid var(--blue);
          box-shadow: 0px 0px 5px 5px #d9eaf7;
        }
      }
      select {
        font-size: 17px;
      }
    }
  }
`;

const EditItem = styled.input``;

const EditGender = styled.select``;

const AlertMsg = styled.span`
  color: ${(props) => (props.isValid ? 'var(--green)' : 'var(--orange)')};
  font-weight: bold;
`;

const UpdateButton = styled.button`
  text-decoration: none;
  border-radius: 12px;
  background-color: var(--blue);
  color: white;
  padding: 13px 20px;
  margin: 0px 15px 30px 0px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  transition: 0.2s ease-in-out;
  &:not(:disabled)&:hover {
    background-color: #0074cc;
    cursor: pointer;
    box-shadow: inset 0 0 10px #00457a;
    transition: 0.2s ease-in-out;
  }
  &:disabled {
    background-color: #b5dfff;
    transition: 0.2s ease-in-out;
  }
`;

const CancelButton = styled.button`
  text-decoration: none;
  border-radius: 12px;
  padding: 13px 20px;
  margin-right: 15px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  transition: 0.2s ease-in-out;
  background-color: #b5dfff;
  color: var(--black);
  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 10px #00457a;
    transition: 0.2s ease-in-out;
  }
`;

const EditProfile = () => {
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [pw, setPW] = useState();
  const [validPW, setValidPW] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();

  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  // TODO: memberId부분은 이후에 로그인 api를 통해 받은 id를 이용할 것.
  const memberId = 1;

  useEffect(() => {
    axios
      .get(`/members/${memberId}`)
      .then((res) => {
        const data = res.data;
        setEmail(data.email);
        setName(data.name);
        setGender(data.gender);
        setAge(data.age);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleValidPW = (e) => {
    pw === e.target.value ? setValidPW(true) : setValidPW(false);
  };

  const updateAccount = (e) => {
    e.preventDefault();
    axios
      .patch(`/members/${memberId}`, {
        pw,
        name,
        gender,
        age,
      })
      .then(() => {
        navigate(`/users/${memberId}/${name}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelUpdate = (e) => {
    e.preventDefault();
    navigate(`/users/${memberId}/${name}`);
  };

  // const validCheck = (password) => {
  //   if (!/^[a-zA-Z0-9]{10,15}$/.test(password)) {
  //     alert('숫자와 영문자 조합으로 10~15자리를 사용해야 합니다.');
  //     return false;
  //   }

  //   var checkNumber = password.search(/[0-9]/g);
  //   var checkEnglish = password.search(/[a-z]/gi);

  //   if (checkNumber < 0 || checkEnglish < 0) {
  //     alert('숫자와 영문자를 혼용하여야 합니다.');
  //     return false;
  //   }

  //   if (/(\w)\1\1\1/.test(password)) {
  //     alert('444같은 문자를 4번 이상 사용하실 수 없습니다.');
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <>
      <Header />
      <main>
        <Nav />
        <SettingsContainer>
          <SettingsNav path={path} memberId={memberId} />
          <Settings>
            <SettingsTitle title="Edit your profile" />
            <UserHeader memberId={memberId} name={name} />
            {!isLoading ? (
              <EditTable onSubmit={updateAccount}>
                <table>
                  <tbody>
                    <tr>
                      <td>이메일</td>
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="password">패스워드</label>
                      </td>
                      <td>
                        <EditItem
                          required
                          id="password"
                          type="password"
                          value={pw}
                          onChange={(e) => setPW(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="confirm-pw">패스워드 확인</label>
                      </td>
                      <td>
                        <EditItem
                          required
                          id="confirm-pw"
                          type="password"
                          onChange={handleValidPW}
                        />
                      </td>
                      <td>
                        <AlertMsg hidden={validPW} isValid={validPW}>
                          패스워드가 일치하지 않습니다
                        </AlertMsg>
                        <AlertMsg hidden={!validPW} isValid={validPW}>
                          일치합니다!
                        </AlertMsg>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="name">이름</label>
                      </td>
                      <td>
                        <EditItem
                          value={name}
                          id="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="gender">성별</label>
                      </td>
                      <td>
                        <EditGender
                          id="gender"
                          onChange={(e) => setGender(e.target.value)}
                          value={gender}
                        >
                          <option value="m">Male</option>
                          <option value="f">Female</option>
                          <option value="n">Not Specified</option>
                        </EditGender>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="age">나이</label>
                      </td>
                      <td>
                        <EditItem
                          type="number"
                          id="age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <UpdateButton type="submit" disabled={!validPW}>
                  Save profile
                </UpdateButton>
                <CancelButton onClick={cancelUpdate}>Cancel</CancelButton>
              </EditTable>
            ) : (
              <Loading />
            )}
          </Settings>
        </SettingsContainer>
      </main>
      <Footer />
    </>
  );
};

export default EditProfile;
