import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PublicRoute from './utils/PublicRoute';
// import PrivateRoute from './utils/PrivateRoute';
import Home from './Pages/Home';
import Users from './Pages/Users';
import LogIn from './Pages/Login';
import SignUp from './Pages/Signup';
import EditProfile from './Pages/EditProfile';
import DeleteProfile from './Pages/DeleteProfile';
import UserDetail from './Pages/UserDetail';
import QuestionDetail from './Pages/QuestionDetail';
import Question from './Pages/CreateQuestion';
import Questions from './Pages/Questions';
import EditQuestion from './Pages/EditQuestion';
import EditAnswer from './Pages/EditAnswer';
import Search from './Pages/Search';

// const isLogin = true;

const setToken = (AccessToken) => {
  localStorage.setItem('token', AccessToken);
};

const getToken = () => {
  localStorage.getItem('token');
};

function App() {
  const token = getToken();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            render={() => <LogIn setToken={setToken} />}
            element={<Home />}
          />
          <Route path="/questions" element={<Questions />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/users/edit/1"
            element={<EditProfile />}
            // element={token ? <EditProfile /> : <LogIn />}
          />
          <Route
            path="/users/delete/1"
            element={token ? <DeleteProfile /> : <LogIn />}
          />
          <Route path="/users/:memberId/:name" element={<UserDetail />} />
          <Route path="/questions/:questionId" element={<QuestionDetail />} />
          <Route
            path="/questions/ask"
            element={token ? <Question /> : <LogIn />}
          />
          <Route
            path="/questions/edit/:questionId"
            element={token ? <EditQuestion /> : <LogIn />}
          />
          <Route
            path="/questions/:questionId/answers/edit/:answerId"
            element={token ? <EditAnswer /> : <LogIn />}
          />
          <Route path="/questions/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
