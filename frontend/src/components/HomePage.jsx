// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.title}>Community Health Connect</h1>
//         <p style={styles.subtitle}>
//           Bridging Data to Well-being: Your insights shape our community health.
//         </p>
//       </header>

//       <main style={styles.main}>
//         <div style={styles.cardContainer}>
//           <div style={styles.card} onClick={() => navigate('/submit')}>
//             <div style={styles.cardIcon}>
//               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 5V19M5 12H19" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <circle cx="12" cy="12" r="10" stroke="#4A90E2" strokeWidth="2"/>
//               </svg>
//             </div>
//             <h2 style={styles.cardTitle}>Submit Health Data</h2>
//             <p style={styles.cardDescription}>
//               Share your anonymous health data to help improve community well-being
//             </p>
//             <div style={styles.button}>Get Started</div>
//           </div>

//           <div style={styles.card} onClick={() => navigate('/insights')}>
//             <div style={styles.cardIcon}>
//               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 10L11 6L15 10L21 4M21 4V8M21 4H17" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             <h2 style={styles.cardTitle}>View Community Insights</h2>
//             <p style={styles.cardDescription}>
//               Explore anonymized health trends and patterns in your community
//             </p>
//             <div style={styles.button}>View Insights</div>
//           </div>
//         </div>
//       </main>

//       <footer style={styles.footer}>
//         <p style={styles.footerText}>Community Health Connect</p>
//       </footer>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: '#e8f4fc',
//     background: 'linear-gradient(135deg, #e8f4fc 0%, #f5f9fc 100%)',
//   },
//   header: {
//     textAlign: 'center',
//     padding: '40px 20px',
//     backgroundColor: 'white',
//     boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)',
//   },
//   title: {
//     fontSize: 'clamp(2rem, 5vw, 3.5rem)',
//     color: '#2c3e50',
//     margin: '0 0 15px 0',
//     fontWeight: '700',
//     letterSpacing: '-0.5px',
//   },
//   subtitle: {
//     fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
//     color: '#5d7790',
//     margin: '0',
//     maxWidth: '800px',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     lineHeight: '1.6',
//   },
//   main: {
//     flex: '1',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '40px 20px',
//   },
//   cardContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '40px',
//     maxWidth: '1200px',
//     width: '100%',
//   },
//   card: {
//     flex: '1',
//     minWidth: '300px',
//     maxWidth: '500px',
//     backgroundColor: 'white',
//     borderRadius: '20px',
//     padding: '40px 30px',
//     textAlign: 'center',
//     boxShadow: '0 10px 30px rgba(74, 144, 226, 0.1)',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     border: '1px solid rgba(74, 144, 226, 0.1)',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   cardIcon: {
//     marginBottom: '25px',
//     padding: '20px',
//     backgroundColor: '#f0f8ff',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardTitle: {
//     fontSize: 'clamp(1.5rem, 3vw, 2rem)',
//     color: '#2c3e50',
//     margin: '0 0 15px 0',
//     fontWeight: '600',
//   },
//   cardDescription: {
//     fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
//     color: '#5d7790',
//     lineHeight: '1.6',
//     marginBottom: '30px',
//     flex: '1',
//   },
//   button: {
//     backgroundColor: '#4A90E2',
//     color: 'white',
//     padding: '15px 40px',
//     borderRadius: '50px',
//     fontSize: '1.1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 5px 15px rgba(74, 144, 226, 0.3)',
//     width: 'fit-content',
//   },
//   footer: {
//     textAlign: 'center',
//     padding: '25px 20px',
//     backgroundColor: 'white',
//     borderTop: '1px solid rgba(0, 0, 0, 0.05)',
//   },
//   footerText: {
//     color: '#5d7790',
//     fontSize: '1rem',
//     margin: '0',
//     fontWeight: '500',
//   },
// };

// // Add hover effect
// Object.assign(styles.card, {
//   ':hover': {
//     transform: 'translateY(-10px)',
//     boxShadow: '0 15px 40px rgba(74, 144, 226, 0.2)',
//   }
// });

// Object.assign(styles.button, {
//   ':hover': {
//     backgroundColor: '#357ABD',
//     transform: 'translateY(-2px)',
//     boxShadow: '0 8px 20px rgba(74, 144, 226, 0.4)',
//   }
// });

