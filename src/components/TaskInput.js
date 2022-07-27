import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

// Function to create a new task

function TaskInput() {

  // useStae to store the  new task
  const [inputnewTask, setnewTask] = useState("");

  // useState to store the all task
  const [inputOldTask, setOldTask] = useState([]);

 
  // Function to add Items
// e=> event
  function addItem(e) {
    if (!inputnewTask) return;

    const item = {
      id: Math.random() * 2000,
      title: inputnewTask,
      completed: false,
    };
    setOldTask([...inputOldTask,item]);
    setnewTask("");
    console.log(inputOldTask);
  }


  // Function to delete Items
  // id -> id of the item to be deleted
  function deleteItem(id) {
    const newArray = inputOldTask.filter((item) => item.id !== id);
    setOldTask(newArray);
  }

  // Function to mark Items as completed
  // e-> event
  function markStatus(e) {
    const updatedTodo = inputOldTask.map((item) => {
      if (item.id === e.id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setOldTask(updatedTodo);
    console.log("newArray", updatedTodo);
  }

  // Function to fetch the tasks from the server.
  // console.log(); to check the data length.
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      console.log(res.data);
      setOldTask(res.data);
    });
  }, []);

  return (
    <>


      {/* TaskInput */}
      <Box>
        <Grid container spacing={2}>
          <Grid item xl={6} md={6} sm={12} xs={12}>
          
          {/* Task Entry Input Field Form */}
            <FormControl
              sx={{
                width: "100%",
                backgroundColor: "#4a3333",
                borderRadius: "10px",
              }}
            >
              <OutlinedInput
                style={{ color: "white" }}
                onChange={(e) => setnewTask(e.target.value)}
                placeholder="Enter the Task"
              />
            </FormControl>
          </Grid>

          {/* Button To Add Task */}
          <Grid item xl={6} md={6} sm={12} xs={12}>
            <Button
              style={{ height: "100%", backgroundColor: "#C620A7" }}
              type="submit"
              onClick={() => addItem()}
              variant="contained"
              size="large"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>



      {/* TaskCards or TaskList */}

      <Box>
   
      {/* TaskList Heading */}
        <Typography style={{ margin: "4rem 0" }}>
          <h3>Added task in to-do list</h3>
        </Typography>

 
        {/* OrderedList */}
        <ol>

        {/* Box Containing all the list */}
          <Box>
            <Grid container spacing={5}>

            {/* Mapping the all Task present in api or added item */}
              {inputOldTask.
               map((task) => (
                <li
                  style={{ position: "relative", margin: "0 2rem" }}
                  key={task.id}
                >
                  <Grid
                    container
                    direction="row"
                    item
                    xl={4}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{ margin: "1rem 1rem" }}
                  >
                    <Grid>
                      <Card
                        sx={{ minWidth: 275 }}
                        style={{
                          padding: "1rem",
                          border:
                            task.completed == true
                              ? "2px solid #7AB530"
                              : "none",
                          backgroundColor:
                            task.completed == true ? "#202020" : "#2F2F2F",
                          width: "30rem",
                        }}
                      >

                      {/* TaskTitle */}
                        <CardContent>
                          <Typography
                            paragraph
                            style={{ color: "white", overflowWrap: "anywhere" }}
                            sx={{ fontSize: 30 }}
                            variant="body2"
                            color="text.secondary"
                          >
                            {task.title}
                          </Typography>

                          {/* TaskDivider */}
                          <Divider
                            style={{
                              backgroundColor: "#5C5C5C",
                              width: "100%",
                            }}
                          />
                        </CardContent>

                        {/* TaskAction Button Mark and Delete */}
                        <CardActions
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >

                        {/* MarkStatus Button  + green Border Addition*/}

                          <Button
                            sx={{
                              height: "100%",
                              backgroundColor:
                                task.completed == true ? "#2F2F2F" : "#C620A7",
                            }}
                            onClick={() => markStatus(task)}
                            variant="contained"
                            size="large"
                          >
                            {task.completed == true
                              ? "Mark as Uncompleted"
                              : "Mark as Completed"}
                          </Button>

                          {/* Delete Button */}
                          <Button
                            sx={{
                              height: "100%",
                              color: "#AFAFAF",
                              fontSize: "16px",
                            }}
                            variant="text"
                            onClick={() => deleteItem(task.id)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>


                      {/* CheckCircle */}
                    <Grid>
                      {task.completed == true && (
                        <CheckCircleIcon
                          sx={{
                            top: "3.5rem",
                            left: "32.25rem",
                            color: "#7AB530",
                            zIndex: "5",
                            fontSize: "2rem",
                            position: "absolute",
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </li>
              )).reverse()
}
            </Grid>
          </Box>
        </ol>
      </Box>
    </>
  );
}

export { TaskInput as default };
