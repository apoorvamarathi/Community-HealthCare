
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // const SubmitForm = () => {
// //   const navigate = useNavigate();
// //   const [isVisible, setIsVisible] = useState(false);

// //   useEffect(() => {
// //     // Trigger animations after component mounts
// //     setTimeout(() => setIsVisible(true), 100);
// //   }, []);

// //   const [formData, setFormData] = useState({
// //     type: "human",        // human or animal
// //     ageGroup: "",
// //     animalType: "",
// //     healthStatus: "",
// //     symptoms: "",
// //     notes: ""
// //   });

// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [success, setSuccess] = useState(false);

// //   // Handle input change
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   // Handle submit
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (isSubmitting) return;

// //     // Basic validation
// //     if (!formData.ageGroup || !formData.healthStatus) {
// //       alert("Please fill required fields");
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     const symptomsArray = formData.symptoms
// //       .split(",")
// //       .map(s => s.trim())
// //       .filter(Boolean);

// //     const isHuman = formData.type === "human";

// //     const url = isHuman
// //       ? "http://localhost:5001/api/humans"
// //       : "http://localhost:5001/api/animals";

// //     const payload = isHuman
// //       ? {
// //           ageGroup: formData.ageGroup,
// //           healthStatus: formData.healthStatus,
// //           symptoms: symptomsArray,
// //           notes: formData.notes
// //         }
// //       : {
// //           animalType: formData.animalType,
// //           ageGroup: formData.ageGroup,
// //           healthStatus: formData.healthStatus,
// //           symptoms: symptomsArray,
// //           notes: formData.notes
// //         };

// //     try {
// //       const response = await fetch(url, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!response.ok) {
// //         throw new Error("Server error");
// //       }

// //       await response.json();
// //       setSuccess(true);

// //       setTimeout(() => {
// //         navigate("/");
// //       }, 1500);

