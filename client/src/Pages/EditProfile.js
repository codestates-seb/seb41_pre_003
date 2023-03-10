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
import validCheck from '../utils/validCheck';

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
        width: 230px;
        &:focus {
          outline: 1px solid var(--blue);
          box-shadow: 0px 0px 5px 5px #d9eaf7;
        }
      }
      select {
        font-size: 17px;
        width: 230px;
        &:focus {
          outline: 1px solid var(--blue);
          box-shadow: 0px 0px 5px 5px #d9eaf7;
        }
      }
    }
  }
`;

const AlertMsg = styled.span`
  color: ${(props) => (props.isValid ? 'var(--green)' : 'var(--orange)')};
  font-weight: bold;
  font-size: 15px;
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
  &:not(:disabled):hover {
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
  const [data, setData] = useState(null);
  const [email, setEmail] = useState(null);
  const [pw, setPW] = useState();
  const [validPW, setValidPW] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();

  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  // TODO: memberId????????? ????????? ????????? api??? ?????? ?????? id??? ????????? ???.
  const memberId = localStorage.getItem('memberId');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`)
      .then((res) => {
        const data = res.data;
        setData(data);
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

  const updateAccount = (e) => {
    e.preventDefault();
    axios
      .patch(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
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

  return (
    <>
      <Header />
      <main>
        <Nav />
        <SettingsContainer>
          <SettingsNav path={path} memberId={memberId} />
          <Settings>
            <SettingsTitle title="Edit your profile" />
            {!isLoading ? (
              <>
                <UserHeader data={data} />
                <EditTable onSubmit={updateAccount}>
                  <table>
                    <tbody>
                      <tr>
                        <td>?????????</td>
                        <td>{email}</td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="password">????????????</label>
                        </td>
                        <td>
                          <input
                            required
                            id="password"
                            type="password"
                            value={pw}
                            onChange={(e) => setPW(e.target.value)}
                          />
                        </td>
                        <td>
                          <AlertMsg
                            isValid={validCheck(pw) === '???????????? ??? ????????????!'}
                          >
                            {validCheck(pw)}
                          </AlertMsg>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="confirm-pw">???????????? ??????</label>
                        </td>
                        <td>
                          <input
                            required
                            id="confirm-pw"
                            type="password"
                            onChange={(e) => setValidPW(e.target.value)}
                          />
                        </td>
                        <td>
                          <AlertMsg isValid={pw === validPW}>
                            {pw === validPW
                              ? `???????????????!`
                              : `??????????????? ???????????? ????????????`}
                          </AlertMsg>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="name">??????</label>
                        </td>
                        <td>
                          <input
                            value={name}
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="gender">??????</label>
                        </td>
                        <td>
                          <select
                            id="gender"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="No Comment">
                              Do not want to mention
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="age">??????</label>
                        </td>
                        <td>
                          <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <UpdateButton
                    type="submit"
                    disabled={
                      !(
                        validCheck(pw) === '???????????? ??? ????????????!' &&
                        pw === validPW
                      )
                    }
                  >
                    Save profile
                  </UpdateButton>
                  <CancelButton onClick={cancelUpdate}>Cancel</CancelButton>
                </EditTable>
              </>
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
