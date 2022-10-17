import React from "react";
import {Routes, Route} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";


const App = () => {
  const user = useSelector(state => state.auth.user);

  if(user){
    return (
      <Routes>
        <Route path="/" element={<Home />} />
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
