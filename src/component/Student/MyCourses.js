// CourseVideoList.js

import React, { useEffect, useState } from 'react';


const MyCourseList = () => {

  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("accessToken"); // Assuming the token is stored in localStorage

  useEffect(() => {
    // API çağrısını yap
    fetch('http://localhost:5001/api/Student/GetPurchasedCoursesByStudentId', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, [token]);

  var handleClick= (courseId) => {
    window.location.href="/coursevideostudent/"+courseId;
  }
  

  return (

    <div cla="container">
      <div className="row">
              {courses.length > 0 ? (

      courses.map(course => (

        <div className="col-lg-4 col-md-6  wow fadeInUp" data-wow-delay="0.3s">
          <div className="single-latest-news">
            <a href="single-news.html"
              ><div className="latest-news-bg news-bg-1"></div
            ></a>
            <div className="news-text-box">
              <h3>
                <a href="single-news.html"
                  >{course.courseTitle}</a
                >
              </h3>
              <p className="blog-meta">
                <span className="author"><i className="fas fa-user"></i> {course.teacherName}</span>
                <span className="date"
                  ><i className="fas fa-calendar"></i> 27 Mayıs 2024</span
                >
              </p>
              <p className="excerpt">
                {course.courseDescription}
              </p>
              <a style={{cursor:'pointer'}} className="read-more-btn"onClick={() => handleClick(course.courseId)}
                >Kursa Git<i className="fas fa-angle-right"  onClick={() => handleClick(course.courseId)} ></i
              ></a>
            </div>
          </div>
        </div>
      ))
      ) : (
        <p>No courses available.</p>
      )}

      </div>
    </div>


  );
};

export default MyCourseList;
