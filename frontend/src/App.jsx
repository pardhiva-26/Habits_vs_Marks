import { useState, useEffect } from 'react';

function App() {
  const placeholderMap = {
    age: "e.g. 20",
    gender: "Select Gender",
    study_hours_per_day: "e.g. 4",
    social_media_hours: "e.g. 2.5",
    netflix_hours: "e.g. 1.2",
    part_time_job: "Select Option",
    attendance_percentage: "e.g. 85",
    sleep_hours: "e.g. 7.5",
    diet_quality: "Select Quality",
    exercise_frequency: "Times per week e.g. 3",
    parental_education_level: "Select Level",
    internet_quality: "Select Quality",
    mental_health_rating: "Scale of 1 to 10",
    extracurricular_participation: "Select Option"
  };

  const allowedValues = {
    gender: ["Male", "Female", "Other"],
    part_time_job: ["Yes", "No"],
    diet_quality: ["Poor", "Fair", "Good"],
    parental_education_level: ["High School", "Bachelor", "Master", "no_education"],
    internet_quality: ["Poor", "Average", "Good"],
    extracurricular_participation: ["Yes", "No"],
  };

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    study_hours_per_day: '',
    social_media_hours: '',
    netflix_hours: '',
    part_time_job: '',
    attendance_percentage: '',
    sleep_hours: '',
    diet_quality: '',
    exercise_frequency: '',
    parental_education_level: '',
    internet_quality: '',
    mental_health_rating: '',
    extracurricular_participation: '',
  });

  const [predictedScore, setPredictedScore] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (predictedScore !== null) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [predictedScore]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate allowed values
    for (const key in allowedValues) {
      const validOptions = allowedValues[key];
      if (!validOptions.includes(formData[key])) {
        setError(`Invalid input for '${key.replace(/_/g, ' ')}'. Allowed values: ${validOptions.join(', ')}`);
        return;
      }
    }

    setError(null); // Clear error if validation passes

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPredictedScore(data.predicted_exam_score);
    } catch (error) {
      console.error('Prediction error:', error);
      setError('Something went wrong while predicting. Please try again.');
    }
  };

  return (
    <div 
      className="container-fluid" 
      style={{
        background: 'linear-gradient(135deg, #1a1a1a, #2d1b69, #1a1a1a)',
        minHeight: '100vh',
        overflowY: 'auto',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}
    >
      <div className="container" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-3 fw-bold mb-3" style={{
            background: 'linear-gradient(45deg, #00ffcc, #9966ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🎯 Habits vs Marks Predictor
          </h1>
          <p className="lead text-light fs-5">
            Discover how your daily habits influence your academic performance
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        {/* Main Content */}
        <div className="row g-4">
          {/* Form Section */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-lg h-100" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div className="card-header border-0 bg-transparent">
                <h3 className="card-title text-light mb-0">
                  <i className="bi bi-person-fill-check me-2" style={{color: '#00ffcc'}}></i>
                  Your Information
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {Object.keys(formData).map((key) => (
                      <div className="col-md-6" key={key}>
                        <label className="form-label text-light fw-semibold">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </label>
                        {allowedValues[key] ? (
                          <select
                            className="form-control form-control-lg"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                            style={{
                              backgroundColor: 'rgba(26, 3, 3, 0.49)',
                              color:'white',
                              border: '2px solid rgba(0, 255, 204, 0.3)',
                              // color: 'white',
                              borderRadius: '10px'
                            }}
                          >
                            <option value="" disabled>{placeholderMap[key]}</option>
                            {allowedValues[key].map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                            placeholder={placeholderMap[key] || `Enter ${key.replace(/_/g, ' ')}`}
                            style={{
                              backgroundColor: 'rgba(26, 3, 3, 0.49)',
                              border: '2px solid rgba(0, 255, 204, 0.3)',
                              color: 'white',
                              borderRadius: '10px'
                            }}
                            min={key === 'age' ? 10 : key === 'study_hours_per_day' || key === 'social_media_hours' || key === 'netflix_hours' || key === 'sleep_hours' ? 0 : key === 'attendance_percentage' ? 0 : key === 'exercise_frequency' ? 0 : key === 'mental_health_rating' ? 1 : undefined}
                            max={key === 'age' ? 100 : key === 'study_hours_per_day' || key === 'social_media_hours' || key === 'netflix_hours' || key === 'sleep_hours' ? 24 : key === 'attendance_percentage' ? 100 : key === 'exercise_frequency' ? 7 : key === 'mental_health_rating' ? 10 : undefined}
                            step={key.includes('hours') || key === 'study_hours_per_day' || key === 'social_media_hours' || key === 'sleep_hours' || key === 'netflix_hours' || key === 'attendance_percentage' ? '0.1' : '1'}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="d-grid mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-lg py-3 fw-bold text-dark"
                      style={{
                        background: 'linear-gradient(45deg, #00ffcc, #9966ff)',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '1.1rem'
                      }}
                    >
                      🔮 Predict My Score
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Legend Section */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg h-100" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div className="card-header border-0 bg-transparent">
                <h3 className="card-title text-light mb-0">
                  <i className="bi bi-info-circle-fill me-2" style={{color: '#00ffcc'}}></i>
                  Input Guidelines
                </h3>
              </div>
              <div className="card-body">
                {Object.entries(allowedValues).map(([key, values]) => (
                  <div className="mb-4" key={key}>
                    <div className="card border-0" style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(0, 255, 204, 0.2)'
                    }}>
                      <div className="card-body p-3">
                        <h6 className="card-title text-info fw-bold mb-2">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h6>
                        <div className="d-flex flex-wrap gap-1">
                          {values.map((value, index) => (
                            <span 
                              key={index}
                              className="badge px-2 py-1"
                              style={{
                                background: 'linear-gradient(45deg, rgba(153, 102, 255, 0.3), rgba(0, 255, 204, 0.3))',
                                border: '1px solid rgba(153, 102, 255, 0.5)',
                                color: '#e0e0e0',
                                fontSize: '0.75rem'
                              }}
                            >
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Tips Section */}
                <div className="card border-0 mt-4" style={{
                  background: 'linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(153, 102, 255, 0.1))',
                  border: '1px solid rgba(0, 123, 255, 0.3)'
                }}>
                  <div className="card-body p-3">
                    <h6 className="text-info fw-bold mb-2">
                      💡 Quick Tips
                    </h6>
                    <ul className="list-unstyled text-light small mb-0">
                      <li className="mb-1">• Be honest with your inputs for accurate predictions</li>
                      <li className="mb-1">• Use decimal values where applicable (e.g., 2.5 hours)</li>
                      <li className="mb-1">• Mental health rating: 1 (poor) to 10 (excellent)</li>
                      <li>• All fields are required for prediction</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Modal */}
        {predictedScore !== null && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.7)'}} role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg" style={{
                background: 'linear-gradient(135deg, #2c2c2c, #1a1a2e)',
                border: '2px solid #00ffcc'
              }}>
                <div className="modal-header border-0">
                  <h5 className="modal-title text-light fw-bold">
                    🎯 Your Predicted Score
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setPredictedScore(null)}
                  ></button>
                </div>
                <div className="modal-body text-center py-4">
                  <div className="mb-3">
                    <div className="display-1 fw-bold" style={{
                      background: 'linear-gradient(45deg, #00ffcc, #9966ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {Math.round(predictedScore)}%
                    </div>
                  </div>
                  <p className="text-light lead mb-0">
                    Based on your current habits and lifestyle factors
                  </p>
                </div>
                <div className="modal-footer border-0 justify-content-center">
                  <button 
                    type="button" 
                    className="btn btn-lg px-4 fw-bold text-dark"
                    onClick={() => setPredictedScore(null)}
                    style={{
                      background: 'linear-gradient(45deg, #00ffcc, #9966ff)',
                      border: 'none',
                      borderRadius: '10px'
                    }}
                  >
                    Got it! 👍
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;