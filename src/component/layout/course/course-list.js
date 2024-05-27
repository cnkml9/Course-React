// Navbar.js

import React, { useState, useEffect } from 'react';

const CourseList = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/Student/ListAllCourse')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  var handleClick= (courseId) => {
    window.location.href="/CourseDetail/"+courseId;
  }
  
  
  return (
<div class="container mt-5">
  <div class="row">

    <div class="category-description">
      <h2>Kurs Listesi</h2>
      <p>These free online courses in Amazon Web Services will teach you about every aspect of this Amazon subsidiary. AWS provides powerful cloud computing platforms for use by businesses, individuals and more. These platforms have applications such as storage, networking, analytics, computing and a range of others</p>
    </div>
    {courses.map(course => (

    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="course-card">
        <img src="course-react-tez/alison.jpg" alt="Course Image" class="course-image"></img>
        <div class="course-content">
          <h4 class="course-title">{course.title}</h4>
          <div class="course-info">
            <div class="course-duration">
              <i class="far fa-clock"></i> 3-4 hrs
            </div>
            <div class="course-learners">
              <i class="fas fa-video"></i> {course.videoCount}
            </div>
            <div class="course-learners">
              <i class="fas fa-dollar-sign"></i> {course.amount}
            </div>
          </div>
          <p class="course-description">{course.description}</p>
          <button class="start-learning-btn" style={{marginRight:'5px'}}>Daha Fazla Bilgi</button>
          <button class="start-learning-btn" onClick={() => handleClick(course.courseId)} >Öğrenmeye Başla</button>
        </div>
      </div>
    </div>

    ))}

    <div class="popular-topics">
      <h2>Popüler Konular</h2>
      <div class="topic-item">Veri Bilimi</div>
      <div class="topic-item">Yapay Zeka</div>
      <div class="topic-item">Makine Öğrenmesi</div>
    </div>

  </div>
</div>



  );
}

export default CourseList;
