import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Tags from './Pages/Tags';
import TaggedQuestion from './Pages/TaggedQuestion';

function App() {
  let token = localStorage.getItem('AccessToken');

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/questions" element={<Questions />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/users/edit/:memberId"
            element={!token ? <LogIn /> : <EditProfile />}
          ></Route>
          <Route
            path="/users/delete/:memberId"
            element={!token ? <LogIn /> : <DeleteProfile />}
          ></Route>
          <Route path="/users/:memberId/:name" element={<UserDetail />}></Route>
          <Route
            path="/questions/:questionId"
            element={<QuestionDetail />}
            token={token}
          ></Route>
          <Route
            path="/questions/ask"
            element={!token ? <LogIn /> : <Question />}
          />
          <Route
            path="/questions/edit/:questionId"
            element={!token ? <LogIn /> : <EditQuestion />}
          ></Route>
          <Route
            path="/questions/:questionId/answers/edit/:answerId"
            element={!token ? <LogIn /> : <EditAnswer />}
          ></Route>
          <Route path="/search" element={<Search />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:id/:name" element={<TaggedQuestion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
