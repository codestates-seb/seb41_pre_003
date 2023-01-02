import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const slidefromleft = keyframes`
0% {
  transform: translateX(-100%);
}
100% {
  transform: translateX(0%);
}
`;

const NavigationBar = styled.nav`
  width: 300px;
  height: auto;
  left: -300px;
  animation: ${slidefromleft} 1s ease-in-out forwards;
  ul {
    position: sticky;
    top: var(--top-bar-allocated-space);
    padding: 0;
    margin: 0;
  }
  border-right: 1px solid rgba(128, 128, 128, 0.5);
`;

const NavList = styled(Link)`
  width: 100%;
  padding: 15px 10px 15px 20px;
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  font-size: 18px;
  i {
    margin-right: 10px;
  }
  &:hover {
    color: black;
    transition: 0.2s ease-in-out;
  }

  background-color: ${(props) =>
    decodeURI(props.path) === decodeURI(props.to) ? '#f1f2f4' : 'white'};
  color: ${(props) =>
    decodeURI(props.path) === decodeURI(props.to) ? 'black' : 'gray'};
  font-weight: ${(props) =>
    decodeURI(props.path) === decodeURI(props.to) ? 'bold' : ''};
  border-right: ${(props) =>
    decodeURI(props.path) === decodeURI(props.to)
      ? '5px solid var(--orange)'
      : ''};
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
        <NavList to="/tags" path={path}>
          <i className="fa-solid fa-tags"></i>
          Tags
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
