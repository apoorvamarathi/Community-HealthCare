import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import SubmitHealthData from './components/SubmitHealthData';
import CommunityInsights from './components/CommunityInsights';




function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitHealthData />} />
          <Route path="/insights" element={<CommunityInsights/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f5f9fc',
  }
};

export default App;