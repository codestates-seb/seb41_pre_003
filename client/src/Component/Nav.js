import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = styled.nav`
  font-size: 20px;
  width: 200px;
  height: auto;
  ul {
    padding: 0;
    margin: 0;
  }
  position: sticky;
  top: var(--top-bar-allocated-space);
  max-height: calc(100vh - var(--top-bar-allocated-space));
`;

const NavList = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  /* margin: 15px 0px 15px 0px; */
  padding: 15px 10px 15px 20px;
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  i {
    margin-right: 10px;
    font-size: medium;
  }
  &:hover {
    color: black;
  }

  background-color: ${(props) =>
    props.to === props.path ? '#f1f2f4' : 'white'};
  color: ${(props) => (props.to === props.path ? 'black' : 'gray')};
  font-weight: ${(props) => (props.to === props.path ? 'bold' : '')};
  border-right: ${(props) =>
    props.to === props.path ? '5px solid var(--orange)' : ''};
`;

const Nav = () => {
  const { pathname: path } = useLocation();
  return (
    <NavigationBar>
      <ul>
        <NavList to="/" path={path}>
          <i className="fa-solid fa-house"></i>
          Home
        </NavList>
        <NavList to="/questions" path={path}>
          <i className="fa-solid fa-comments"></i>
          Questions
        </NavList>
        <NavList to="/users" path={path}>
          <i className="fa-solid fa-user-group"></i>
          Users
        </NavList>
      </ul>
    </NavigationBar>
  );
};

export default Nav;
