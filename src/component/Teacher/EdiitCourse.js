import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@material-ui/core';

const EditCourse = () => {
  const { courseId } = useParams();
  const history = useHistory();
  const [course, setCourse] = useState({
    id: '',
    title: '',
    description: '',
    amount: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch(`http://localhost:5001/api/Teacher/GetCourseById?courseId=${courseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error('Error fetching course:', error));
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    fetch(`http://localhost:5001/api/Teacher/UpdateCourse`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Course updated:', data);
        history.push('/course-list');
      })
      .catch(error => console.error('Error updating course:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={course.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={course.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={course.amount}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default EditCourse;
