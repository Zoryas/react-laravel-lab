import React, { useEffect, useState } from "react";
import { API_URL } from "../api";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
      setStatusMsg("");
    } catch (err) {
      setStatusMsg("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this task?")) return;
    setStatusMsg("Deleting...");
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
    setStatusMsg("✅ Task deleted!");
    setTimeout(() => setStatusMsg(""), 2000);
  };

  const handleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updated = { ...task, status: "completed" };

    setStatusMsg("Marking as completed...");
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? data : t)));
    setStatusMsg("✅ Task completed!");
    setTimeout(() => setStatusMsg(""), 2000);
  };

  return (
    <div className='mt-4'>
      <h2 className='text-center mb-3'>Task List</h2>

      {statusMsg && (
        <Alert variant='info' className='text-center py-2 fade-in'>
          {statusMsg}
        </Alert>
      )}

      {loading ? (
        <div className='text-center py-5'>
          <Spinner animation='border' role='status' variant='primary' />
          <p className='mt-2 text-secondary'>Loading tasks...</p>
        </div>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='shadow-sm animate-table'
        >
          <thead className='table-primary'>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan='5' className='text-center text-muted'>
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr
                  key={task.id}
                  className={`align-middle ${
                    task.status === "completed" ? "table-success fade-in" : ""
                  }`}
                >
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                  <td>{task.due_date || "-"}</td>
                  <td>
                    {task.status !== "completed" && (
                      <Button
                        variant='success'
                        size='sm'
                        className='me-2 animated-btn'
                        onClick={() => handleComplete(task.id)}
                      >
                        ✓ Complete
                      </Button>
                    )}
                    <Button
                      variant='danger'
                      size='sm'
                      className='animated-btn'
                      onClick={() => handleDelete(task.id)}
                    >
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}
