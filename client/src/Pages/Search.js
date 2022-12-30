import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  return (
    <>
      <Header />
      <main>
        <Nav />
        <div />
      </main>
      <Footer />
    </>
  );
};

export default Search;
