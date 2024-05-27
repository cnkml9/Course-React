import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [modelDescriptionVisible, setModelDescriptionVisible] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {

    console.log("courseID"+ courseId);


    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/Course/GetCourseById?courseId=${courseId}`);
        const data = await response.json();
        setCourse(data);
        setModelDescriptionVisible(new Array(data.modelTitle.length).fill(false));
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const toggleModuleContent = (index) => {
    const updatedVisibility = [...modelDescriptionVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setModelDescriptionVisible(updatedVisibility);
  };

  const handlePurchaseClick = (courseId) => {
    localStorage.setItem('selectedCourseId', courseId);    
    console.log(localStorage.getItem('selectedCourseId'));
    window.location.href='/checkout'; // Redirect to checkout page
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div class="container mt-5" style={{backgroundColor:'white',padding:'50px',borderRadius:'20px'}}> 
    <div class="row">
      <div class="col-md-4">
        <div class="course-card">
          <img src="https://picsum.photos/500/600" alt="Kurs Resmi"></img>
          <h4>{course.title}</h4>
          <p>{course.CourseDetail}</p>
          <div class="course-info">
            <div class="course-duration">
              <i class="far fa-clock"></i> 3-4 saat
            </div>
            <div class="course-learners">
              <i class="fas fa-user-friends"></i> {course.videoCount} Video
            </div>
        
          </div>
              <div class="course-includes">
                <i class="fas fa-clipboard-list"></i> Bu Çevrimiçi Kurs şunları içerir:
                <ul>
                  <li>1.5-3 Saatlik Öğrenme</li>
                  <li>Sertifika Fırsatı</li>
                  <li>Son Değerlendirme</li>
                </ul>
              </div>
              <div class="course-enrollment">
                <i class="fas fa-users"></i> {course.teacherName}
              </div>
  
  
  
          <div class="course-action">
          <button
              className="btn-modern"
              onClick={() => handlePurchaseClick(courseId)}
            >
              Kursu Satın Al 
            </button>
                  <div class="likes" style={{fontWeight:'600',color:'black',fontSize:'17px'}}>
              <i class="fas fa-dollar-sign" style={{fontWeight:'600',color:'black',fontSize:'17px'}}>  </i>{course.amount}
            </div>
          </div>
        </div>
        
      </div>
      <div class="col-md-8">
        <div class="course-content">
          <h2>{course.title}</h2>
          <p>{course.description}</p>        <ul className="module-list">
          {course.modelTitle.map((title, index) => (
            <React.Fragment key={index}>
              <li onClick={() => toggleModuleContent(index)}>
                Modül {index + 1}: {title}
              </li>
              {modelDescriptionVisible[index] && (
                <div className="module-content">{course.modelDescription[index]}</div>
              )}
            </React.Fragment>
          ))}
        </ul>
        </div>
  
  
        <div class="learning-outcomes-container">
          <h3>Öğrenecekleriniz</h3>
  
          <div class="row">
            {course.modelDescription.map((desc) => (
              <div class="col-6">
                <div class="learning-outcome">
                  <ul>
                    <li>{desc}</li>
                    <li>{desc}</li>
                  </ul>
                </div>
              </div>
            ))}

    
          </div>
          <div >
            <button class="btn-modern">Tümünü Listele</button>
          </div>
        </div>
        
        
  
        <div class="knowledge-skills-container">
  <div class="knowledge-skills">
    <h2>Öğreneceğiniz Bilgi ve Beceriler</h2>
    <div class="row">
      <div class="col">
        <ul>
          <li>Programlama Dilleri</li>
          <li>Veri Yapıları ve Algoritmalar</li>
          <li>Web Geliştirme</li>
          <li>Veritabanı Yönetimi</li>
          <li>Yazılım Mühendisliği Prensipleri</li>
        </ul>
      </div>
      <div class="col">
        <ul>
          <li>Mobil Uygulama Geliştirme</li>
          <li>Bulut Bilişim</li>
          <li>Makine Öğrenmesi</li>
          <li>Siber Güvenlik</li>
          <li>Agile ve Scrum Metodolojileri</li>
        </ul>
      </div>
      <div class="col">
        <ul>
          <li>API Tasarımı ve Entegrasyonu</li>
          <li>DevOps ve CI/CD</li>
          <li>Veri Analizi ve Görselleştirme</li>
          <li>Yapay Zeka</li>
          <li>Oyun Geliştirme</li>
        </ul>
      </div>
    </div>
  </div>
</div>

      </div>
  
    </div>
  </div>
  
  );
}

export default CourseDetail;



// <div className="App">
// <h1>{course.title}</h1>
// <p>{course.description}</p>
// <h2>Teacher: {course.teacherName}</h2>
// <p>Video Count: {course.videoCount}</p>
// <p>Amount: ${course.amount}</p>
// <div>
//   <h3>Model Titles</h3>
//   <ul>
//     {course.modelTitle.map((title, index) => (
//       <li key={index}>{title}</li>
//     ))}
//   </ul>
// </div>
// <div>
//   <h3>Model Descriptions</h3>
//   <ul>
//     {course.modelDescription.map((desc, index) => (
//       <li key={index}>{desc}</li>
//     ))}
//   </ul>
// </div>
// </div>