import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PublicRoute from './util/PublicRoute';
// import PrivateRoute from './util/PrivateRoute';
import Home from './Pages/Home';
import Users from './Pages/Users';
import LogIn from './Pages/Login';
import SignUp from './Pages/Signup';
import EditProfile from './Pages/EditProfile';
import DeleteProfile from './Pages/DeleteProfile';
// eslint-disable-next-line import/namespace, import/default, import/no-named-as-default, import/no-named-as-default-member
import UserDetail from './Pages/UserDetail';
import QuestionDetail from './Pages/QuestionDetail';
import Question from './Pages/CreateQuestion';
import Questions from './Pages/Questions';
import EditQuestion from './Pages/EditQuestion';
import EditAnswer from './Pages/EditAnswer';

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
          ></Route>
          <Route path="/questions" element={<Questions />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/users/edit/1"
            element={token !== undefined ? <EditProfile /> : <LogIn />}
          ></Route>
          <Route
            path="/users/delete/1"
            element={token !== undefined ? <DeleteProfile /> : <LogIn />}
          ></Route>
          <Route path="/users/:memberId/:name" element={<UserDetail />}></Route>
          <Route
            path="/questions/:questionId"
            element={<QuestionDetail />}
          ></Route>
          <Route
            path="/questions/ask"
            element={token !== undefined ? <Question /> : <LogIn />}
          />
          <Route
            path="/questions/edit/:questionId"
            element={token !== undefined ? <EditQuestion /> : <LogIn />}
          ></Route>
          <Route
            path="/questions/:questionId/answers/edit/:answerId"
            element={token !== undefined ? <EditAnswer /> : <LogIn />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
