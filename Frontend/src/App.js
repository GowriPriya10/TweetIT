import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login.js'
import './App.css';
import Register from "./components/Register.js";
import Home from "./components/Home.js";
import User from "./components/Users.js";
import Tweet from "./components/Tweets.js";
import Forgot from "./components/ForgotPassword.js";
import { TweetProvider } from './service/TweetContext';

function App() {
  return (
    <TweetProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/users" element={<User />}></Route>
          <Route path="/tweets" element={<Tweet />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
        </Routes>
      </Router>
    </TweetProvider>
  );
}

export default App;
