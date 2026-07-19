import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCheck, Star, MessageSquare, Clock, Send, Calendar, CheckCircle } from 'lucide-react';
import './Consultations.css';

const Consultations = () => {
  const [professionals, setProfessionals] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submittedMessage, setSubmittedMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [profRes, reqRes] = await Promise.all([
        axios.get('http://localhost:5000/api/consultations/professionals'),
        axios.get('http://localhost:5000/api/consultations/my-requests', { headers }).catch(() => ({ data: [] }))
      ]);

      setProfessionals(profRes.data);
      setMyRequests(reqRes.data);
    } catch (error) {
      console.error('Error fetching consultation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedProf) return;

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post('http://localhost:5000/api/consultations/book', {
        professionalId: selectedProf.id,
        topic,
        message
      }, { headers });

      setSubmittedMessage('Your request has been submitted to ' + selectedProf.name);
      setTopic('');
      setMessage('');
      setSelectedProf(null);
      fetchData();
    } catch (error) {
      console.error('Error submitting consultation request:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading nutrition experts...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Connect with Nutrition Professionals</h1>
        <p>Get personalized medical dietary advice, meal plan reviews, and clinical guidance from licensed experts</p>
      </div>

      {submittedMessage && (
        <div className="alert alert-success">
          <CheckCircle size={20} />
          <span>{submittedMessage}</span>
          <button className="close-alert" onClick={() => setSubmittedMessage('')}>×</button>
        </div>
      )}

      <div className="consultation-layout">
        <div className="prof-section">
          <h2>Featured Dietitians & Nutritionists</h2>
          <div className="profs-grid">
            {professionals.map((prof) => (
              <div key={prof.id} className="prof-card">
                <img src={prof.avatar} alt={prof.name} className="prof-avatar" />
                <div className="prof-info">
                  <div className="prof-header">
                    <h3>{prof.name}</h3>
                    <span className="rating"><Star size={14} fill="#f59e0b" color="#f59e0b" /> {prof.rating}</span>
                  </div>
                  <span className="specialty">{prof.specialty}</span>
                  <p className="experience"><UserCheck size={14} /> {prof.experience}</p>
                  <p className="bio">{prof.bio}</p>
                  <div className="prof-actions">
                    <span className="availability"><Clock size={14} /> {prof.availability}</span>
                    <button className="btn btn-primary btn-sm" onClick={() => setSelectedProf(prof)}>
                      <MessageSquare size={16} /> Consult Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="requests-sidebar">
          <h2>My Consultations ({myRequests.length})</h2>
          {myRequests.length === 0 ? (
            <div className="empty-requests">
              <p>No active requests. Connect with an expert to discuss your dietary goals or health conditions.</p>
            </div>
          ) : (
            myRequests.map((req) => (
              <div key={req.id} className="request-card">
                <div className="request-header">
                  <strong>{req.profName}</strong>
                  <span className={`status-tag ${req.status.toLowerCase().replace(' ', '-')}`}>{req.status}</span>
                </div>
                <div className="request-topic">{req.topic}</div>
                <p className="request-msg">"{req.message}"</p>
                <div className="request-date">
                  <Calendar size={14} /> {new Date(req.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedProf && (
        <div className="modal-overlay" onClick={() => setSelectedProf(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProf(null)}>×</button>
            <h2>Book Consultation with {selectedProf.name}</h2>
            <p className="modal-subtitle">{selectedProf.specialty}</p>

            <form onSubmit={handleBook}>
              <div className="form-group">
                <label className="label">Consultation Topic / Focus Area</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Diabetes Meal Plan, Weight Loss Plateau, Sports Nutrition"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Describe your question or dietary health goals</label>
                <textarea
                  className="input textarea"
                  rows="4"
                  placeholder="Share details regarding your current diet, medical restrictions, or specific questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <Send size={16} /> Submit Consultation Request
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedProf(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultations;
