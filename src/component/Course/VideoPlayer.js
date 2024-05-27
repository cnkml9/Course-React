// src/components/VideoPlayer.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetch(`http://localhost:5001/api/video?videoid=${videoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setVideoUrl(data.url);
        setVideoTitle(data.title);
      })
      .catch(error => console.error('Error fetching video:', error));
  }, [videoId, token]);

  return (
    <div className="video-player-container">
      <div className="video-player">
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-details">
        <h2>{videoTitle}</h2>
        <p className="video-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis
          tristique eros nec pulvinar.
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
