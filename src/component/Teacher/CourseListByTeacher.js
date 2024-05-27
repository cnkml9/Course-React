import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@material-ui/core';
import { Delete, Edit, VideoLibrary, Publish } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CourseListByTeacher = () => {
  const [courses, setCourses] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    id: '',
    title: '',
    description: '',
    amount: 0,
  });
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [courseToPublish, setCourseToPublish] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    fetch('http://localhost:5001/api/Teacher/GetCourseByTeacher', requestOptions)
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleDelete = () => {
    const token = localStorage.getItem("accessToken");
    fetch(`http://localhost:5001/api/Teacher/DeleteCourse/${courseToDelete}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setCourses(courses.filter(course => course.courseId !== courseToDelete));
        setOpenDelete(false);
      })
      .catch(error => console.error('Error deleting course:', error));
  };

  const handlePublish = () => {
    const token = localStorage.getItem("accessToken");
    fetch(`http://localhost:5001/api/Teacher/PublishCourse/${courseToPublish}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          Notification.error('Kurs yüklemede bir hata oluştu');
          throw new Error('Network response was not ok');
        }
        setOpenPublish(false);
        // Optionally update the course list or course status after publishing
      })
      .catch(error => console.error('Error publishing course:', error) + Notification.error('Kurs yüklemede bir hata oluştu')  );
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setOpenEdit(true);
  };

  const handleViewVideos = (courseId) => {
    navigate(`/course-videos/${courseId}`);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClosePublish = () => {
    setOpenPublish(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourse({ ...selectedCourse, [name]: value });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("accessToken");
    fetch('http://localhost:5001/api/Teacher/UpdateCourse', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedCourse)
    })
      .then(response => {
        if (!response.ok) {
          Notification.error('Bir hata oluştu');
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Course updated:', data);
        setOpenEdit(false);
        setCourses(courses.map(course => course.courseId === selectedCourse.id ? selectedCourse : course));
      })
      .catch(error => console.error('Error updating course:', error) + Notification.error('Bir hata oluştu') );
  };

  return (
    <div>
        <ToastContainer />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Video Count</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map(course => (
              <TableRow key={course.courseId}>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell>{course.courseDescription}</TableCell>
                <TableCell>{course.courseVideoCount}</TableCell>
                <TableCell>{course.amount}</TableCell>
                <TableCell>{new Date(course.createdDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(course)}><Edit /></IconButton>
                  <IconButton onClick={() => { setCourseToDelete(course.courseId); setOpenDelete(true); }}><Delete /></IconButton>
                  <IconButton onClick={() => handleViewVideos(course.courseId)}><VideoLibrary /></IconButton>
                  <IconButton onClick={() => { setCourseToPublish(course.courseId); setOpenPublish(true); }}><Publish /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the details of the course below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={selectedCourse.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={selectedCourse.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={selectedCourse.amount}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <DialogTitle>
          {"Are you sure you want to delete this course?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPublish}
        onClose={handleClosePublish}
      >
        <DialogTitle>
          {"Are you sure you want to publish this course?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClosePublish} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePublish} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CourseListByTeacher;
