import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Button,
  styled,
  Box,
  Icon,
} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import style from "../Component/Css/allUser.css";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import SchoolSpace from "./SchoolSpace";

import {
  getTasks,
  updateTasks,
  addNewTask,
  deleteTask,
  
} from "../redux/appReducer/appAction";
import { useDispatch, useSelector } from "react-redux";

const StyledTable = styled(Table)`
  width: 100%;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 14px;
    font-family: Montserrat;
    background: #e5e5e5;
    color: #242424;
    fontweight: 500;
    lineheight: "18px";
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 14px;
    font-family: Montserrat;
    background: white;
    color: #242424;
    fontweight: 400;
    lineheight: "18px";
  }
`;

const Boxone = styled("div")({
  backgroundColor: "white",
  height: "auto",
  width: "100%",
});

const ButtonAddUser = styled("button")({
  height: "auto",
  width: "4%",
});

const AllUsers = () => {
  const tasks = useSelector((state) => state.appReducer.tasks);
  console.log("tasks", tasks);
  const isLoading = useSelector((state) => state.appReducer.isLoading);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const hanldeTaskDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(getTasks());
    });
  };

  const xyz = (x) => {
    if (+x >= 30) {
      console.log(x, "pass");
      return true;
    } else {
      console.log(x, "napass");
      return false;
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <SchoolSpace />

          <Box style={{ width: "80%", margin: "15px" }}>
            <Boxone
              variant="contained"
              style={{
                display: "flex",
                justifyContent: "space-between",
                // border: "1px solid red",
              }}
            >
              <div>
                <div
                  style={{
                    position: "absolute",
                    left: "312px",
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#242424",
                  }}
                >
                  Students
                </div>
              </div>

              <Button
                style={{
                  color: "white",
                  width: "110px",
                  height: "42px",
                  backgroundColor: "#2CA4D8",
                  boxShadow: "0px 2px 20px rgba(56, 181, 235, 0.2)",
                  borderRadius: "10px",
                  textAlign: "center",
                  marginBottom: "5px",
                }}
              >
                <Link
                  to="/add"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  + Add
                </Link>
              </Button>
            </Boxone>
            <StyledTable>
              <TableHead
                style={{
                  width: "10%",
                  // border: "2px solid yellow",
                  color: "black",
                  backGroundColor: "white",
                }}
              >
                <THead>
                  <TableCell style={{ width: "10%" }}>Id</TableCell>
                  <TableCell style={{ width: "30%" }}>Student Name</TableCell>
                  <TableCell style={{ width: "30%" }}>Class</TableCell>
                  <TableCell style={{ width: "30%" }}>Result</TableCell>
                  <TableCell style={{ width: "30%" }}>Score</TableCell>
                  <TableCell style={{ width: "30%" }}>Grade</TableCell>
                  <TableCell style={{ width: "30%" }}></TableCell>
                </THead>
              </TableHead>
              <TableBody>
                {tasks.map((user) => (
                  <TRow key={user.id}>
                    <TableCell style={{ width: "10%" }}>{user._id}</TableCell>
                    {/* change it to user.id to use JSON Server */}
                    <TableCell>{user.studentName}</TableCell>
                    <TableCell>{user.classNo}</TableCell>
                    {}
                    <TableCell>
                      {xyz(+user.score) ? (
                        <div className="passed">Passed</div>
                      ) : (
                        <div className="failed">Failed</div>
                      )}
                    </TableCell>
                    <TableCell>{user.score}</TableCell>
                    <TableCell>
                      {xyz(+user.score) ? (
                        <div className="average">
                          <p style={{ color: "#2CA4D8" }}>Average</p>
                        </div>
                      ) : (
                        <div className="poor">
                          <p style={{ color: "#F24643" }}>Poor</p>
                        </div>
                      )}
                    </TableCell>

                    <TableCell>
                      {user.grade}
                      <div style={{ display: "flex", gap: "px" }}>
                        <Button
                          style={{
                            color: "white",
                            textDecoration: "none",
                            backgroundColor: "blue",
                          }}
                        >
                          <Link
                            to={`/edit/${user._id}`}
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            {/* <img src="../Assets/Images/Edit.png" /> */}
                            Edit
                          </Link>
                        </Button>
                        <Button
                          onClick={() => hanldeTaskDelete(user._id)}
                          style={{
                            color: "white",
                            textDecoration: "none",
                            backgroundColor: "red",
                            marginLeft: "10px",
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TRow>
                ))}
              </TableBody>
            </StyledTable>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AllUsers;
