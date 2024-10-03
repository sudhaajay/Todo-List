import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Low');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState({
    Work: [],
    Personal: [],
    Shopping: [],
    General: []
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [category]: [...prevTasks[category], { text: task, priority, date, completed: false }]
      }));
      setTask('');
      setCategory('General');
      setPriority('Low');
      setDate('');
    }
  };

  const handleCompleteTask = (category, index) => {
    const updatedTasks = {
      ...tasks,
      [category]: tasks[category].map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    };
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (category, index) => {
    const updatedTasks = {
      ...tasks,
      [category]: tasks[category].filter((_, i) => i !== index)
    };
    setTasks(updatedTasks);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <div className="todo-box">
            <h2 className="text-center mb-4">To-Do List</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter a task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Shopping</option>
                  <option>General</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddTask} block>
                Add Task
              </Button>
            </Form>

            <Row className="mt-4">
              {Object.keys(tasks).map((cat) => (
                <Col key={cat} md={6} className="mb-4">
                  <div className="category-box">
                    <h5 className="text-center">{cat}</h5>
                    <ListGroup>
                      {tasks[cat].map((t, index) => (
                        <ListGroup.Item key={index} variant={t.completed ? 'success' : ''}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span
                              style={{
                                textDecoration: t.completed ? 'line-through' : 'none',
                              }}
                            >
                              {t.text} - <span style={{ color: t.priority === 'High' ? 'red' : t.priority === 'Medium' ? 'orange' : 'green' }}>{t.priority}</span> - {new Date(t.date).toLocaleDateString()}
                            </span>
                            <div>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleCompleteTask(cat, index)}
                              >
                                {t.completed ? 'Undo' : 'Complete'}
                              </Button>{' '}
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteTask(cat, index)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </Col>
              ))}
            </Row>

            <p className="text-center mt-4">Developed by Sudha Ajay © 2024</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
