import "./app.css";
import TaskInput from "./components/TaskInput";

function App() {
  return (
    <div className="App">
      <h1 className="Heading">To-Do List</h1>
      <div>
        <h3 className="addTaskHeadline">Add a new task in list</h3>
        <TaskInput />
      </div>
    </div>
  );
}

export default App;