// //     } catch (error) {
// //       console.error(error);
// //       alert("Submission failed");
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes fadeIn {
// //           from { opacity: 0; transform: translateY(20px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
        
// //         @keyframes gradientBG {
// //           0% { background-position: 0% 50%; }
// //           50% { background-position: 100% 50%; }
// //           100% { background-position: 0% 50%; }
// //         }
        
// //         @keyframes pulse {
// //           0% { transform: scale(1); }
// //           50% { transform: scale(1.05); }
// //           100% { transform: scale(1); }
// //         }
        
// //         @keyframes spin {
// //           0% { transform: rotate(0deg); }
// //           100% { transform: rotate(360deg); }
// //         }
        
// //         .ripple {
// //           position: absolute;
// //           border-radius: 50%;
// //           background: rgba(255, 255, 255, 0.6);
// //           transform: scale(0);
// //           animation: ripple 0.6s linear;
// //         }
        
// //         @keyframes ripple {
// //           to {
// //             transform: scale(4);
// //             opacity: 0;
// //           }
// //         }
// //       `}</style>
      
// //       <div style={styles.container}>
// //         <header style={{
// //           ...styles.header,
// //           opacity: isVisible ? 1 : 0,
// //           transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
// //           transition: 'all 0.5s ease-out'
// //         }}>
// //           <button 
// //             style={{
// //               ...styles.backButton,
// //               opacity: isVisible ? 1 : 0,
// //               transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
// //               transition: 'all 0.5s ease-out 0.2s'
// //             }}
// //             onClick={(e) => {
// //               const button = e.currentTarget;
// //               const ripple = document.createElement('span');
// //               const rect = button.getBoundingClientRect();
// //               const size = Math.max(rect.width, rect.height);
// //               const x = e.clientX - rect.left - size / 2;
// //               const y = e.clientY - rect.top - size / 2;
              
// //               ripple.style.cssText = `
// //                 width: ${size}px;
// //                 height: ${size}px;
// //                 left: ${x}px;
// //                 top: ${y}px;
// //               `;
// //               ripple.classList.add('ripple');
// //               button.appendChild(ripple);
              
// //               setTimeout(() => {
// //                 ripple.remove();
// //                 navigate("/");
// //               }, 300);
// //             }}
// //             onMouseEnter={(e) => {
// //               e.currentTarget.style.transform = 'translateX(-5px)';
// //             }}
// //             onMouseLeave={(e) => {
// //               e.currentTarget.style.transform = 'translateX(0)';
// //             }}
// //             disabled={isSubmitting}
// //           >
// //             ← Back to Home
// //           </button>
// //           <h1 style={{
// //             ...styles.title,
// //             opacity: isVisible ? 1 : 0,
// //             transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
// //             transition: 'all 0.5s ease-out 0.3s'
// //           }}>
// //             Submit Health Data
// //           </h1>
// //         </header>

// //         <main style={styles.main}>
// //           <div style={styles.formContainer}>
// //             <div 
// //               style={{
// //                 ...styles.formCard,
// //                 opacity: isVisible ? 1 : 0,
// //                 transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
// //                 transition: 'all 0.5s ease-out 0.4s'
// //               }}
// //               onMouseEnter={(e) => {
// //                 if (!isSubmitting) {
// //                   e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
// //                 }
// //               }}
// //               onMouseLeave={(e) => {
// //                 e.currentTarget.style.transform = 'translateY(0) scale(1)';
// //               }}
// //             >
// //               <h2 style={styles.formTitle}>Share Your Health Information</h2>
// //               <p style={styles.formDescription}>
// //                 Your data helps us understand community health trends. All information is anonymous.
// //               </p>

// //               {success && (
// //                 <div style={styles.successMessage}>
// //                   <div style={styles.successIcon}>✓</div>
// //                   <div>
// //                     <h3 style={styles.successTitle}>Success!</h3>
// //                     <p style={styles.successText}>Data submitted successfully!</p>
// //                     <p style={styles.successSubtext}>Redirecting to home page...</p>
// //                   </div>
// //                 </div>
// //               )}

// //               <form onSubmit={handleSubmit} style={styles.form}>
// //                 {/* Type */}
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>
// //                     Data Type <span style={styles.required}>*</span>
// //                   </label>
// //                   <select 
// //                     style={{
// //                       ...styles.select,
// //                       ...(isSubmitting && styles.disabled)
// //                     }}
// //                     name="type" 
// //                     value={formData.type} 
// //                     onChange={handleChange}
// //                     disabled={isSubmitting}
// //                   >
// //                     <option value="human">Human</option>
// //                     <option value="animal">Animal</option>
// //                   </select>
// //                 </div>

// //                 {/* Animal type */}
// //                 {formData.type === "animal" && (
// //                   <div style={styles.formGroup}>
// //                     <label style={styles.label}>
// //                       Animal Type <span style={styles.required}>*</span>
// //                     </label>
// //                     <input
// //                       style={{
// //                         ...styles.input,
// //                         ...(isSubmitting && styles.disabled)
// //                       }}
// //                       type="text"
// //                       name="animalType"
// //                       placeholder="e.g., Dog, Cat, Cow, Bird..."
// //                       value={formData.animalType}
// //                       onChange={handleChange}
// //                       required
// //                       disabled={isSubmitting}
// //                     />
// //                   </div>
// //                 )}

// //                 {/* Age Group */}
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>
// //                     Age Group <span style={styles.required}>*</span>
// //                   </label>
// //                   <input
// //                     style={{
// //                       ...styles.input,
// //                       ...(isSubmitting && styles.disabled)
// //                     }}
// //                     type="text"
// //                     name="ageGroup"
// //                     placeholder="e.g., Child (0-12), Teen (13-19), Adult (20-59), Senior (60+)"
// //                     value={formData.ageGroup}
// //                     onChange={handleChange}
// //                     required
// //                     disabled={isSubmitting}
// //                   />
// //                 </div>

// //                 {/* Health Status */}
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>
// //                     Health Status <span style={styles.required}>*</span>
// //                   </label>
// //                   <input
// //                     style={{
// //                       ...styles.input,
// //                       ...(isSubmitting && styles.disabled)
// //                     }}
// //                     type="text"
// //                     name="healthStatus"
// //                     placeholder="e.g., Good, Fair, Poor, Excellent"
// //                     value={formData.healthStatus}
// //                     onChange={handleChange}
// //                     required
// //                     disabled={isSubmitting}
// //                   />
// //                 </div>

// //                 {/* Symptoms */}
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Symptoms</label>
// //                   <input
// //                     style={{
// //                       ...styles.input,
// //                       ...(isSubmitting && styles.disabled)
// //                     }}
// //                     type="text"
// //                     name="symptoms"
// //                     placeholder="Fever, Cough, Headache (comma separated)"
// //                     value={formData.symptoms}
// //                     onChange={handleChange}
// //                     disabled={isSubmitting}
// //                   />
// //                   <p style={styles.inputHint}>Separate symptoms with commas</p>
// //                 </div>

// //                 {/* Notes */}
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>Additional Notes</label>
// //                   <textarea
// //                     style={{
// //                       ...styles.textarea,
// //                       ...(isSubmitting && styles.disabled)
// //                     }}
// //                     name="notes"
// //                     placeholder="Any additional information or concerns..."
// //                     value={formData.notes}
// //                     onChange={handleChange}
// //                     rows="4"
// //                     disabled={isSubmitting}
// //                   />
// //                 </div>

// //                 {/* Submit Button */}
// //                 <button 
// //                   type="submit" 
// //                   style={{
// //                     ...styles.submitButton,
// //                     ...(isSubmitting && styles.submittingButton),
// //                     ...(success && styles.successButton)
// //                   }}
// //                   onClick={(e) => {
// //                     if (!isSubmitting) {
// //                       const button = e.currentTarget;
// //                       const ripple = document.createElement('span');
// //                       const rect = button.getBoundingClientRect();
// //                       const size = Math.max(rect.width, rect.height);
// //                       const x = e.clientX - rect.left - size / 2;
// //                       const y = e.clientY - rect.top - size / 2;
                      
// //                       ripple.style.cssText = `
// //                         width: ${size}px;
// //                         height: ${size}px;
// //                         left: ${x}px;
// //                         top: ${y}px;
// //                       `;
// //                       ripple.classList.add('ripple');
// //                       button.appendChild(ripple);
                      
// //                       setTimeout(() => {
// //                         ripple.remove();
// //                       }, 600);
// //                     }
// //                   }}
// //                   onMouseEnter={(e) => {
// //                     if (!isSubmitting && !success) {
// //                       e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
// //                     }
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     e.currentTarget.style.transform = 'translateY(0) scale(1)';
// //                   }}
// //                   disabled={isSubmitting || success}
// //                 >
// //                   {isSubmitting ? (
// //                     <>
// //                       <span style={styles.spinner}></span>
// //                       Submitting...
// //                     </>
// //                   ) : success ? (
// //                     <>
// //                       <span style={styles.successIconSmall}>✓</span>
// //                       Submitted Successfully!
// //                     </>
// //                   ) : (
// //                     'Submit Anonymously'
// //                   )}
// //                 </button>
// //               </form>

// //               {/* Privacy Note */}
// //               <div style={styles.privacyNote}>
// //                 <span style={styles.privacyIcon}>🔒</span>
// //                 <div>
// //                   <p style={styles.privacyText}>Your data is completely anonymous</p>
// //                   <p style={styles.privacySubtext}>No personal information is collected or stored</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </main>
// //       </div>
// //     </>
// //   );
// // };

// // const styles = {
// //   container: {
// //     minHeight: '100vh',
// //     display: 'flex',
// //     flexDirection: 'column',
// //     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
// //     backgroundSize: '400% 400%',
// //     animation: 'gradientBG 15s ease infinite',
// //     fontFamily: 'Arial, sans-serif',
// //   },
// //   header: {
// //     padding: '40px 20px',
// //     backgroundColor: 'rgba(255, 255, 255, 0.95)',
// //     backdropFilter: 'blur(10px)',
// //     boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
// //     borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     position: 'relative',
// //   },
// //   backButton: {
// //     position: 'absolute',
// //     left: '20px',
// //     top: '20px',
// //     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //     color: 'white',
// //     border: 'none',
// //     padding: '12px 25px',
// //     borderRadius: '50px',
// //     fontSize: '1rem',
// //     fontWeight: '600',
// //     cursor: 'pointer',
// //     transition: 'all 0.3s ease',
// //     boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '8px',
// //     zIndex: 10,
// //   },
// //   title: {
// //     fontSize: 'clamp(2rem, 5vw, 3.5rem)',
// //     textAlign: 'center',
// //     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
// //     WebkitBackgroundClip: 'text',
// //     WebkitTextFillColor: 'transparent',
// //     margin: '0',
// //     fontWeight: '800',
// //     letterSpacing: '-0.5px',
// //     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
// //     width: '100%',
// //   },
// //   main: {
// //     flex: 1,
// //     padding: '40px 20px',
// //     display: 'flex',
// //     justifyContent: 'center',
// //     alignItems: 'flex-start',
// //   },
// //   formContainer: {
// //     width: '100%',
// //     maxWidth: '600px',
// //   },
// //   formCard: {
// //     background: 'rgba(255, 255, 255, 0.95)',
// //     backdropFilter: 'blur(20px)',
// //     borderRadius: '24px',
// //     padding: '50px 40px',
// //     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
// //     border: '1px solid rgba(255, 255, 255, 0.3)',
// //     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
// //   },
// //   formTitle: {
// //     fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
// //     background: 'linear-gradient(135deg, #4a5568, #2d3748)',
// //     WebkitBackgroundClip: 'text',
// //     WebkitTextFillColor: 'transparent',
// //     margin: '0 0 15px 0',
// //     fontWeight: '700',
// //     textAlign: 'center',
// //   },
// //   formDescription: {
// //     fontSize: 'clamp(1rem, 2vw, 1.2rem)',
// //     color: '#4a5568',
// //     textAlign: 'center',
// //     margin: '0 auto 40px auto',
// //     maxWidth: '500px',
// //     lineHeight: '1.6',
// //     fontWeight: '400',
// //   },
// //   form: {
// //     width: '100%',
// //   },
// //   formGroup: {
// //     marginBottom: '30px',
// //   },
// //   label: {
// //     display: 'block',
// //     fontSize: '1.1rem',
// //     fontWeight: '600',
// //     color: '#2d3748',
// //     marginBottom: '12px',
// //     letterSpacing: '0.5px',
// //   },
// //   required: {
// //     color: '#f56565',
// //     marginLeft: '4px',
// //   },
// //   input: {
// //     width: '100%',
// //     padding: '18px 20px',
// //     fontSize: '1rem',
// //     border: '2px solid #e2e8f0',
// //     borderRadius: '15px',
// //     backgroundColor: 'white',
// //     color: '#4a5568',
// //     transition: 'all 0.3s ease',
// //     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
// //   },
// //   select: {
// //     width: '100%',
// //     padding: '18px 20px',
// //     fontSize: '1rem',
// //     border: '2px solid #e2e8f0',
// //     borderRadius: '15px',
// //     backgroundColor: 'white',
// //     color: '#4a5568',
// //     transition: 'all 0.3s ease',
// //     appearance: 'none',
// //     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
// //     backgroundRepeat: 'no-repeat',
// //     backgroundPosition: 'right 20px center',
// //     backgroundSize: '20px',
// //     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
// //   },
// //   textarea: {
// //     width: '100%',
// //     padding: '20px',
// //     fontSize: '1rem',
// //     border: '2px solid #e2e8f0',
// //     borderRadius: '15px',
// //     backgroundColor: 'white',
// //     color: '#4a5568',
// //     transition: 'all 0.3s ease',
// //     resize: 'vertical',
// //     minHeight: '120px',
// //     fontFamily: 'inherit',
// //     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
// //   },
// //   inputHint: {
// //     fontSize: '0.85rem',
// //     color: '#718096',
// //     marginTop: '8px',
// //     fontStyle: 'italic',
// //   },
// //   submitButton: {
// //     width: '100%',
// //     padding: '22px',
// //     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: '15px',
// //     fontSize: '1.2rem',
// //     fontWeight: '600',
// //     cursor: 'pointer',
// //     transition: 'all 0.3s ease',
// //     boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
// //     marginTop: '20px',
// //     position: 'relative',
// //     overflow: 'hidden',
// //     display: 'flex',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     gap: '12px',
// //   },
// //   submittingButton: {
// //     background: 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)',
// //     cursor: 'not-allowed',
// //   },
// //   successButton: {
// //     background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
// //     cursor: 'default',
// //   },
// //   spinner: {
// //     width: '20px',
// //     height: '20px',
// //     border: '3px solid rgba(255, 255, 255, 0.3)',
// //     borderTop: '3px solid white',
// //     borderRadius: '50%',
// //     animation: 'spin 1s linear infinite',
// //   },
// //   successIconSmall: {
// //     fontSize: '1.5rem',
// //     fontWeight: 'bold',
// //   },
// //   successMessage: {
// //     backgroundColor: 'rgba(198, 246, 213, 0.9)',
// //     backdropFilter: 'blur(10px)',
// //     color: '#22543d',
// //     padding: '25px',
// //     borderRadius: '15px',
// //     marginBottom: '30px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '20px',
// //     border: '2px solid #48bb78',
// //   },
// //   successIcon: {
// //     backgroundColor: '#48bb78',
// //     width: '50px',
// //     height: '50px',
// //     borderRadius: '50%',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     fontSize: '24px',
// //     fontWeight: 'bold',
// //     color: 'white',
// //     flexShrink: 0,
// //   },
// //   successTitle: {
// //     fontSize: '1.3rem',
// //     fontWeight: '700',
// //     margin: '0 0 5px 0',
// //     color: '#22543d',
// //   },
// //   successText: {
// //     fontSize: '1rem',
// //     margin: '0 0 5px 0',
// //     color: '#22543d',
// //   },
// //   successSubtext: {
// //     fontSize: '0.9rem',
// //     margin: '0',
// //     color: '#38a169',
// //     fontWeight: '500',
// //   },
// //   privacyNote: {
// //     textAlign: 'center',
// //     color: '#4a5568',
// //     fontSize: '0.9rem',
// //     marginTop: '30px',
// //     padding: '20px',
// //     backgroundColor: 'rgba(247, 250, 252, 0.7)',
// //     borderRadius: '12px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     gap: '15px',
// //     border: '1px solid rgba(226, 232, 240, 0.5)',
// //   },
// //   privacyIcon: {
// //     fontSize: '1.5rem',
// //     flexShrink: 0,
// //   },
// //   privacyText: {
// //     fontSize: '1rem',
// //     fontWeight: '600',
// //     margin: '0 0 5px 0',
// //     color: '#2d3748',
// //   },
// //   privacySubtext: {
// //     fontSize: '0.85rem',
// //     margin: '0',
// //     color: '#718096',
// //   },
// //   disabled: {
// //     opacity: 0.6,
// //     cursor: 'not-allowed',
// //   }
// // };

// // export default SubmitForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SubmitForm = () => {
//   const navigate = useNavigate();
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setIsVisible(true), 100);
//   }, []);

