import React, { useState, useEffect } from 'react';
import { Switch, Route, Link} from "react-router-dom"

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"


import AuthService from "./services/auth-service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";


const App = () => {

  const [ showModeratorBoard, setShowModeratorBoard ] = useState(false);
  const [ showAdminBoard, setShowAdminBoard ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if(user){
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));

    }
  }, []);

  const logout = () => {
    AuthService.loguot();
  }

  return (
    <div>
      <nav className="navbar navbar-expand nav-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          LoginApp
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"}>
              Home
            </Link>
          </li>
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/amin"}>
                Admin Board
              </Link>
            </li>
          )}

          {currentUser ? (
            <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                LogOut
              </a>
            </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/user" component={BoardUser}></Route>
          <Route exact path="/mod" component={BoardModerator}></Route>
          <Route exact path="/admin" component={BoardAdmin}></Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;
