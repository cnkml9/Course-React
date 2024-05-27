// src/components/VideoList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseVideoStudent = () => {
  const [videos, setVideos] = useState([]);
  const { courseId } = useParams();
  const token = localStorage.getItem("accessToken");
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5001/api/Student/GetVideoByCourse/${courseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, [courseId, token]);

  const handleClick = (videoId) => {
    fetch(`http://localhost:5001/api/video?videoid=${videoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setVideoUrl(data.url);
      })
      .catch(error => console.error('Error fetching video:', error));
  }

  return (
    <section>
      <div className="container-fluid video-show-container">
        <div className="row">
          <div className="col-md-7">
            <div className="embed-responsive embed-responsive-16by9">
              <video className="embed-responsive-item" style={{borderStyle:'none', width:'100%', height:'100%'}} src={videoUrl} controls></video>
            </div>
            <div className="card mt-3">
              <ul className="nav nav-pills card-header">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="pill" href="#genelBakis">Genel Bakış</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#soruCevap">Soru & Cevap</a>
                </li>
              </ul>
              <div className="tab-content card-body">
                <div className="tab-pane container active" id="genelBakis">
                  <p>Buraya genel bakış bilgileri gelecek.</p>
                </div>
                <div className="tab-pane container fade" id="soruCevap">
                  <p>Buraya soru ve cevaplar gelecek.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="list-group">
              <h6 className="list-group-item active">Kurs İçeriği</h6>
              {videos.map(video => (
                <a key={video.id} href="#" className="list-group-item list-group-item-action flex-column align-items-start a-tag-child-white-style" onClick={() => handleClick(video.id)}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{video.title}</h5>
                    <small>3 gün önce</small>
                  </div>
                  <p className="mb-1">{video.description}</p>
                  <small>Yapıldı.</small>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id={`check${video.id}`}></input>
                    <label className="form-check-label" htmlFor={`check${video.id}`}>Tamamlandı</label>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseVideoStudent;
