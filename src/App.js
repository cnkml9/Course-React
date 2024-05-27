import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


import Navbar from './component/layout/navbar';
import Footer from './component/layout/footer';
import Login from './component/auth/login';
import CourseList from './component/layout/course/course-list';
import CreateCourse from './component/Teacher/CreateCourse';
import CourseDetail from './component/Course/CourseDetail';
import CourseListByTeacher from './component/Teacher/CourseListByTeacher';
import CourseVideoList from './component/Teacher/CourseVideoList';
import MyCourseList from './component/Student/MyCourses';
import Checkout from './component/Student/checkout';
import CourseVideo from './component/Course/CourseVideoStudent';
import CourseVideoStudent from './component/Course/CourseVideoStudent';
import VideoPlayer from './component/Course/VideoPlayer';

function App() {
  
  return (
  <div className="app">
    <Router>
    <Navbar />
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/courselist' element={<CourseList />} />
      <Route path='/createcourse' element={<CreateCourse />} />
      <Route path='/coursedetail/:courseId' element={<CourseDetail />} />
      <Route path='/courselistbyteacher' element={<CourseListByTeacher />} />
      <Route path="/course-videos/:courseId" element={<CourseVideoList />} />
      <Route path="/mycourselist" element={<MyCourseList />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/coursevideostudent/:courseId" element={<CourseVideoStudent />} />
      <Route path="/video/:videoId" element={<VideoPlayer />} />

    </Routes>

    </Router>

  </div>
  );
}

export default App;
