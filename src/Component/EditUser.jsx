import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import react, { useReducer, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { getTasks, updateTasks } from "../redux/appReducer/appAction";

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

const style = {
  backgroundColor: "white",
};

export default function EditUser() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const [state, setter] = useReducer(reducer, initialState);
  const tasks = useSelector((state) => state.appReducer.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClose = () => {
    navigate("/");
  };

  useEffect(() => {
    if (tasks) {
      const currentTask = tasks.find((task) => task.id === +id);
      if (currentTask) {
        state.studentName = currentTask.studentName;
        state.classNo = currentTask.classNo;
        state.result = currentTask.result;
        state.score = currentTask.score;
        state.grade = currentTask.grade;
      }
    }
  }, [tasks, id]);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const handleUpdate = () => {
    dispatch(updateTasks(id, state)).then(() => dispatch(getTasks()));
    navigate("/");
  };

  const xyz = (x) => {
    if (+x >= 30) {
      // console.log(x, "napass");
      return true;
    } else {
      //  console.log(x, "pass");
      return false;
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>
        Edit
        <img src="../Assets/Images/Edit.png" />
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Container
          sx={style}
          style={{
            margin: "auto",
            backgroundColor: "#FFFFFF",
            padding: "20px",
            borderRadius: "20px",
            width: "480px",
            height: "500px",
            // left: "480px",
            left: "480px",
            marginTop: "50px",
          }}
        >
          <Typography variant="h4">Edit Student</Typography>
          <FormControl>
            <InputLabel htmlFor="my-input">Student Name</InputLabel>
            <Input
              name="studentName"
              value={state.studentName}
              onChange={(e) => {
                setter({ type: "studentName", payload: e.target.value });
              }}
              id="my-input"
              aria-describedby="my-helper-text"
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
              aria-describedby="my-helper-text"
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
              aria-describedby="my-helper-text"
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
            <div style={{ border: "0px solid green", width: "70px" }}>
              {xyz(+state.score) ? (
                <div className="ave">
                  <p style={{ color: "#2CA4D8" }}>Average</p>
                </div>
              ) : (
                <div className="poo">
                  <p style={{ color: "#F24643" }}>Poor</p>
                </div>
              )}
            </div>
          </FormControl>
          <div style={{ display: "flex", marginLeft: "auto", gap: "5px" }}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Cancle
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdate()}
            >
              Confirm
            </Button>
          </div>
        </Container>
      </Modal>
    </>
  );
}
