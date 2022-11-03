import React from "react";
import AllUsers from "./AllUsers";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import NavBar from "./NavBar";
import NotFound from "./NotFound";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import RemoveUser from "./RemoveUser";

import Login from "./Login";
import Signup from "./Signup";
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};
function AllRoutes() {
  const { isAuthenticated } = useSelector((state) => state.loginReducer);
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
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/remove/:id" element={<RemoveUser />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
