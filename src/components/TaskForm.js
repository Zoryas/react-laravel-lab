import React, { useState } from "react";
import { API_URL } from "../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function TaskForm({ onTaskAdded, editTask, onCancelEdit }) {
  const [title, setTitle] = useState(editTask?.title || "");
  const [description, setDescription] = useState(editTask?.description || "");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    const taskData = {
      title,
      description,
      status: editTask?.status || "pending",
    };

    try {
      const url = editTask ? `${API_URL}/${editTask.id}` : API_URL;
      const method = editTask ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok)
        throw new Error(`Failed to ${editTask ? "update" : "create"} task`);

      await response.json();
      setStatusMsg(`✅ Task ${editTask ? "updated" : "added"} successfully!`);
      setTitle("");
      setDescription("");
      onTaskAdded();
      if (editTask) onCancelEdit();
    } catch {
      setStatusMsg(`❌ Failed to ${editTask ? "update" : "add"} task`);
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg(""), 2000);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onCancelEdit();
  };

  return (
    <div className='p-4 border rounded bg-light shadow-sm mt-3 fade-in'>
      <h3 className='d-flex align-items-center gap-2'>
        {editTask ? (
          <>
            <span className='edit-indicator'>✏️</span>
            Edit Task
          </>
        ) : (
          "Add New Task"
        )}
      </h3>

      {statusMsg && (
        <Alert
          variant={statusMsg.includes("✅") ? "success" : "danger"}
          className='py-2 fade-in status-alert'
        >
          {statusMsg}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Control
            type='text'
            placeholder='Task Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='form-control-enhanced'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Control
            as='textarea'
            rows={2}
            placeholder='Description (optional)'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='form-control-enhanced'
          />
        </Form.Group>

        <div className='d-flex gap-2'>
          <Button
            variant={editTask ? "warning" : "primary"}
            type='submit'
            disabled={loading}
            className='animated-btn flex-grow-1'
          >
            {loading ? (
              <>
                <Spinner size='sm' animation='border' className='me-2' />{" "}
                {editTask ? "Updating..." : "Adding..."}
              </>
            ) : editTask ? (
              "Update Task"
            ) : (
              "Add Task"
            )}
          </Button>

          {editTask && (
            <Button
              variant='outline-secondary'
              onClick={handleCancel}
              className='animated-btn'
            >
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
