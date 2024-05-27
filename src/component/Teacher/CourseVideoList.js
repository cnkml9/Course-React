// CourseVideoList.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, CloudUpload as CloudUploadIcon, Edit as EditIcon } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import notificationService from '../../Services/NotificationService';

const CourseVideoList = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [videoError, setVideoError] = useState('');

  const token = localStorage.getItem("accessToken");

  const fetchVideos = () => {
    fetch(`http://localhost:5001/api/Teacher/GetCourseTeacherVideoById?courseId=${courseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  };

  useEffect(() => {
    fetchVideos();
  }, [courseId]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAddVideo = () => {
    if (!title || !selectedFile) {
      setVideoError('Please select title and video file.');
      return;
    }

    const formData = new FormData();
    formData.append('Title', title);
    formData.append('File', selectedFile);

    fetch(`http://localhost:5001/api/Teacher/AddVideoToCourse/${courseId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          Notification.error('Kurs video eklemede bir hata oluştu') 
          throw new Error('Failed to add video');
        }
        return response.json();
      })
      .then(data => {
        fetchVideos();
        setTitle('');
        setSelectedFile(null);
        setVideoError('');
      })
      .catch(error => console.error('Error adding video:', error) +           Notification.error('Kurs video eklemede bir hata oluştu') );
  };

  const handleDeleteDialogOpen = (video) => {
    setVideoToDelete(video);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setVideoToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteVideo = () => {
    fetch(`http://localhost:5001/api/Video/DeleteVideoFromCourse/${videoToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete video');
        }
        return response.json();
      })
      .then(data => {
        fetchVideos();
        handleDeleteDialogClose();
        window.location.reload();

      })
      .catch(error => console.error('Error deleting video:', error));
      window.location.reload();

  };

  const handleEditDialogOpen = (video) => {
    setVideoToEdit(video);
    setEditDialogOpen(true);
    setTitle(video.title);
  };

  const handleEditDialogClose = () => {
    setVideoToEdit(null);
    setEditDialogOpen(false);
    setTitle('');
  };

  const handleUpdateVideo = () => {
    if (!title) {
      setVideoError('Please select title.');
      return;
    }

    const formData = new FormData();
    formData.append('Title', title);
    if (selectedFile) {
      formData.append('File', selectedFile);
    }

    fetch(`http://localhost:5001/api/Video/UpdateVideoFromCourse/${videoToEdit.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update video');
        }
        return response.json();
      })
      .then(data => {
        fetchVideos();
        handleEditDialogClose();
        window.location.reload();

      })
      .catch(error => console.error('Error updating video:', error));
      window.location.reload();

  };
  return (
    <div className='container mt-5'>
        <ToastContainer />

      {/* Video Ekleme Formu */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '10px' }}>
         Kursa Video Ekle
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="Başlık"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              fullWidth
              error={!!videoError}
              helperText={videoError}
            />
          </Grid>
          <Grid item xs={3}>
            <input
              accept="video/mp4"
              style={{ display: 'none' }}
              id="video-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="video-upload">
              <Button
                variant="contained"
                color="primary"
                backgroundColor="#f0ad4e !important"
                component="span"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Video Seç
              </Button>
            </label>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddVideo}
              fullWidth
              startIcon={<CloudUploadIcon />}
            >
              Ekle
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Video Listesi */}
      <Grid container spacing={3}>
        {videos.length > 0 ? (
          videos.map(video => (
            <Grid item key={video.id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(255 255 255)', color: 'white', boxShadow: '0px 0px 15px rgba(0,0,0,0.5)' }}>
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h6" style={{ fontWeight: '600',color:'#574141'}}>
                    {video.title}
                  </Typography>
                  <video controls width="100%">
                    <source src={video.url} type="video/mp4" />
                    Tarayıcınız video tag'ini desteklemiyor.
                  </video>
                </CardContent>
                <div style={{ padding: '10px', borderTop: '1px solid #eee', marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Button
                      startIcon={<EditIcon />}
                      color="primary"
                      onClick={() => handleEditDialogOpen(video)}
                    >
                      Düzenle
                    </Button>
                  </div>
                  <div>
                    <Button
                      startIcon={<DeleteIcon />}
                      color="secondary"
                      onClick={() => handleDeleteDialogOpen(video)}
                    >
                      Sil
                    </Button>
                  </div>
                </div>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Video bulunamadı.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Silme Onayı Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Emin misiniz?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`"${videoToDelete ? videoToDelete.title : ''}" başlıklı videosu silmek istediğinize emin misiniz?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            İptal
          </Button>
          <Button onClick={handleDeleteVideo} color="secondary" autoFocus>
            Sil
          </Button>
        </DialogActions>
      </Dialog>

   {/* Güncelleme Dialog */}
    <Dialog
    open={editDialogOpen}
    onClose={handleEditDialogClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Video Düzenle</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Başlık"
        type="text"
        fullWidth
        value={title}
        onChange={handleTitleChange}
        error={!!videoError}
        helperText={videoError}
      />
      <input
        accept="video/mp4"
        style={{ display: 'none' }}
        id="video-update"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="video-update">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
          fullWidth
          style={{ marginTop: '10px' }}
        >
          Video Seç
        </Button>
      </label>
      <Typography variant="body1" style={{ marginTop: '10px' }}>
        {selectedFile ? selectedFile.name : 'Dosya seçilmedi.'}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleEditDialogClose} color="primary">
        İptal
      </Button>
      <Button onClick={handleUpdateVideo} color="primary">
        Güncelle
      </Button>
    </DialogActions>
    </Dialog>

    </div>
  );
};

export default CourseVideoList;
