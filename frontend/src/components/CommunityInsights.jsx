import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CommunityInsights = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    fetchRealData();
    
    // Set up polling every 10 seconds
    const intervalId = setInterval(fetchRealData, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  const fetchRealData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("http://localhost:5001/api/analytics/realtime");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setAnalyticsData(result.data);
        setLastUpdate(new Date());
      } else {
        throw new Error(result.message || "Failed to fetch analytics");
      }
    } catch (error) {
      console.error("Error fetching real data:", error);
      setError(error.message);
      // Don't use demo data - show empty state instead
      setAnalyticsData({
        totalHumanSubmissions: 0,
        totalAnimalSubmissions: 0,
        totalSubmissions: 0,
        healthStatusDistribution: { excellent: 0, good: 0, fair: 0, poor: 0 },
        topSymptoms: [],
        ageGroupDistribution: {},
        animalTypeDistribution: {},
        submissionsByDay: [],
        highRiskCount: 0,
        mediumRiskCount: 0,
        lowRiskCount: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePercentage = (value, total) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const data = analyticsData || {
    totalHumanSubmissions: 0,
    totalAnimalSubmissions: 0,
    totalSubmissions: 0,
    healthStatusDistribution: { excellent: 0, good: 0, fair: 0, poor: 0 },
    topSymptoms: [],
    ageGroupDistribution: {},
    animalTypeDistribution: {},
    submissionsByDay: [],
    highRiskCount: 0,
    mediumRiskCount: 0,
    lowRiskCount: 0
  };

  const totalSubmissions = data.totalHumanSubmissions + data.totalAnimalSubmissions;

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
        
        @keyframes progressBar {
          from { width: 0%; }
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
          to { transform: scale(4); opacity: 0; }
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
            disabled={isLoading}
          >
            ← Back to Home
          </button>
          <h1 style={{
            ...styles.title,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.5s ease-out 0.3s'
          }}>
            Community Health Insights
          </h1>
          <p style={{
            ...styles.subtitle,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out 0.4s'
          }}>
            Real analytics from your submitted data
          </p>
          
          {/* Status Indicator */}
          <div style={{
            ...styles.statusIndicator,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out 0.5s'
          }}>
            {isLoading ? (
              <div style={styles.loadingIndicator}>
                <span style={styles.spinnerSmall}></span>
                Loading real data...
              </div>
            ) : error ? (
              <div style={styles.errorIndicator}>
                ⚠️ Connection issue. Showing last available data.
              </div>
            ) : (
              <div style={styles.successIndicator}>
                ✅ Connected to live database
              </div>
            )}
            {lastUpdate && (
              <div style={styles.lastUpdateTime}>
                Last update: {lastUpdate.toLocaleTimeString()}
              </div>
            )}
          </div>
        </header>

        <main style={styles.main}>
          {isLoading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Loading community insights from database...</p>
              <p style={styles.loadingSubtext}>This may take a moment</p>
            </div>
          ) : (
            <div style={styles.insightsContainer}>
              {/* Summary Stats - REAL DATA */}
              <div style={styles.summaryGrid}>
                <div style={{
                  ...styles.statCard,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease-out 0.5s'
                }}>
                  <div style={styles.statIcon}>📊</div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statTitle}>Total Submissions</h3>
                    <p style={styles.statValue}>{totalSubmissions}</p>
                    <div style={styles.statSubtext}>
                      <span style={styles.humanStat}>{data.totalHumanSubmissions} Human</span>
                      <span style={styles.animalStat}>{data.totalAnimalSubmissions} Animal</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  ...styles.statCard,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease-out 0.6s'
                }}>
                  <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #48bb78, #38a169)'}}>📈</div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statTitle}>Today's Activity</h3>
                    <p style={styles.statValue}>
                      {data.submissionsByDay.length > 0 ? 
                       data.submissionsByDay[data.submissionsByDay.length - 1].total : 0}
                    </p>
                    <p style={styles.statSubtext}>Latest submissions</p>
                  </div>
                </div>

                <div style={{
                  ...styles.statCard,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease-out 0.7s'
                }}>
                  <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #ed8936, #dd6b20)'}}>⚠️</div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statTitle}>High Risk</h3>
                    <p style={styles.statValue}>{data.highRiskCount}</p>
                    <p style={styles.statSubtext}>
                      {calculatePercentage(data.highRiskCount, totalSubmissions)}% of total
                    </p>
                  </div>
                </div>

                <div style={{
                  ...styles.statCard,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease-out 0.8s'
                }}>
                  <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #9f7aea, #805ad5)'}}>❤️</div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statTitle}>Health Score</h3>
                    <p style={styles.statValue}>
                      {calculatePercentage(
                        data.healthStatusDistribution.excellent + data.healthStatusDistribution.good,
                        Object.values(data.healthStatusDistribution).reduce((a, b) => a + b, 0)
                      )}%
                    </p>
                    <p style={styles.statSubtext}>Good & Excellent</p>
                  </div>
                </div>
              </div>

              {/* Health Status Chart - REAL DATA */}
              <div style={{
                ...styles.chartCard,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.5s ease-out 0.9s'
              }}>
                <div style={styles.chartHeader}>
                  <h3 style={styles.chartTitle}>Health Status Distribution</h3>
                  <span style={styles.chartSubtitle}>
                    {totalSubmissions} total submissions
                  </span>
                </div>
                
                {totalSubmissions === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📊</div>
                    <h4 style={styles.emptyTitle}>No Data Available</h4>
                    <p style={styles.emptyText}>
                      Submit some health data to see analytics here
                    </p>
                  </div>
                ) : (
                  <div style={styles.chartContainer}>
                    {Object.entries(data.healthStatusDistribution).map(([status, count]) => {
                      const percentage = calculatePercentage(count, totalSubmissions);
                      const color = status === 'excellent' ? '#48bb78' : 
                                   status === 'good' ? '#4299e1' :
                                   status === 'fair' ? '#ed8936' : '#f56565';
                      
                      return (
                        <div key={status} style={styles.barChartItem}>
                          <div style={styles.barLabel}>
                            <div style={styles.barLabelLeft}>
                              <div style={{...styles.statusDot, background: color}}></div>
                              <span style={styles.barLabelText}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </span>
                            </div>
                            <span style={styles.barLabelValue}>{count} ({percentage}%)</span>
                          </div>
                          <div style={styles.barTrack}>
                            <div 
                              style={{
                                ...styles.barFill,
                                width: `${percentage}%`,
                                background: color,
                                animation: 'progressBar 1s ease-out'
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Symptoms and Age Groups - REAL DATA */}
              <div style={styles.chartsGrid}>
                <div style={{
                  ...styles.chartCard,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.5s ease-out 1.0s'
                }}>
                  <h3 style={styles.chartTitle}>Top Symptoms</h3>
                  {data.topSymptoms.length === 0 ? (
                    <div style={styles.emptyStateSmall}>
                      <div style={styles.emptyIconSmall}>🤒</div>
                      <p style={styles.emptyTextSmall}>No symptoms reported yet</p>
                    </div>
                  ) : (
                    <div style={styles.symptomsList}>
                      {data.topSymptoms.map((symptom, index) => (
                        <div key={index} style={styles.symptomItem}>
                          <div style={styles.symptomRank}>{index + 1}</div>
                          <div style={styles.symptomInfo}>
                            <span style={styles.symptomName}>{symptom.symptom}</span>
                            <span style={styles.symptomCount}>{symptom.count} reports</span>
                          </div>
                          <div style={styles.symptomBarTrack}>
                            <div 
                              style={{
                                ...styles.symptomBar,
                                width: `${symptom.percentage}%`,
                                background: `linear-gradient(90deg, ${['#667eea', '#764ba2', '#f093fb'][index % 3]}, ${['#9f7aea', '#805ad5', '#fbb6ce'][index % 3]})`
                              }}
                            ></div>
                          </div>
                          <span style={styles.symptomPercentage}>{symptom.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{
                  ...styles.chartCard,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.5s ease-out 1.1s'
                }}>
                  <h3 style={styles.chartTitle}>Age Groups</h3>
                  {Object.keys(data.ageGroupDistribution).length === 0 ? (
                    <div style={styles.emptyStateSmall}>
                      <div style={styles.emptyIconSmall}>👥</div>
                      <p style={styles.emptyTextSmall}>No age data available</p>
                    </div>
                  ) : (
                    <div style={styles.ageGroupList}>
                      {Object.entries(data.ageGroupDistribution).map(([group, count], index) => (
                        <div key={group} style={styles.ageGroupItem}>
                          <span style={styles.ageGroupName}>{group}</span>
                          <div style={styles.ageGroupBarTrack}>
                            <div 
                              style={{
                                ...styles.ageGroupBar,
                                width: `${calculatePercentage(count, data.totalHumanSubmissions)}%`,
                                background: `linear-gradient(90deg, #667eea, #764ba2)`
                              }}
                            ></div>
                          </div>
                          <span style={styles.ageGroupCount}>{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submissions Trend - REAL DATA */}
              <div style={{
                ...styles.chartCard,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.5s ease-out 1.2s'
              }}>
                <h3 style={styles.chartTitle}>Submission Trend (Last 7 Days)</h3>
                {data.submissionsByDay.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📅</div>
                    <p style={styles.emptyText}>No submission history available</p>
                  </div>
                ) : (
                  <div style={styles.trendChart}>
                    <div style={styles.trendBars}>
                      {data.submissionsByDay.map((day, index) => {
                        const maxTotal = Math.max(...data.submissionsByDay.map(d => d.total));
                        const height = maxTotal > 0 ? (day.total / maxTotal) * 120 : 0;
                        
                        return (
                          <div key={index} style={styles.trendBarGroup}>
                            <div style={styles.trendBarContainer}>
                              <div 
                                style={{
                                  ...styles.trendBar,
                                  height: `${height}px`,
                                  background: 'linear-gradient(to top, #667eea, #764ba2)'
                                }}
                              >
                                <div style={styles.trendBarValue}>{day.total}</div>
                              </div>
                            </div>
                            <div style={styles.trendBarLabel}>{day.date}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div style={styles.trendLegend}>
                      <div style={styles.trendLegendItem}>
                        <div style={{...styles.trendLegendColor, background: '#667eea'}}></div>
                        <span>Total Submissions</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Risk Assessment - REAL DATA */}
              <div style={{
                ...styles.riskCard,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.5s ease-out 1.3s'
              }}>
                <h3 style={styles.riskTitle}>Health Risk Assessment</h3>
                <div style={styles.riskGrid}>
                  <div style={styles.riskLevel}>
                    <div style={{...styles.riskLevelIcon, background: '#48bb78'}}>✅</div>
                    <div style={styles.riskLevelContent}>
                      <h4 style={styles.riskLevelTitle}>Low Risk</h4>
                      <p style={styles.riskLevelValue}>{data.lowRiskCount} cases</p>
                    </div>
                  </div>
                  <div style={styles.riskLevel}>
                    <div style={{...styles.riskLevelIcon, background: '#ed8936'}}>⚠️</div>
                    <div style={styles.riskLevelContent}>
                      <h4 style={styles.riskLevelTitle}>Medium Risk</h4>
                      <p style={styles.riskLevelValue}>{data.mediumRiskCount} cases</p>
                    </div>
                  </div>
                  <div style={styles.riskLevel}>
                    <div style={{...styles.riskLevelIcon, background: '#f56565'}}>🚨</div>
                    <div style={styles.riskLevelContent}>
                      <h4 style={styles.riskLevelTitle}>High Risk</h4>
                      <p style={styles.riskLevelValue}>{data.highRiskCount} cases</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Summary - REAL DATA */}
              <div style={{
                ...styles.summaryCard,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.5s ease-out 1.4s'
              }}>
                <h3 style={styles.summaryTitle}>Data Summary</h3>
                <div style={styles.summaryContent}>
                  <div style={styles.summaryItem}>
                    <span style={styles.summaryLabel}>Database Status:</span>
                    <span style={styles.summaryValue}>
                      {error ? '⚠️ Connection Issue' : '✅ Connected'}
                    </span>
                  </div>
                  <div style={styles.summaryItem}>
                    <span style={styles.summaryLabel}>Total Records:</span>
                    <span style={styles.summaryValue}>{totalSubmissions}</span>
                  </div>
                  <div style={styles.summaryItem}>
                    <span style={styles.summaryLabel}>Data Last Updated:</span>
                    <span style={styles.summaryValue}>
                      {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
                    </span>
                  </div>
                  <div style={styles.summaryItem}>
                    <span style={styles.summaryLabel}>Recommendation:</span>
                    <span style={styles.summaryRecommendation}>
                      {totalSubmissions === 0 
                        ? 'Submit more data to see insights'
                        : 'Continue monitoring community health'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Refresh Button */}
        <button 
          style={styles.refreshButton}
          onClick={fetchRealData}
          disabled={isLoading}
        >
          {isLoading ? (
            <span style={styles.spinnerSmall}></span>
          ) : (
            '🔄'
          )}
        </button>

        <footer style={{
          ...styles.footer,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.5s ease-out 1.5s'
        }}>
          <p style={styles.footerText}>
            Real Community Health Analytics • Powered by MongoDB
          </p>
          <p style={styles.footerSubtext}>
            Showing actual data from {totalSubmissions} submissions • Auto-refreshes every 10 seconds
          </p>
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
    margin: '0 0 10px 0',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    color: '#4a5568',
    textAlign: 'center',
    margin: '0 auto 10px auto',
    maxWidth: '800px',
    lineHeight: '1.6',
    fontWeight: '400',
  },
  statusIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    marginTop: '10px',
  },
  loadingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#667eea',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  errorIndicator: {
    color: '#f56565',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  successIndicator: {
    color: '#48bb78',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  lastUpdateTime: {
    fontSize: '0.8rem',
    color: '#718096',
  },
  main: {
    flex: 1,
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    width: '100%',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid rgba(255, 255, 255, 0.3)',
    borderTop: '5px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  spinnerSmall: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  loadingSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
  },
  insightsContainer: {
    width: '100%',
    maxWidth: '1400px',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginBottom: '40px',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  statIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '15px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    flexShrink: 0,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: '1rem',
    color: '#718096',
    margin: '0 0 5px 0',
    fontWeight: '600',
  },
  statValue: {
    fontSize: '2rem',
    color: '#2d3748',
    margin: '0 0 5px 0',
    fontWeight: '700',
  },
  statSubtext: {
    fontSize: '0.85rem',
    color: '#a0aec0',
    display: 'flex',
    gap: '10px',
  },
  humanStat: {
    color: '#667eea',
    fontWeight: '600',
  },
  animalStat: {
    color: '#48bb78',
    fontWeight: '600',
  },
  chartCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    marginBottom: '30px',
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
  },
  chartTitle: {
    fontSize: '1.2rem',
    color: '#2d3748',
    margin: 0,
    fontWeight: '700',
  },
  chartSubtitle: {
    fontSize: '0.9rem',
    color: '#718096',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '15px',
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: '1.2rem',
    color: '#4a5568',
    margin: '0 0 10px 0',
  },
  emptyText: {
    fontSize: '1rem',
    color: '#718096',
    margin: 0,
  },
  emptyStateSmall: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    textAlign: 'center',
  },
  emptyIconSmall: {
    fontSize: '2rem',
    marginBottom: '10px',
    opacity: 0.5,
  },
  emptyTextSmall: {
    fontSize: '0.9rem',
    color: '#718096',
    margin: 0,
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  barChartItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  barLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barLabelLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  barLabelText: {
    fontSize: '0.95rem',
    color: '#4a5568',
    fontWeight: '500',
  },
  barLabelValue: {
    fontSize: '0.9rem',
    color: '#2d3748',
    fontWeight: '600',
  },
  barTrack: {
    height: '25px',
    background: '#edf2f7',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: '12px',
    transition: 'width 1s ease-out',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginBottom: '30px',
  },
  symptomsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  symptomItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  symptomRank: {
    width: '24px',
    height: '24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '6px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  symptomInfo: {
    flex: 1,
    minWidth: '120px',
  },
  symptomName: {
    display: 'block',
    fontSize: '0.95rem',
    color: '#2d3748',
    fontWeight: '500',
  },
  symptomCount: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#718096',
  },
  symptomBarTrack: {
    flex: 2,
    height: '8px',
    background: '#edf2f7',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  symptomBar: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 1s ease-out',
  },
  symptomPercentage: {
    fontSize: '0.9rem',
    color: '#2d3748',
    fontWeight: '600',
    minWidth: '40px',
    textAlign: 'right',
  },
  ageGroupList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  ageGroupItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  ageGroupName: {
    flex: 1,
    fontSize: '0.95rem',
    color: '#4a5568',
    minWidth: '100px',
  },
  ageGroupBarTrack: {
    flex: 2,
    height: '8px',
    background: '#edf2f7',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  ageGroupBar: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 1s ease-out',
  },
  ageGroupCount: {
    fontSize: '0.9rem',
    color: '#2d3748',
    fontWeight: '600',
    minWidth: '40px',
    textAlign: 'right',
  },
  trendChart: {
    height: '200px',
    position: 'relative',
  },
  trendBars: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '150px',
    padding: '0 20px',
  },
  trendBarGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    width: '40px',
  },
  trendBarContainer: {
    width: '20px',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  trendBar: {
    width: '100%',
    borderRadius: '10px 10px 0 0',
    transition: 'height 0.5s ease-out',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  trendBarValue: {
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: '600',
    marginBottom: '5px',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  trendBarLabel: {
    fontSize: '0.8rem',
    color: '#718096',
    fontWeight: '500',
  },
  trendLegend: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  trendLegendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#4a5568',
  },
  trendLegendColor: {
    width: '12px',
    height: '12px',
    borderRadius: '3px',
  },
  riskCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    marginBottom: '30px',
  },
  riskTitle: {
    fontSize: '1.2rem',
    color: '#2d3748',
    margin: '0 0 25px 0',
    fontWeight: '700',
    textAlign: 'center',
  },
  riskGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
  },
  riskLevel: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  riskLevelIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    flexShrink: 0,
  },
  riskLevelContent: {
    flex: 1,
  },
  riskLevelTitle: {
    fontSize: '1.1rem',
    color: '#2d3748',
    margin: '0 0 5px 0',
    fontWeight: '600',
  },
  riskLevelValue: {
    fontSize: '1.3rem',
    color: '#4a5568',
    margin: '0 0 5px 0',
    fontWeight: '700',
  },
  summaryCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    marginBottom: '30px',
  },
  summaryTitle: {
    fontSize: '1.2rem',
    color: '#2d3748',
    margin: '0 0 25px 0',
    fontWeight: '700',
    textAlign: 'center',
  },
  summaryContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  summaryLabel: {
    fontSize: '0.9rem',
    color: '#718096',
  },
  summaryValue: {
    fontSize: '1.1rem',
    color: '#2d3748',
    fontWeight: '600',
  },
  summaryRecommendation: {
    fontSize: '1rem',
    color: '#667eea',
    fontWeight: '600',
  },
  refreshButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 5px 20px rgba(102, 126, 234, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    zIndex: 100,
  },
  footer: {
    textAlign: 'center',
    padding: '25px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  },
  footerText: {
    color: '#2d3748',
    fontSize: '1rem',
    margin: '0 0 5px 0',
    fontWeight: '600',
  },
  footerSubtext: {
    color: '#718096',
    fontSize: '0.9rem',
    margin: 0,
  },
};

export default CommunityInsights;