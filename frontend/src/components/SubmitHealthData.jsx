import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitHealthData = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h1 style={styles.title}>Submit Health Data</h1>
      </header>

      <main style={styles.main}>
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>Share Your Health Information</h2>
            <p style={styles.formDescription}>
              Your data helps us understand community health trends. All information is anonymous and secure.
            </p>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Age Group</label>
              <select style={styles.select}>
                <option>Under 18</option>
                <option>18-30</option>
                <option>31-45</option>
                <option>46-60</option>
                <option>Over 60</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>General Health Status</label>
              <div style={styles.radioGroup}>
                {['Excellent', 'Good', 'Fair', 'Poor'].map(status => (
                  <label key={status} style={styles.radioLabel}>
                    <input type="radio" name="healthStatus" style={styles.radioInput} />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Symptoms (Select all that apply)</label>
              <div style={styles.checkboxGroup}>
                {['Fever', 'Cough', 'Fatigue', 'Headache', 'Other'].map(symptom => (
                  <label key={symptom} style={styles.checkboxLabel}>
                    <input type="checkbox" style={styles.checkboxInput} />
                    <span>{symptom}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Additional Notes (Optional)</label>
              <textarea 
                style={styles.textarea}
                placeholder="Any additional health information you'd like to share..."
                rows="4"
              />
            </div>

            <button style={styles.submitButton} onClick={() => navigate('/')}>
              Submit Anonymously
            </button>
          </div>
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
    maxWidth: '800px',
    margin: '0 auto',
  },
  formContainer: {
    width: '100%',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  },
  formTitle: {
    color: '#2c3e50',
    margin: '0 0 10px 0',
    fontSize: '1.8rem',
  },
  formDescription: {
    color: '#5d7790',
    margin: '0 0 30px 0',
    lineHeight: '1.6',
  },
  formGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    color: '#2c3e50',
    fontWeight: '500',
    fontSize: '1.1rem',
  },
  select: {
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    backgroundColor: '#fafafa',
  },
  radioGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: '#5d7790',
  },
  radioInput: {
    cursor: 'pointer',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    color: '#5d7790',
  },
  checkboxInput: {
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    backgroundColor: '#fafafa',
    fontFamily: 'inherit',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    padding: '18px 40px',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease',
    marginTop: '20px',
  },
};

// Add hover effects
Object.assign(styles.backButton, {
  ':hover': {
    backgroundColor: '#f0f8ff',
  }
});

Object.assign(styles.submitButton, {
  ':hover': {
    backgroundColor: '#357ABD',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(74, 144, 226, 0.3)',
  }
});

export default SubmitHealthData;