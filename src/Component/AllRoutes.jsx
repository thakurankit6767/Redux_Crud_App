import React from "react";
import AllUsers from "./AllUsers";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import NavBar from "./NavBar";
import NotFound from "./NotFound";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import AuthRequire from "../hoc/AuthRequire";
import Login from "./Login";
import Signup from "./Signup";

function AllRoutes() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<AllUsers />} />
        <Route
          path="/add"
          element={
            <AuthRequire>
              <AddUser />
            </AuthRequire>
          }
        />
        <Route path="/edit/:id" element={<EditUser />} />
       
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
