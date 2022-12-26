import Header from '../Component/Header';
import Nav from '../Component/Nav';
import Footer from '../Component/Footer';
// import/no-named-as-default
import Main from '../Component/Main';

const Home = () => {
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

export default Home;
