import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleTaskAdded = () => setRefresh(!refresh);
  const handleEditTask = (task) => setEditingTask(task);
  const handleCancelEdit = () => setEditingTask(null);

  return (
    <Container fluid className='py-4'>
      <h1 className='text-center mb-4 fade-in app-title'>Task Lab Exam</h1>

      <Row>
        <Col md={4} lg={3}>
          <div className='sticky-form'>
            <TaskForm
              onTaskAdded={handleTaskAdded}
              editTask={editingTask}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        </Col>
        <Col md={8} lg={9}>
          <TaskList refresh={refresh} onEditTask={handleEditTask} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
