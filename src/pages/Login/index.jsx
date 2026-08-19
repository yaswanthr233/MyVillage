import './index.css'
import { HiOutlineMail } from "react-icons/hi";
import {IoMdLock } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import Cookies from 'js-cookie'
import BeatLoader from "react-spinners/BeatLoader";
import { Navigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    if(Cookies.get('jwt_token') !== undefined){
        return <Navigate to="/" replace />
    }
    const onNavigateToRegister = () => {
        navigate('/register')
    } 
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState({
        email: false,
        password: false
    });
    const [invalidCredentials, setIsInvalidCredentials] = useState({
        email: false,
        password: false
    });

    const onLoginAccount = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(userDetails.email !== '' && userDetails.password !== ''){
            const loginData = {
                email: userDetails.email,
                password: userDetails.password
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, options);
            setIsLoading(false);
            console.log(response)
            if(response.ok){
                const data = await response.json();
                const {token, name, userId,role} = data;
                localStorage.setItem('userName', name);
                localStorage.setItem('userId', userId);
                localStorage.setItem('role', role);
                Cookies.set('jwt_token', data.token, { expires: 30 });
                console.log(data);
                navigate('/')
            } else {
                const errorData = await response.text();
                console.error('Login failed:', errorData);
                setIsInvalidCredentials({
                    email: errorData.includes("Invalid Email"),
                    password: errorData.includes("Invalid Password"),
              });
            }
        } else {
            setErrorMessage({
                email: !userDetails.email,
                password: !userDetails.password
            });
        }

    }
    const renderRegisterView = () => {
         return (
        <div className="bg-container-login">
            <div className="logo-container">
                <img src="https://res.cloudinary.com/duokznlha/image/upload/v1785779485/ChatGPT_Image_Aug_3_2026_11_20_51_PM_us6g9t.png" className="logo" />
                <div>
                    <h1 className="logo-title">MyVillage</h1>
                    <p className="logo-subtitle">One Village, One Community</p>
                </div>
            </div>
            <div className="login-container">
                <h1 className="login-title">Welcome Back!👋</h1>
                <p className="login-subtitle">Login to your MyVillage account</p>
            </div>
            <form className="login-form" onSubmit={onLoginAccount}>
                <div className="input-container">
                    <HiOutlineMail size={24} />
                    <input type="email" placeholder="Email address" className="login-input" value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} />
                </div>
                <p className={`error-message ${invalidCredentials.email ? 'show' : 'hide'}`}>{invalidCredentials.email && 'Invalid Email'}</p>
                <p className={`error-message ${errorMessage.email ? 'show' : 'hide'}`}>{!userDetails.email && 'Email is required'}</p>
                <div className="input-container">
                    <IoMdLock size={24} />
                    <input type="password" placeholder="Password" className="login-input" value={userDetails.password} onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} />
                </div>
                <p className={`error-message ${invalidCredentials.password ? 'show' : 'hide'}`}>{invalidCredentials.password && 'Invalid Password'}</p>
                <p className={`error-message ${errorMessage.password ? 'show' : 'hide'}`}>{!userDetails.password && 'Password is required'}</p>
                <div className="forgot-password-container">
                    <a href="#" className="forgot-password-link">Forgot Password?</a>
                </div>
                <button type="submit" className="login-button">Login</button>
                
            </form>
            <div className="or-container">
                    <div className="or-divider"/>
                    <span className="or-text">or continue with</span>
                    <div className="or-divider"/>
                </div>
                <div className="social-login-container">
                    <button className="social-login-button">
                        <FaGoogle size={24} color="#4285F4" />
                        <span className="social-login-text">Continue with Google</span>
                    </button>
                </div>
                <div className="dont-have-account-container">
                    <span className="dont-have-account-text">Don't have an account? <button onClick={onNavigateToRegister} className="create-account-button">Create Account</button></span>
                </div>
        </div>
    )
    }

    const renderLoadingView = () => {
        return (
            <div className="loading-container">
                <BeatLoader color="#1bd233" size={15} />
            </div>
        )
    }
    return <>{isLoading ? renderLoadingView() : renderRegisterView()}</>
 }
export default Login