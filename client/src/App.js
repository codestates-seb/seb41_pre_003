import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Users from './Pages/Users';
import LogIn from './Pages/Login';
import SignUp from './Pages/Signup';
import UserDetail from './Pages/UserDetail';
import EditProfile from './Pages/EditProfile';
import QuestionDetail from './Pages/QuestionDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/userdetail/:memberId" element={<UserDetail />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
          <Route path="/questions/:question_id" element={<QuestionDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
