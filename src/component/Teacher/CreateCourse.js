import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import notificationService from '../../Services/NotificationService';
const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [courseModelTitle, setCourseModelTitle] = useState('');
  const [courseModelDescription, setCourseModelDescription] = useState('');
  const [models, setModels] = useState([]);
  const token = localStorage.getItem("accessToken"); 

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleAddModel = () => {
    if (!courseModelTitle || !courseModelDescription) {
      alert('Please enter both model title and model description.');
      return;
    }

    const newModel = {
      title: courseModelTitle,
      description: courseModelDescription,
    };

    setModels([...models, newModel]);
    setCourseModelTitle('');
    setCourseModelDescription('');
  };

  const handleDeleteModel = (index) => {
    const updatedModels = [...models];
    updatedModels.splice(index, 1);
    setModels(updatedModels);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('amount', amount);
    formData.append('videoTitle', videoTitle);
    formData.append('file', videoFile);

    models.forEach((model, index) => {
      formData.append(`courseModeltitle`, model.title);
      formData.append(`courseModeldescription`, model.description);
    });

    fetch('http://localhost:5001/api/Teacher/CreateCourse', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Course created successfully:', data);
      })
      .catch((error) => {
        console.error('Error creating course:', error);
      });
  };

  return (
    <div className="container mt-5">
        <ToastContainer />

      <h1 className="mb-4" style={{fontSize: '1.5rem'}}>Yeni Kurs Oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" style={{fontSize: '0.9rem'}}>Başlık</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" style={{fontSize: '0.9rem'}}>Açıklama</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label" style={{fontSize: '0.9rem'}}>Fiyat</label>
          <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="videoTitle" className="form-label" style={{fontSize: '0.9rem'}}>Video Başlık</label>
          <input type="text" className="form-control" id="videoTitle" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="videoFile" className="form-label" style={{fontSize: '0.9rem'}}>Video Dosyası</label>
          <input type="file" className="form-control" id="videoFile" onChange={handleVideoFileChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="courseModelTitle" className="form-label" style={{fontSize: '0.9rem'}}>Model Başlık</label>
          <input type="text" className="form-control" id="courseModelTitle" value={courseModelTitle} onChange={(e) => setCourseModelTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="courseModelDescription" className="form-label" style={{fontSize: '0.9rem'}}>Model Açıklama</label>
          <textarea className="form-control" id="courseModelDescription" rows="2" value={courseModelDescription} onChange={(e) => setCourseModelDescription(e.target.value)}></textarea>
        </div>
        <button type="button" className="btn btn-secondary mb-3" style={{fontSize: '0.9rem'}} onClick={handleAddModel}> Model Ekle</button>

        {models.length > 0 && (
          <div className="mb-3">
            <h3 style={{fontSize: '1.2rem'}}>Models Listesi</h3>
            <ul className="list-group">
              {models.map((model, index) => (
                <li key={index} className="list-group-item">
                  <strong>{model.title}</strong>: {model.description}
                  <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteModel(index)}>Sil</button>
                </li>
              ))}
            </ul>
          </div>
        )}
<hr/>
        <button type="submit" className="btn btn-primary" style={{fontSize: '0.9rem'}}>Kaydet</button>
      </form>
    </div>
  );
};

export default CreateCourse;
