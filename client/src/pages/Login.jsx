import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN } from '../utils/mutations';
import './style.css';

// Initialize MDB UI Kit components
import { Input, Tab, Ripple, initMDB } from 'mdb-ui-kit';
initMDB({ Input, Tab, Ripple });

function Login() {
  const [activeTab, setActiveTab] = useState('pills-login');
  const [error, setError] = useState(null); // State to hold registration and login errors
  // const navigate = useNavigate(); // Initialize useNavigate hook

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setError(null); // Clear error when switching tabs
  };

  // Login
  const [loginUser] = useMutation(LOGIN);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything per bootstrap.
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setError('Please fill out the form correctly.'); // Set error message
    } else {
      try {
        const { data } = await loginUser({
          variables: { ...userFormData },
        });

        Auth.login(data.login.token);
      } catch (err) {
        console.error(err);
        setError('Invalid username or password. Please try again.'); // Set error message
      }

      setUserFormData({
        username: '',
        password: '',
      });
    }
  };

  // Registration
  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [addUser] = useMutation(ADD_USER);


  // Registration Submit Handling
  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything per bootstrap.
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setError('Please fill out the form correctly.'); // Set error message
    } else {
      try {
        const { data } = await addUser({
          variables: { ...userFormData },
        });

        Auth.login(data.addUser.token);

        // Redirect to /dashboard after successful registration
      } catch (err) {
        console.error(err);
        setError('Error creating an account. Please try again.'); // Set error message
      }

      setUserFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
      });
    }
  };

  // Login Submit Handling
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Updating state for ${name}: ${value}`);
    setUserFormData({ ...userFormData, [name]: value });
    setError(null); // Clear error when user starts typing

    const inputElement = event.target;

    if (value.trim() !== '') {
      inputElement.classList.add('active');
    } else {
      inputElement.classList.remove('active');
    }
  };

  useEffect(() => {
    // Initialize MDB UI Kit components after the component has loaded
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
      if (formOutline && formOutline.classList) {
        try {
          new Input(formOutline).update();
        } catch (error) {
          console.error('Error updating Input:', error);
        }
      }
    });
  }, []);

  return (
 
    <main className="cardContainer">
      {/* <Navigate to="/dashboard" /> */}
      <div className="login m-auto">
        {/* Pills navs */}
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'pills-login' ? 'active' : ''}`}
              onClick={() => handleTabClick('pills-login')}
              role="tab"
              aria-controls="pills-login"
              aria-selected={activeTab === 'pills-login'}
            >
              Login
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'pills-register' ? 'active' : ''}`}
              onClick={() => handleTabClick('pills-register')}
              role="tab"
              aria-controls="pills-register"
              aria-selected={activeTab === 'pills-register'}
            >
              Register
            </a>
          </li>
        </ul>
        {/* Pills navs */}

        {/* Pills content */}
        <div className="tab-content">
          <div className={`tab-pane fade ${activeTab === 'pills-login' ? 'show active' : ''}`} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Display error alert */}
            <form onSubmit={handleLoginSubmit}>
              {/* Usename input */}
              <div className="form-outline mb-4">
                <input type="text" id="loginName" name="username" className="form-control" onChange={handleChange} required />
                <label className="form-label" htmlFor="loginName">
                  Username
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input type="password" id="loginPassword" name="password" className="form-control" onChange={handleChange} required />
                <label className="form-label" htmlFor="loginPassword">
                  Password
                </label>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-block mb-4">
                Sign in
              </button>
            </form>
          </div>

          {/* Sigup Area */}

          <div className={`tab-pane fade ${activeTab === 'pills-register' ? 'show active' : ''}`} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error alert */}
            <form onSubmit={handleRegistrationSubmit}>
              {/* Name input */}
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="text"
                      id="firstName"
                      className={`form-control ${userFormData.firstName ? 'active' : ''}`}
                      onChange={(e) => {
                        setUserFormData({ ...userFormData, firstName: e.target.value });
                        setError(null); // Clear error when user starts typing
                      }}
                      required
                    />
                    <label className={`form-label ${userFormData.firstName ? 'hidden-label' : ''}`} htmlFor="firstName">
                      First Name
                    </label>
                  </div>
                </div>

                <div className="col">
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="text"
                      id="lastName"
                      className={`form-control ${userFormData.lastName ? 'active' : ''}`}
                      onChange={(e) => {
                        setUserFormData({ ...userFormData, lastName: e.target.value });
                        setError(null); // Clear error when user starts typing
                      }}
                      required
                    />
                    <label className={`form-label ${userFormData.lastName ? 'hidden-label' : ''}`} htmlFor="lastName">
                      Last Name
                    </label>
                  </div>
                </div>
              </div>

              {/* Username input */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="registerUsername"
                  className={`form-control ${userFormData.username ? 'active' : ''}`}
                  onChange={(e) => {
                    setUserFormData({ ...userFormData, username: e.target.value });
                    setError(null); // Clear error when user starts typing
                  }}
                  required
                />
                <label className="form-label" htmlFor="registerUsername">
                  Username
                </label>
              </div>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="registerEmail"
                  className={`form-control ${userFormData.email ? 'active' : ''}`}
                  onChange={(e) => {
                    setUserFormData({ ...userFormData, email: e.target.value });
                    setError(null); // Clear error when user starts typing
                  }}
                  required
                />
                <label className="form-label" htmlFor="registerEmail">
                  Email
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="registerPassword"
                  className={`form-control ${userFormData.password ? 'active' : ''}`}
                  onChange={(e) => {
                    setUserFormData({ ...userFormData, password: e.target.value });
                    setError(null); // Clear error when user starts typing
                  }}
                  required
                />
                <label className="form-label" htmlFor="registerPassword">
                  Password
                </label>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-block mb-3">
                Sign up
              </button>
            </form>
          </div>
        </div >
        {/* Pills content */}
      </div >
    </main >
  );
}

export default Login;
