import './index.css'
import { AiOutlineHome } from "react-icons/ai";
import { VscCommentDiscussionSparkle } from "react-icons/vsc";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Footer = () => {
    const jwtToken = Cookies.get('jwt_token');
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');
    const onGoToDiscussions = () => {
        navigate('/discussions');
        setActiveTab('discussions');
    }
    const onClickHome = () => {
        if(jwtToken === undefined) return navigate('/login');
        navigate('/');
        setActiveTab('home');
    }
    const onGoToCommunity = () => {
        if(jwtToken === undefined) return navigate('/login');
        navigate('/community');
        setActiveTab('community');
    }
    const onGoToIssues = () => {
        if(jwtToken === undefined) return navigate('/login');
        navigate('/issues');
        setActiveTab('issues');
    }
    return (
        <footer className="footer-container">
            <button className="home-btn" onClick={onClickHome}>
                <AiOutlineHome color={activeTab === 'home' ? '#08c12a' : '#000000'}  size={30} />
                <span className={activeTab === 'home' ? 'active-text' : ''}>Home</span>
            </button>
            <button className="home-btn" onClick={onGoToDiscussions} active={activeTab === 'discussions'}>
                <VscCommentDiscussionSparkle color={activeTab === 'discussions' ? '#08c12a' : '#000000'}  size={30}/>
                <span className={activeTab === 'discussions' ? 'active-text' : ''}>Discussions</span>
            </button>
            <button className="home-btn" onClick={onGoToCommunity} active={activeTab === 'community'}>
                <HiOutlineUsers color={activeTab === 'community' ? '#08c12a' : '#000000'}  size={30}/>
                <span className={activeTab === 'community' ? 'active-text' : ''}>Community</span>
            </button>
            <button className="home-btn" onClick={onGoToIssues} active={activeTab === 'issues'}>
                <CiCalendar color={activeTab === 'issues' ? '#08c12a' : '#000000'}  size={30}/>
                <span className={activeTab === 'issues' ? 'active-text' : ''}>Issues</span>
            </button>
            <button className="home-btn" onClick={() => setActiveTab('profile')} active={activeTab === 'profile'}>
                <FiUser color={activeTab === 'profile' ? '#08c12a' : '#000000'}  size={30}/>
                <span className={activeTab === 'profile' ? 'active-text' : ''}>Profile</span>
            </button>
        </footer>
    )
}

export default Footer