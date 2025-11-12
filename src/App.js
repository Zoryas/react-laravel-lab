import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleTaskAdded = () => setRefresh(!refresh);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <Container className='py-4'>
      <h1 className='text-center mb-4 fade-in app-title'>Task Lab Exam</h1>
      <TaskForm
        onTaskAdded={handleTaskAdded}
        editTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />
      <TaskList refresh={refresh} onEditTask={handleEditTask} />
    </Container>
  );
}

export default App;
