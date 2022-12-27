/* eslint-disable prettier/prettier */
import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import Main from '../Component/Main';
import { useParams } from 'react-router-dom';

const Search = () => {
  console.log(useParams);

  return (
    <>
      <Header />
      <main>
        <Nav />
        <Main />
      </main>
      <Footer />
    </>
  );
};

export default Search;
