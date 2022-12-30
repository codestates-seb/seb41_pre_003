import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SettingNaviBar = styled.div`
  width: auto;
  padding-right: 20px;
  border-right: 1px solid rgba(128, 128, 128, 0.5);
  font-size: 15px;
  position: relative;
  nav {
    position: sticky;
    h3 {
      padding: 10px;
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
  }
`;

const SettingBtn = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.path === props.to ? 'white' : 'black')};
  background-color: ${(props) =>
    props.path === props.to ? 'var(--orange)' : 'white'};
  border-radius: 15px;
  border: none;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
    filter: brightness(85%);
    transition: 0.2s ease-in-out;
  }
`;

const SettingsNav = ({ memberId, path }) => {
  return (
    <SettingNaviBar>
      <nav>
        <h3>PERSONAL INFORMATION</h3>
        <SettingBtn to={`/users/edit/${memberId}`} path={path}>
          Edit profile
        </SettingBtn>
        <SettingBtn to={`/users/delete/${memberId}`} path={path}>
          Delete profile
        </SettingBtn>
      </nav>
    </SettingNaviBar>
  );
};

export default SettingsNav;
