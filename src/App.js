import React from "react";
import {Routes, Route} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import NewTask from "./views/NewTask";
import EditTask from './views/EditTask';
import Logout from "./views/Logout";


const App = () => {
  const user = useSelector(state => state.auth.user);

  if(user){
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newtask" element={<NewTask />} />
        <Route path="/edittask/:id" element={<EditTask />} exact />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
}

export default App;
