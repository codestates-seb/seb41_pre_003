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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/questions" element={<Questions />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/users/edit/1" element={<EditProfile />}></Route>
          <Route path="/users/delete/1" element={<DeleteProfile />}></Route>
          <Route path="/users/:memberId/:name" element={<UserDetail />}></Route>
          <Route
            path="/questions/:questionId"
            element={<QuestionDetail />}
          ></Route>
          <Route path="/questions/ask" element={<Question />} />
          <Route
            path="/questions/edit/:questionId"
            element={<EditQuestion />}
          ></Route>
          <Route
            path="/questions/:questionId/answers/edit/:answerId"
            element={<EditAnswer />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
