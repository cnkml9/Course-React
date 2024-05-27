import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notificationService from '../../Services/NotificationService';

const Checkout = () => {
  const [course, setCourse] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const courseId = localStorage.getItem('selectedCourseId');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(" checkout kısmı" + localStorage.getItem('selectedCourseId'));

    if (courseId) {
      fetch(`http://localhost:5001/api/Course/GetCourseById?courseId=${courseId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => setCourse(data))
        .catch(error => {
          console.error('Error fetching course details:', error);
          notificationService.error('Satın Almada bir hata oluştu');
        });
    }
  }, [courseId]);

  const handlePurchase = async () => {
    const paymentDetails = {
      courseId,
      cardNumber,
      expiryDate,
      cvv
    };

    try {
      const paymentResponse = await fetch('http://localhost:5001/api/Student/PaymentCourseFromPurchaseService', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentDetails)
      });

      if (!paymentResponse.ok) {
        notificationService.error('Satın Almada bir hata oluştu');
        throw new Error('Payment failed');
      }
      notificationService.success('Satın Alma başarılı');
      navigate('/mycourselist'); // Başarı sayfasına yönlendirin

    } catch (error) {
      console.error('Error processing purchase:', error);
      notificationService.error('Satın Almada bir hata oluştu');
    }
  };

  return (
    <div className="container checkout-container">
      <ToastContainer />
      <h1 className="text-center my-5">Ödeme Sayfası</h1>
      {course ? (
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <div className="card-body">
            <h2 className="card-title text-center">{course.title}</h2>
            <p className="card-text"><strong>Kurs Açıklama:</strong>{course.description}</p>
            <p className="card-text"><strong>Fiyat:</strong> ${course.amount}</p>
            <p className="card-text" style={{marginBottom:'45px'}}><strong>Öğretmen:</strong> ${course.teacherName}</p>

            <div className="form-group">
              <label htmlFor="cardNumber">Kart Numarası:</label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="expiryDate">Son Kullanma Tarihi:</label>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="cvv">CVV:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={handlePurchase}>Satın Al</button>
          </div>
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default Checkout;
