import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    // Toggle to re-fetch list
    setRefresh(!refresh);
  };

  return (
    <div style={{ width: "500px", margin: "auto", textAlign: "center" }}>
      <h1>Task Management App</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={refresh} />
    </div>
  );
}

export default App;