//   const [formData, setFormData] = useState({
//     type: "human",
//     ageGroup: "",
//     animalType: "",
//     healthStatus: "",
//     symptoms: "",
//     notes: ""
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     if (!formData.ageGroup || !formData.healthStatus) {
//       alert("Please fill required fields");
//       return;
//     }

//     setIsSubmitting(true);

//     const symptomsArray = formData.symptoms
//       .split(",")
//       .map(s => s.trim())
//       .filter(Boolean);

//     const isHuman = formData.type === "human";
//     const url = "http://localhost:5001/api/health-data"; // Updated endpoint
    
//     const payload = {
//       type: formData.type,
//       ageGroup: formData.ageGroup,
//       healthStatus: formData.healthStatus,
//       symptoms: symptomsArray,
//       notes: formData.notes,
//       animalType: formData.type === "animal" ? formData.animalType : undefined
//     };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error("Server error");
//       }

//       const result = await response.json();
      
//       // Update analytics in real-time after successful submission
//       try {
//         await fetch("http://localhost:5001/api/analytics/generate", {
//           method: "GET"
//         });
        
//         // Broadcast real-time update
//         await fetch("http://localhost:5001/api/analytics/broadcast", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ action: "new_submission", timestamp: new Date() })
//         });
//       } catch (analyticsError) {
//         console.log("Analytics update skipped");
//       }
      
//       setSuccess(true);

//       setTimeout(() => {
//         navigate("/");
//       }, 1500);

//     } catch (error) {
//       console.error(error);
//       alert("Submission failed");
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes gradientBG {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
        
//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//           100% { transform: scale(1); }
//         }
        
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         .ripple {
//           position: absolute;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.6);
//           transform: scale(0);
//           animation: ripple 0.6s linear;
//         }
        
//         @keyframes ripple {
//           to {
//             transform: scale(4);
//             opacity: 0;
//           }
//         }
//       `}</style>
      
//       <div style={styles.container}>
//         <header style={{
//           ...styles.header,
//           opacity: isVisible ? 1 : 0,
//           transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
//           transition: 'all 0.5s ease-out'
//         }}>
//           <button 
//             style={{
//               ...styles.backButton,
//               opacity: isVisible ? 1 : 0,
//               transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
//               transition: 'all 0.5s ease-out 0.2s'
//             }}
//             onClick={(e) => {
//               const button = e.currentTarget;
//               const ripple = document.createElement('span');
//               const rect = button.getBoundingClientRect();
//               const size = Math.max(rect.width, rect.height);
//               const x = e.clientX - rect.left - size / 2;
//               const y = e.clientY - rect.top - size / 2;
              
//               ripple.style.cssText = `
//                 width: ${size}px;
//                 height: ${size}px;
//                 left: ${x}px;
//                 top: ${y}px;
//               `;
//               ripple.classList.add('ripple');
//               button.appendChild(ripple);
              
//               setTimeout(() => {
//                 ripple.remove();
//                 navigate("/");
//               }, 300);
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'translateX(-5px)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'translateX(0)';
//             }}
//             disabled={isSubmitting}
//           >
//             ← Back to Home
//           </button>
//           <h1 style={{
//             ...styles.title,
//             opacity: isVisible ? 1 : 0,
//             transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
//             transition: 'all 0.5s ease-out 0.3s'
//           }}>
//             Submit Health Data
//           </h1>
//         </header>

//         <main style={styles.main}>
//           <div style={styles.formContainer}>
//             <div 
//               style={{
//                 ...styles.formCard,
//                 opacity: isVisible ? 1 : 0,
//                 transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
//                 transition: 'all 0.5s ease-out 0.4s'
//               }}
//               onMouseEnter={(e) => {
//                 if (!isSubmitting) {
//                   e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0) scale(1)';
//               }}
//             >
//               <h2 style={styles.formTitle}>Share Your Health Information</h2>
//               <p style={styles.formDescription}>
//                 Your data helps us understand community health trends. All information is anonymous.
//               </p>

//               {success && (
//                 <div style={styles.successMessage}>
//                   <div style={styles.successIcon}>✓</div>
//                   <div>
//                     <h3 style={styles.successTitle}>Success!</h3>
//                     <p style={styles.successText}>Data submitted successfully!</p>
//                     <p style={styles.successSubtext}>
//                       Community analytics are now updating in real-time...
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} style={styles.form}>
//                 {/* Type */}
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>
//                     Data Type <span style={styles.required}>*</span>
//                   </label>
//                   <select 
//                     style={{
//                       ...styles.select,
//                       ...(isSubmitting && styles.disabled)
//                     }}
//                     name="type" 
//                     value={formData.type} 
//                     onChange={handleChange}
//                     disabled={isSubmitting}
//                   >
//                     <option value="human">Human</option>
//                     <option value="animal">Animal</option>
//                   </select>
//                 </div>

//                 {/* Animal type */}
//                 {formData.type === "animal" && (
//                   <div style={styles.formGroup}>
//                     <label style={styles.label}>
//                       Animal Type <span style={styles.required}>*</span>
//                     </label>
//                     <input
//                       style={{
//                         ...styles.input,
//                         ...(isSubmitting && styles.disabled)
//                       }}
//                       type="text"
//                       name="animalType"
//                       placeholder="e.g., Dog, Cat, Cow, Bird..."
//                       value={formData.animalType}
//                       onChange={handleChange}
//                       required
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 )}

