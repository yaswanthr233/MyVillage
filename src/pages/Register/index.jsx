import './index.css'
import { FaRegUser } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import {IoMdLock } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

const Register = () => {
    if(Cookies.get('jwt_token') !== undefined){
        return <Navigate to="/" replace />
    }
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        village: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        name: 'hide',
        phoneNumber: 'hide',
        email: 'hide',
        password: 'hide',
        village: 'hide'
    });
    const [isEmailExists, setIsEmailExists] = useState(false);

    const onNavigateToLogin = () => {
        navigate('/login')
    }

    const onRegisterAccount  = async (e) => {
        e.preventDefault();
        
        if(userDetails.name !== '' && userDetails.phoneNumber !== '' && userDetails.email !== '' && userDetails.password !== ''){
            setIsLoading(true);
            const userData = {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password,
                phoneNumber: userDetails.phoneNumber,
                village: userDetails.village
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`,options);
            setIsLoading(false);
            if(response.ok){
                const data = await response.text();
                console.log(data);
                navigate('/login')
            } else {
                const errorData = await response.text();
                if(errorData.includes('Email already exists')){
                    setIsEmailExists(true);
                    console.error('Error:', errorData);
                }
            }
        } else {
            setErrorMessage({
                name: userDetails.name === '' ? 'show' : 'hide',
                phoneNumber: userDetails.phoneNumber === '' ? 'show' : 'hide',
                email: userDetails.email === '' ? 'show' : 'hide',
                password: userDetails.password === '' ? 'show' : 'hide'
            })
        }
    }
    const renderLoginPage = () => {
        return (
            <div className="bg-container-register">
            <div className="logo-container">
                <img src="https://res.cloudinary.com/duokznlha/image/upload/v1785779485/ChatGPT_Image_Aug_3_2026_11_20_51_PM_us6g9t.png" className="logo" />
                <div>
                    <h1 className="logo-title">MyVillage</h1>
                    <p className="logo-subtitle">One Village, One Community</p>
                </div>
            </div>
            <div className="register-container">
                <h1 className="register-title">Create an Account</h1>
                <p className="register-subtitle">join the MyVillage and be part of the change</p>
            </div>
            <form className="register-form" onSubmit={onRegisterAccount}>
                <div className="input-container">
                    <FaRegUser size={20} />
                    <input type="text" placeholder="Full Name" className="login-input" value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})} />
                </div>
                <p className={`error-message ${errorMessage.name}`}>{!userDetails.name && 'Name is required'}</p>
                <div className="input-container">
                    <FiPhone size={20}/>
                    <input type="number" placeholder="Phone Number" className="login-input" value={userDetails.phoneNumber} maxLength={10} onChange={(e) => setUserDetails({...userDetails, phoneNumber: e.target.value})} />
                </div>
                <p className={`error-message ${errorMessage.phoneNumber}`}>{!userDetails.phoneNumber && 'Phone number is required'}</p>
                <div className="input-container">
                    <HiOutlineMail size={24} />
                    <input type="email" placeholder="Email address" className="login-input" value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} />
                    
                </div>
                <p className={`error-message ${isEmailExists ? 'show' : 'hide'}`}>
                    Email already exists
                </p>
                <p className={`error-message ${errorMessage.email}`}>{!userDetails.email && 'Email is required'}</p>
                <div className="input-container">
                    <IoMdLock size={24} />
                    <input type="password" placeholder="Password" className="login-input" value={userDetails.password} onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} />
                    
                </div>
                <p className={`error-message ${errorMessage.password}`}>{!userDetails.password && 'Password is required'}</p>
                <div className="input-container">
                    <IoMdLock size={24} />
                    <input type="text" placeholder="Village Name" className="login-input" value={userDetails.village} onChange={(e) => setUserDetails({...userDetails, village: e.target.value})} />
                </div>
                
                <p className={`error-message ${errorMessage.village}`}>{!userDetails.village && 'Village name is required'}</p>
                
                <button type="submit" className="register-button">Create Account</button>
                <div className="or-container">
                    <div className="or-divider"/>
                    <span className="or-text">or continue with</span>
                    <div className="or-divider"/>
                </div>
                
            </form>
            <div className="social-login-container">
                    <button className="social-login-button">
                    <FaGoogle size={24} color="#4285F4" />
                    <span className="social-login-text">Continue with Google</span>
                    </button>
                </div>
                <div className="have-account-container">
                    <span className="have-account-text">Have an account? <button onClick={onNavigateToLogin} className="login-account-button">Login</button></span>
                </div>
        </div>
        )
    }
    const renderLoadingPage = () => {
        return (
            <div className="loading-container">
                <BeatLoader color="#1bd233" size={15} />
            </div>
        )
    }
    return <>{isLoading ? renderLoadingPage() : renderLoginPage()}</>
}
export default Register