import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Users from './Pages/Users';
import LogIn from './Pages/Login';
import SignUp from './Pages/Signup';
import EditProfile from './Pages/EditProfile';
import DeleteProfile from './Pages/DeleteProfile';
import UserDetail from './Pages/UserDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/users/edit/1" element={<EditProfile />}></Route>
          <Route path="/users/delete/1" element={<DeleteProfile />}></Route>
          <Route path="/users/:id/:name" element={<UserDetail />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