//                 {/* Age Group */}
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>
//                     Age Group <span style={styles.required}>*</span>
//                   </label>
//                   <input
//                     style={{
//                       ...styles.input,
//                       ...(isSubmitting && styles.disabled)
//                     }}
//                     type="text"
//                     name="ageGroup"
//                     placeholder="e.g., Child (0-12), Teen (13-19), Adult (20-59), Senior (60+)"
//                     value={formData.ageGroup}
//                     onChange={handleChange}
//                     required
//                     disabled={isSubmitting}
//                   />
//                 </div>

//                 {/* Health Status */}
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>
//                     Health Status <span style={styles.required}>*</span>
//                   </label>
//                   <input
//                     style={{
//                       ...styles.input,
//                       ...(isSubmitting && styles.disabled)
//                     }}
//                     type="text"
//                     name="healthStatus"
//                     placeholder="e.g., Good, Fair, Poor, Excellent"
//                     value={formData.healthStatus}
//                     onChange={handleChange}
//                     required
//                     disabled={isSubmitting}
//                   />
//                 </div>

//                 {/* Symptoms */}
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Symptoms</label>
//                   <input
//                     style={{
//                       ...styles.input,
//                       ...(isSubmitting && styles.disabled)
//                     }}
//                     type="text"
//                     name="symptoms"
//                     placeholder="Fever, Cough, Headache (comma separated)"
//                     value={formData.symptoms}
//                     onChange={handleChange}
//                     disabled={isSubmitting}
//                   />
//                   <p style={styles.inputHint}>Separate symptoms with commas</p>
//                 </div>

