import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import react, { useState, useEffect } from "react";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { addNewTask, getTasks } from "../redux/appReducer/appAction";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { addUser } from "../Service/api";
import { useNavigate } from "react-router-dom";
import style from "../Component/Css/addUser.css";

function reducer(state, action) {
  switch (action.type) {
    case "studentName":
      return {
        ...state,
        studentName: action.payload,
      };
    case "classNo":
      return {
        ...state,
        classNo: action.payload,
      };
    case "result":
      return {
        ...state,
        result: action.payload,
      };
    case "score":
      return {
        ...state,
        score: action.payload,
      };
    case "grade":
      return {
        ...state,
        grade: action.payload,
      };
    default: {
      return state;
    }
  }
}

const initialState = {
  studentName: "",
  classNo: "",
  result: "",
  score: "",
  grade: "",
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    backgroundcolor:green;
    & > div {
        margin-top: 20px;
`;

export default function AddUser() {
  const [state, setter] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);

  const handleAddNewTask = () => {
    dispatch(addNewTask(state)).then((r) => {
      dispatch(getTasks());
    });
    state.studentName = "";
    state.classNo = "";
    state.result = "";
    state.score = "";
    state.grade = "";
    handleClose();
  };

  let navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const xyz = (x) => {
    if (+x >= 30) {
      console.log(x, "napass");
      return true;
    } else {
      console.log(x, "pass");
      return false;
    }
  };

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Container
          className="containerstyle"
          style={{
            margin: "auto",
            backgroundColor: "#FFFFFF",
            padding: "20px",
            borderRadius: "20px",
            width: "480px",
            height: "500px",
            // left: "480px",
            left: "480px",
            marginTop: "40px",
          }}
        >
          <Typography variant="h4">Add Student</Typography>
          <FormControl>
            <InputLabel htmlFor="my-input">Student Name</InputLabel>
            <Input
              name="studentName"
              value={state.studentName}
              onChange={(e) => {
                setter({ type: "studentName", payload: e.target.value });
              }}
              id="my-input"
              required
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Class</InputLabel>
            <Input
              name="classNo"
              value={state.classNo}
              onChange={(e) => {
                setter({ type: "classNo", payload: e.target.value });
              }}
              id="my-input"
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">Score</InputLabel>
            <Input
              name="score"
              value={state.score}
              onChange={(e) => {
                setter({ type: "score", payload: e.target.value });
              }}
              id="my-input"
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">Result</InputLabel>
            <br />
            <div style={{ border: "0px solid red" }}>
              <p style={{ border: "0px solid green", width: "70px" }}>
                {xyz(+state.score) ? (
                  <div className="pass">Passed</div>
                ) : (
                  <div className="fail">Failed</div>
                )}
              </p>
            </div>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">Grade</InputLabel>
            <br />
            <div style={{ border: "0px solid red" }}>
              <p style={{ border: "0px solid green", width: "70px" }}>
                {xyz(+state.score) ? (
                  <div className="ave">
                    <p style={{ color: "#2CA4D8" }}>Average</p>
                  </div>
                ) : (
                  <div className="poo">
                    <p style={{ color: "#F24643" }}>Poor</p>
                  </div>
                )}
              </p>
            </div>
          </FormControl>

          <div style={{ display: "flex", marginLeft: "auto", gap: "5px" }}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Cancle
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddNewTask()}
            >
              Confirm
            </Button>
          </div>
        </Container>
      </Modal>
    </>
  );
}
