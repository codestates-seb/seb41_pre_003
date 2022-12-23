import styled from 'styled-components';
import miniLogo from '../img/mini-logo.png';
import { Link } from 'react-router-dom';

const FooterBar = styled.footer`
  background-color: var(--black);
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 0px 50px;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: var(--light-gray);
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  h1 {
    font-size: 20px;
  }
`;

const CreatorList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--light-gray);
  div {
    margin-top: 10px;
  }
`;

const Footer = () => {
  return (
    <FooterBar>
      <Logo to="/userdetail">
        <img src={miniLogo} alt="mini logo" />
        <h1>STACK OVERFLOW</h1>
      </Logo>
      <CreatorList>
        Created by 상부3조
        <div>FE: 김응찬 민인애 우하늘</div>
        <div>BE: 김다은 김병수 최지현</div>
      </CreatorList>
    </FooterBar>
  );
};

export default Footer;