// export default HomePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .card-hover-effect {
          position: relative;
          overflow: hidden;
        }
        
        .card-hover-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.7s;
        }
        
        .card-hover-effect:hover::before {
          left: 100%;
        }
        
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      
      <div style={styles.container}>
        <header style={{
          ...styles.header,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.8s ease-out'
        }}>
          <h1 style={{
            ...styles.title,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            animation: 'gradientBG 3s ease infinite'
          }}>
            Community Health Connect
          </h1>
          <p style={{
            ...styles.subtitle,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.2s'
          }}>
            Bridging Data to Well-being: Your insights shape our community health.
          </p>
        </header>

        <main style={styles.main}>
          <div style={styles.cardContainer}>
            {/* Card 1 */}
            <div 
              style={{
                ...styles.card,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.9)',
                animation: isVisible ? 'float 6s ease-in-out infinite' : 'none',
                animationDelay: '0.5s'
              }}
              className="card-hover-effect"
              onClick={(e) => {
                // Ripple effect
                const button = e.currentTarget;
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                  width: ${size}px;
                  height: ${size}px;
                  left: ${x}px;
                  top: ${y}px;
                `;
                ripple.classList.add('ripple-effect');
                button.appendChild(ripple);
                
                setTimeout(() => {
                  ripple.remove();
                  navigate('/submit');
                }, 600);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div style={{
                ...styles.cardIcon,
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="url(#grad1)" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 style={styles.cardTitle}>Submit Health Data</h2>
              <p style={styles.cardDescription}>
                Share your anonymous health data to help improve community well-being
              </p>
              <div style={styles.button}>
                Get Started
                <span style={styles.buttonArrow}>→</span>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              style={{
                ...styles.card,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.9)',
                animation: isVisible ? 'float 6s ease-in-out infinite 0.3s' : 'none'
              }}
              className="card-hover-effect"
              onClick={(e) => {
                const button = e.currentTarget;
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                  width: ${size}px;
                  height: ${size}px;
                  left: ${x}px;
                  top: ${y}px;
                `;
                ripple.classList.add('ripple-effect');
                button.appendChild(ripple);
                
                setTimeout(() => {
                  ripple.remove();
                  navigate('/insights');
                }, 600);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div style={{
                ...styles.cardIcon,
                animation: 'pulse 2s ease-in-out infinite 0.5s'
              }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 10L11 6L15 10L21 4M21 4V8M21 4H17" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#f093fb', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#f5576c', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 style={styles.cardTitle}>View Community Insights</h2>
              <p style={styles.cardDescription}>
                Explore anonymized health trends and patterns in your community
              </p>
              <div style={styles.button}>
                View Insights
                <span style={styles.buttonArrow}>→</span>
              </div>
            </div>
          </div>
        </main>

        <footer style={{
          ...styles.footer,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.5s'
        }}>
          <div style={styles.footerContent}>
            <p style={styles.footerText}>Community Health Connect</p>
            <div style={styles.footerSubtext}>
              Empowering communities through shared health insights
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradientBG 15s ease infinite',
    overflowX: 'hidden',
  },
  header: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    margin: '0 0 20px 0',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    lineHeight: '1.1',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
    color: '#4a5568',
    margin: '0 auto',
    maxWidth: '800px',
    lineHeight: '1.6',
    fontWeight: '500',
  },
  main: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '40px',
    maxWidth: '1200px',
    width: '100%',
  },
  card: {
    flex: '1',
    minWidth: '280px',
    maxWidth: '480px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '50px 35px',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    transformOrigin: 'center',
  },
  cardIcon: {
    marginBottom: '30px',
    padding: '25px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    background: 'linear-gradient(135deg, #4a5568, #2d3748)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 20px 0',
    fontWeight: '700',
    lineHeight: '1.3',
  },
  cardDescription: {
    fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
    color: '#4a5568',
    lineHeight: '1.7',
    marginBottom: '35px',
    flex: '1',
    fontWeight: '400',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '18px 45px',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonArrow: {
    fontSize: '1.5rem',
    fontWeight: '300',
    transition: 'transform 0.3s ease',
  },
  footer: {
    textAlign: 'center',
    padding: '35px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerText: {
    color: '#2d3748',
    fontSize: '1.3rem',
    margin: '0 0 10px 0',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  footerSubtext: {
    color: '#718096',
    fontSize: '1rem',
    fontWeight: '400',
  },
};

// Enhanced hover effects using inline styles with transitions
const enhancedCardStyle = {
  ...styles.card,
  ':hover': {
    transform: 'translateY(-15px) scale(1.02)',
    boxShadow: '0 30px 80px rgba(102, 126, 234, 0.3)',
  }
};

const enhancedButtonStyle = {
  ...styles.button,
  ':hover': {
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 35px rgba(102, 126, 234, 0.5)',
  },
  ':hover .buttonArrow': {
    transform: 'translateX(5px)',
  }
};

export default HomePage;
