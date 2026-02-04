import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewCommunityInsights = () => {
  const navigate = useNavigate();

  const insights = [
    { label: 'Overall Community Health', value: '78%', trend: '+2%', color: '#4A90E2' },
    { label: 'Common Symptoms Reported', value: 'Fatigue', trend: 'Most Common', color: '#36B37E' },
    { label: 'Average Age Group', value: '32', trend: 'Median Age', color: '#FF5630' },
    { label: 'Weekly Submissions', value: '1,247', trend: '+15%', color: '#6554C0' },
  ];

  const trends = [
    { month: 'Jan', healthIndex: 72 },
    { month: 'Feb', healthIndex: 75 },
    { month: 'Mar', healthIndex: 74 },
    { month: 'Apr', healthIndex: 78 },
    { month: 'May', healthIndex: 76 },
    { month: 'Jun', healthIndex: 80 },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h1 style={styles.title}>Community Insights</h1>
      </header>

      <main style={styles.main}>
        <div style={styles.insightsGrid}>
          {insights.map((insight, index) => (
            <div key={index} style={{...styles.insightCard, borderTop: `4px solid ${insight.color}`}}>
              <h3 style={styles.insightLabel}>{insight.label}</h3>
              <div style={styles.insightValue}>{insight.value}</div>
              <div style={{...styles.insightTrend, color: insight.color}}>
                {insight.trend}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.chartContainer}>
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Community Health Trend (Last 6 Months)</h2>
            <div style={styles.chart}>
              {trends.map((point, index) => (
                <div key={index} style={styles.chartBarContainer}>
                  <div style={styles.chartBarWrapper}>
                    <div 
                      style={{
                        ...styles.chartBar,
                        height: `${point.healthIndex}%`,
                        backgroundColor: point.healthIndex > 75 ? '#4A90E2' : '#5d7790',
                      }}
                    />
                  </div>
                  <div style={styles.chartLabel}>{point.month}</div>
                  <div style={styles.chartValue}>{point.healthIndex}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.notesCard}>
          <h2 style={styles.notesTitle}>Key Observations</h2>
          <ul style={styles.notesList}>
            <li>Community health index shows positive trend over the last 6 months</li>
            <li>Fatigue remains the most commonly reported symptom (45% of submissions)</li>
            <li>Age group 18-30 shows highest engagement in health reporting</li>
            <li>Weekly submissions have increased by 15% compared to last month</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f9fc',
  },
  header: {
    backgroundColor: 'white',
    padding: '20px 40px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4A90E2',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '10px 15px',
    borderRadius: '5px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  title: {
    color: '#2c3e50',
    margin: '0',
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
  },
  main: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginBottom: '40px',
  },
  insightCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease',
  },
  insightLabel: {
    color: '#5d7790',
    fontSize: '0.95rem',
    margin: '0 0 10px 0',
    fontWeight: '500',
  },
  insightValue: {
    color: '#2c3e50',
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 5px 0',
  },
  insightTrend: {
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  chartContainer: {
    marginBottom: '40px',
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
  },
  chartTitle: {
    color: '#2c3e50',
    margin: '0 0 30px 0',
    fontSize: '1.5rem',
  },
  chart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '300px',
    padding: '20px 0',
  },
  chartBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1',
    height: '100%',
  },
  chartBarWrapper: {
    flex: '1',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  chartBar: {
    width: '50px',
    borderRadius: '6px 6px 0 0',
    transition: 'height 0.3s ease',
  },
  chartLabel: {
    marginTop: '10px',
    color: '#5d7790',
    fontWeight: '500',
  },
  chartValue: {
    marginTop: '5px',
    color: '#2c3e50',
    fontWeight: '600',
  },
  notesCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
  },
  notesTitle: {
    color: '#2c3e50',
    margin: '0 0 20px 0',
    fontSize: '1.5rem',
  },
  notesList: {
    margin: '0',
    paddingLeft: '20px',
    color: '#5d7790',
    lineHeight: '1.8',
  },
};

// Add hover effects
Object.assign(styles.backButton, {
  ':hover': {
    backgroundColor: '#f0f8ff',
  }
});

Object.assign(styles.insightCard, {
  ':hover': {
    transform: 'translateY(-5px)',
  }
});

export default ViewCommunityInsights;