//                 {/* Notes */}
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Additional Notes</label>
//                   <textarea
//                     style={{
//                       ...styles.textarea,
//                       ...(isSubmitting && styles.disabled)
//                     }}
//                     name="notes"
//                     placeholder="Any additional information or concerns..."
//                     value={formData.notes}
//                     onChange={handleChange}
//                     rows="4"
//                     disabled={isSubmitting}
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button 
//                   type="submit" 
//                   style={{
//                     ...styles.submitButton,
//                     ...(isSubmitting && styles.submittingButton),
//                     ...(success && styles.successButton)
//                   }}
//                   onClick={(e) => {
//                     if (!isSubmitting) {
//                       const button = e.currentTarget;
//                       const ripple = document.createElement('span');
//                       const rect = button.getBoundingClientRect();
//                       const size = Math.max(rect.width, rect.height);
//                       const x = e.clientX - rect.left - size / 2;
//                       const y = e.clientY - rect.top - size / 2;
                      
//                       ripple.style.cssText = `
//                         width: ${size}px;
//                         height: ${size}px;
//                         left: ${x}px;
//                         top: ${y}px;
//                       `;
//                       ripple.classList.add('ripple');
//                       button.appendChild(ripple);
                      
//                       setTimeout(() => {
//                         ripple.remove();
//                       }, 600);
//                     }
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isSubmitting && !success) {
//                       e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                   }}
//                   disabled={isSubmitting || success}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span style={styles.spinner}></span>
//                       Submitting...
//                     </>
//                   ) : success ? (
//                     <>
//                       <span style={styles.successIconSmall}>✓</span>
//                       Submitted Successfully!
//                     </>
//                   ) : (
//                     'Submit Anonymously'
//                   )}
//                 </button>
//               </form>

//               {/* Privacy Note */}
//               <div style={styles.privacyNote}>
//                 <span style={styles.privacyIcon}>🔒</span>
//                 <div>
//                   <p style={styles.privacyText}>Your data is completely anonymous</p>
//                   <p style={styles.privacySubtext}>
//                     Updates community analytics in real-time • No personal information collected
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
//     backgroundSize: '400% 400%',
//     animation: 'gradientBG 15s ease infinite',
//     fontFamily: 'Arial, sans-serif',
//   },
//   header: {
//     padding: '40px 20px',
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     backdropFilter: 'blur(10px)',
//     boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
//     borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   backButton: {
//     position: 'absolute',
//     left: '20px',
//     top: '20px',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     color: 'white',
//     border: 'none',
//     padding: '12px 25px',
//     borderRadius: '50px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     zIndex: 10,
//   },
//   title: {
//     fontSize: 'clamp(2rem, 5vw, 3.5rem)',
//     textAlign: 'center',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     margin: '0',
//     fontWeight: '800',
//     letterSpacing: '-0.5px',
//     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//   },
//   main: {
//     flex: 1,
//     padding: '40px 20px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: '600px',
//   },
//   formCard: {
//     background: 'rgba(255, 255, 255, 0.95)',
//     backdropFilter: 'blur(20px)',
//     borderRadius: '24px',
//     padding: '50px 40px',
//     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
//     border: '1px solid rgba(255, 255, 255, 0.3)',
//     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//   },
//   formTitle: {
//     fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
//     background: 'linear-gradient(135deg, #4a5568, #2d3748)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     margin: '0 0 15px 0',
//     fontWeight: '700',
//     textAlign: 'center',
//   },
//   formDescription: {
//     fontSize: 'clamp(1rem, 2vw, 1.2rem)',
//     color: '#4a5568',
//     textAlign: 'center',
//     margin: '0 auto 40px auto',
//     maxWidth: '500px',
//     lineHeight: '1.6',
//     fontWeight: '400',
//   },
//   form: {
//     width: '100%',
//   },
//   formGroup: {
//     marginBottom: '30px',
//   },
//   label: {
//     display: 'block',
//     fontSize: '1.1rem',
//     fontWeight: '600',
//     color: '#2d3748',
//     marginBottom: '12px',
//     letterSpacing: '0.5px',
//   },
//   required: {
//     color: '#f56565',
//     marginLeft: '4px',
//   },
//   input: {
//     width: '100%',
//     padding: '18px 20px',
//     fontSize: '1rem',
//     border: '2px solid #e2e8f0',
//     borderRadius: '15px',
//     backgroundColor: 'white',
//     color: '#4a5568',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
//   },
//   select: {
//     width: '100%',
//     padding: '18px 20px',
//     fontSize: '1rem',
//     border: '2px solid #e2e8f0',
//     borderRadius: '15px',
//     backgroundColor: 'white',
//     color: '#4a5568',
//     transition: 'all 0.3s ease',
//     appearance: 'none',
//     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 20px center',
//     backgroundSize: '20px',
//     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
//   },
//   textarea: {
//     width: '100%',
//     padding: '20px',
//     fontSize: '1rem',
//     border: '2px solid #e2e8f0',
//     borderRadius: '15px',
//     backgroundColor: 'white',
//     color: '#4a5568',
//     transition: 'all 0.3s ease',
//     resize: 'vertical',
//     minHeight: '120px',
//     fontFamily: 'inherit',
//     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
//   },
//   inputHint: {
//     fontSize: '0.85rem',
//     color: '#718096',
//     marginTop: '8px',
//     fontStyle: 'italic',
//   },
//   submitButton: {
//     width: '100%',
//     padding: '22px',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '15px',
//     fontSize: '1.2rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
//     marginTop: '20px',
//     position: 'relative',
//     overflow: 'hidden',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: '12px',
//   },
//   submittingButton: {
//     background: 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)',
//     cursor: 'not-allowed',
//   },
//   successButton: {
//     background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
//     cursor: 'default',
//   },
//   spinner: {
//     width: '20px',
//     height: '20px',
//     border: '3px solid rgba(255, 255, 255, 0.3)',
//     borderTop: '3px solid white',
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite',
//   },
//   successIconSmall: {
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//   },
//   successMessage: {
//     backgroundColor: 'rgba(198, 246, 213, 0.9)',
//     backdropFilter: 'blur(10px)',
//     color: '#22543d',
//     padding: '25px',
//     borderRadius: '15px',
//     marginBottom: '30px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '20px',
//     border: '2px solid #48bb78',
//   },
//   successIcon: {
//     backgroundColor: '#48bb78',
//     width: '50px',
//     height: '50px',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: 'white',
//     flexShrink: 0,
//   },
//   successTitle: {
//     fontSize: '1.3rem',
//     fontWeight: '700',
//     margin: '0 0 5px 0',
//     color: '#22543d',
//   },
//   successText: {
//     fontSize: '1rem',
//     margin: '0 0 5px 0',
//     color: '#22543d',
//   },
//   successSubtext: {
//     fontSize: '0.9rem',
//     margin: '0',
//     color: '#38a169',
//     fontWeight: '500',
//   },
//   privacyNote: {
//     textAlign: 'center',
//     color: '#4a5568',
//     fontSize: '0.9rem',
//     marginTop: '30px',
//     padding: '20px',
//     backgroundColor: 'rgba(247, 250, 252, 0.7)',
//     borderRadius: '12px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '15px',
//     border: '1px solid rgba(226, 232, 240, 0.5)',
//   },
//   privacyIcon: {
//     fontSize: '1.5rem',
//     flexShrink: 0,
//   },
//   privacyText: {
//     fontSize: '1rem',
//     fontWeight: '600',
//     margin: '0 0 5px 0',
//     color: '#2d3748',
//   },
//   privacySubtext: {
//     fontSize: '0.85rem',
//     margin: '0',
//     color: '#718096',
//   },
//   disabled: {
//     opacity: 0.6,
//     cursor: 'not-allowed',
//   }
// };

// export default SubmitForm;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubmitForm = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const [formData, setFormData] = useState({
    type: "human",
    ageGroup: "",
    animalType: "",
    healthStatus: "",
    symptoms: "",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Reset error message
    setErrorMessage("");

    // Basic validation
    if (!formData.ageGroup || !formData.healthStatus) {
      setErrorMessage("Please fill in required fields (Age Group and Health Status)");
      return;
    }

    if (formData.type === "animal" && !formData.animalType) {
      setErrorMessage("Please fill in Animal Type for animal submissions");
      return;
    }

    setIsSubmitting(true);

    // Convert symptoms string to array
    const symptomsArray = formData.symptoms
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const isHuman = formData.type === "human";
    
    // Use correct endpoints that exist in your backend
    const url = isHuman
      ? "http://localhost:5001/api/humans"
      : "http://localhost:5001/api/animals";
    
    const payload = isHuman
      ? {
          ageGroup: formData.ageGroup,
          healthStatus: formData.healthStatus,
          symptoms: symptomsArray,
          notes: formData.notes
        }
      : {
          animalType: formData.animalType,
          ageGroup: formData.ageGroup,
          healthStatus: formData.healthStatus,
          symptoms: symptomsArray,
          notes: formData.notes
        };

    try {
      console.log("Submitting to:", url);
      console.log("Payload:", payload);

      const response = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        let errorText = "Server error";
        try {
          const errorData = await response.json();
          errorText = errorData.message || errorText;
        } catch (e) {
          // If response is not JSON, get text
          const text = await response.text();
          if (text) errorText = text;
        }
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log("Success response:", result);
      
      // Update analytics in real-time after successful submission
      try {
        console.log("Updating analytics...");
        const analyticsResponse = await fetch("http://localhost:5001/api/analytics/generate", {
          method: "GET"
        });
        
        if (analyticsResponse.ok) {
          console.log("Analytics updated successfully");
        }
      } catch (analyticsError) {
        console.log("Analytics update skipped:", analyticsError.message);
        // Don't fail the whole submission if analytics fails
      }
      
      setSuccess(true);

      // Reset form after successful submission
      setFormData({
        type: "human",
        ageGroup: "",
        animalType: "",
        healthStatus: "",
        symptoms: "",
        notes: ""
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("Submission error details:", error);
      setErrorMessage(error.message || "Submission failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .ripple {
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
      
      <div style={styles.container}>
        <header style={{
          ...styles.header,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.5s ease-out'
        }}>
          <button 
            style={{
              ...styles.backButton,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'all 0.5s ease-out 0.2s'
            }}
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
              ripple.classList.add('ripple');
              button.appendChild(ripple);
              
              setTimeout(() => {
                ripple.remove();
                navigate("/");
              }, 300);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
            disabled={isSubmitting}
          >
            ← Back to Home
          </button>
          <h1 style={{
            ...styles.title,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.5s ease-out 0.3s'
          }}>
            Submit Health Data
          </h1>
        </header>

        <main style={styles.main}>
          <div style={styles.formContainer}>
            <div 
              style={{
                ...styles.formCard,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: 'all 0.5s ease-out 0.4s'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <h2 style={styles.formTitle}>Share Your Health Information</h2>
              <p style={styles.formDescription}>
                Your data helps us understand community health trends. All information is anonymous.
              </p>

              {errorMessage && (
                <div style={{
                  ...styles.errorMessage,
                  animation: 'shake 0.5s ease-in-out'
                }}>
                  <div style={styles.errorIcon}>❌</div>
                  <div>
                    <h3 style={styles.errorTitle}>Error</h3>
                    <p style={styles.errorText}>{errorMessage}</p>
                  </div>
                </div>
              )}

              {success && (
                <div style={styles.successMessage}>
                  <div style={styles.successIcon}>✓</div>
                  <div>
                    <h3 style={styles.successTitle}>Success!</h3>
                    <p style={styles.successText}>Data submitted successfully!</p>
                    <p style={styles.successSubtext}>
                      Analytics are updating... Redirecting to home page...
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} style={styles.form}>
                {/* Type */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Data Type <span style={styles.required}>*</span>
                  </label>
                  <select 
                    style={{
                      ...styles.select,
                      ...(isSubmitting && styles.disabled)
                    }}
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    disabled={isSubmitting || success}
                  >
                    <option value="human">Human</option>
                    <option value="animal">Animal</option>
                  </select>
                </div>

                {/* Animal type */}
                {formData.type === "animal" && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Animal Type <span style={styles.required}>*</span>
                    </label>
                    <input
                      style={{
                        ...styles.input,
                        ...(isSubmitting && styles.disabled)
                      }}
                      type="text"
                      name="animalType"
                      placeholder="e.g., Dog, Cat, Cow, Bird..."
                      value={formData.animalType}
                      onChange={handleChange}
                      required={formData.type === "animal"}
                      disabled={isSubmitting || success}
                    />
                  </div>
                )}

                {/* Age Group */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Age Group <span style={styles.required}>*</span>
                  </label>
                  <input
                    style={{
                      ...styles.input,
                      ...(isSubmitting && styles.disabled)
                    }}
                    type="text"
                    name="ageGroup"
                    placeholder="e.g., Child (0-12), Teen (13-19), Adult (20-59), Senior (60+)"
                    value={formData.ageGroup}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting || success}
                  />
                </div>

                {/* Health Status */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Health Status <span style={styles.required}>*</span>
                  </label>
                  <input
                    style={{
                      ...styles.input,
                      ...(isSubmitting && styles.disabled)
                    }}
                    type="text"
                    name="healthStatus"
                    placeholder="e.g., Good, Fair, Poor, Excellent"
                    value={formData.healthStatus}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting || success}
                  />
                </div>

                {/* Symptoms */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Symptoms</label>
                  <input
                    style={{
                      ...styles.input,
                      ...(isSubmitting && styles.disabled)
                    }}
                    type="text"
                    name="symptoms"
                    placeholder="Fever, Cough, Headache (comma separated)"
                    value={formData.symptoms}
                    onChange={handleChange}
                    disabled={isSubmitting || success}
                  />
                  <p style={styles.inputHint}>Separate symptoms with commas</p>
                </div>

                {/* Notes */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Additional Notes</label>
                  <textarea
                    style={{
                      ...styles.textarea,
                      ...(isSubmitting && styles.disabled)
                    }}
                    name="notes"
                    placeholder="Any additional information or concerns..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    disabled={isSubmitting || success}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  style={{
                    ...styles.submitButton,
                    ...(isSubmitting && styles.submittingButton),
                    ...(success && styles.successButton),
                    ...(errorMessage && styles.errorButton)
                  }}
                  onClick={(e) => {
                    if (!isSubmitting) {
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
                      ripple.classList.add('ripple');
                      button.appendChild(ripple);
                      
                      setTimeout(() => {
                        ripple.remove();
                      }, 600);
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && !success) {
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                  disabled={isSubmitting || success}
                >
                  {isSubmitting ? (
                    <>
                      <span style={styles.spinner}></span>
                      Submitting...
                    </>
                  ) : success ? (
                    <>
                      <span style={styles.successIconSmall}>✓</span>
                      Submitted Successfully!
                    </>
                  ) : errorMessage ? (
                    'Try Again'
                  ) : (
                    'Submit Anonymously'
                  )}
                </button>
              </form>

              {/* Privacy Note */}
              <div style={styles.privacyNote}>
                <span style={styles.privacyIcon}>🔒</span>
                <div>
                  <p style={styles.privacyText}>Your data is completely anonymous</p>
                  <p style={styles.privacySubtext}>
                    No personal information collected • Data stored securely in MongoDB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
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
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    padding: '40px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: '20px',
    top: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 10,
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  main: {
    flex: 1,
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  formContainer: {
    width: '100%',
    maxWidth: '600px',
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '50px 40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  formTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    background: 'linear-gradient(135deg, #4a5568, #2d3748)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 15px 0',
    fontWeight: '700',
    textAlign: 'center',
  },
  formDescription: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#4a5568',
    textAlign: 'center',
    margin: '0 auto 40px auto',
    maxWidth: '500px',
    lineHeight: '1.6',
    fontWeight: '400',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '30px',
  },
  label: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '12px',
    letterSpacing: '0.5px',
  },
  required: {
    color: '#f56565',
    marginLeft: '4px',
  },
  input: {
    width: '100%',
    padding: '18px 20px',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '15px',
    backgroundColor: 'white',
    color: '#4a5568',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
  },
  select: {
    width: '100%',
    padding: '18px 20px',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '15px',
    backgroundColor: 'white',
    color: '#4a5568',
    transition: 'all 0.3s ease',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 20px center',
    backgroundSize: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
  },
  textarea: {
    width: '100%',
    padding: '20px',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '15px',
    backgroundColor: 'white',
    color: '#4a5568',
    transition: 'all 0.3s ease',
    resize: 'vertical',
    minHeight: '120px',
    fontFamily: 'inherit',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
  },
  inputHint: {
    fontSize: '0.85rem',
    color: '#718096',
    marginTop: '8px',
    fontStyle: 'italic',
  },
  submitButton: {
    width: '100%',
    padding: '22px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
    marginTop: '20px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
  },
  submittingButton: {
    background: 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)',
    cursor: 'not-allowed',
  },
  successButton: {
    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
    cursor: 'default',
  },
  errorButton: {
    background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
    animation: 'pulse 0.5s ease-in-out',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  successIconSmall: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  successMessage: {
    backgroundColor: 'rgba(198, 246, 213, 0.9)',
    backdropFilter: 'blur(10px)',
    color: '#22543d',
    padding: '25px',
    borderRadius: '15px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    border: '2px solid #48bb78',
  },
  successIcon: {
    backgroundColor: '#48bb78',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    flexShrink: 0,
  },
  successTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    margin: '0 0 5px 0',
    color: '#22543d',
  },
  successText: {
    fontSize: '1rem',
    margin: '0 0 5px 0',
    color: '#22543d',
  },
  successSubtext: {
    fontSize: '0.9rem',
    margin: '0',
    color: '#38a169',
    fontWeight: '500',
  },
  errorMessage: {
    backgroundColor: 'rgba(254, 215, 215, 0.9)',
    backdropFilter: 'blur(10px)',
    color: '#742a2a',
    padding: '25px',
    borderRadius: '15px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    border: '2px solid #f56565',
  },
  errorIcon: {
    backgroundColor: '#f56565',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    flexShrink: 0,
  },
  errorTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    margin: '0 0 5px 0',
    color: '#742a2a',
  },
  errorText: {
    fontSize: '1rem',
    margin: '0',
    color: '#742a2a',
    fontWeight: '500',
  },
  privacyNote: {
    textAlign: 'center',
    color: '#4a5568',
    fontSize: '0.9rem',
    marginTop: '30px',
    padding: '20px',
    backgroundColor: 'rgba(247, 250, 252, 0.7)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    border: '1px solid rgba(226, 232, 240, 0.5)',
  },
  privacyIcon: {
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  privacyText: {
    fontSize: '1rem',
    fontWeight: '600',
    margin: '0 0 5px 0',
    color: '#2d3748',
  },
  privacySubtext: {
    fontSize: '0.85rem',
    margin: '0',
    color: '#718096',
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    backgroundColor: '#f7fafc',
  }
};

export default SubmitForm;