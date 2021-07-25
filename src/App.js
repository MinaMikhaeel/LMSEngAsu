import logo from "./logo.svg";
import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/login";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Student from "./components/Students/student";
import CourseId from "./components/Students/EachCourse/courseid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Adding from "./components/admin/adding";
import Addinginst from "./components/admin/addingIns";
import AddingCourse from "./components/admin/addingCourse";
import Viewer from "./components/EachCourse/contents/viewer";
import AddAdmin from "./components/admin/AddAdmin";
import StudentInfo from "./components/admin/Info/StudentInfo";
import { useState } from "react";
import { connect } from "react-redux";
import useWindowSize from "./utiles/useWindowSize";

const App = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     token: null,
  //     user: {
  //       code: null,
  //       email: null,
  //       name: null,
  //       role: null,
  //     },
  //   };
  // }

  // localStorage.getItem("user") != null
  // ? this.setState({
  //     token: JSON.parse(localStorage.getItem("user") || "[]").token,
  //     user: {
  //       code: JSON.parse(localStorage.getItem("user") || "[]").user.code,
  //       email: JSON.parse(localStorage.getItem("user") || "[]").user
  //         .email,
  //       name: JSON.parse(localStorage.getItem("user") || "[]").user.name,
  //       role: JSON.parse(localStorage.getItem("user") || "[]").user.role,
  //     },
  //   })
  // : this.setState({
  //     token: null,
  //     user: {
  //       code: null,
  //       email: null,
  //       name: null,
  //       role: null,
  //     },
  //   });

  // componentDidMount() {
  //   setTimeout(() => {
  //     localStorage.getItem("user") != null
  //       ? this.setState({
  //           token: JSON.parse(localStorage.getItem("user") || "[]").token,
  //           user: {
  //             code: JSON.parse(localStorage.getItem("user") || "[]").user.code,
  //             email: JSON.parse(localStorage.getItem("user") || "[]").user
  //               .email,
  //             name: JSON.parse(localStorage.getItem("user") || "[]").user.name,
  //             role: JSON.parse(localStorage.getItem("user") || "[]").user.role,
  //           },
  //         })
  //       : this.setState({
  //           token: null,
  //           user: {
  //             code: null,
  //             email: null,
  //             name: null,
  //             role: null,
  //           },
  //         });
  //   }, 1);
  // }
  // return this.state.token == null ? (
  //   <Login />
  // ) : (
  return (
    <div >
      <Router>
        <Route exact path={"/"}>
          <Login />
        </Route>
        {props.role == "admin" ? (
          <Switch>
            <Route exact path={"/student"}>
              <Adding props={props} />
            </Route>
            <Route exact path={"/addCourse"}>
              <AddingCourse props={props} />
            </Route>
            <Route exact path={"/addInstructoor"}>
              <Addinginst props={props} />
            </Route>
            <Route exact path={"/addAdmin"}>
              <AddAdmin props={props} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path={"/student"}>
              <Student props={props} />
            </Route>
            <Route exact path={"/student/:id"}>
              <CourseId props={props} />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    authError: state.user.authError,
    token: state.user.token,
    name: state.user.name,
    email: state.user.email,
    role: state.user.role,
    code: state.user.code,
  };
};

export default connect(mapStateToProps, null)(App);
