import './index.css'
import { AiOutlineHome } from "react-icons/ai";
import { VscCommentDiscussionSparkle } from "react-icons/vsc";
import { CiCalendar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { BsBank } from "react-icons/bs";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t} = useTranslation();
    const location = useLocation()
    const isHomePage = location.pathname === '/';
    const isDiscussionsPage = location.pathname === '/discussions';
    const isGramPanchayatPage = location.pathname === '/grampanchayat';
    const isIssuesPage = location.pathname === '/issues';
    const isProfilePage = location.pathname === '/myprofile';
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
    const onGoToGramPanchayat = () => {
        if(jwtToken === undefined) return navigate('/login');
        navigate('/grampanchayat');
        setActiveTab('grampanchayat');
    }
    const onGoToIssues = () => {
        if(jwtToken === undefined) return navigate('/login');
        navigate('/issues');
        setActiveTab('issues');
    }
    const onGoToProfile = () => {
        if(jwtToken === undefined) return navigate('/login');
        navigate('/myprofile');
        setActiveTab('profile');
    }

    useEffect(() => {
        if (isHomePage) {
            setActiveTab('home');
        } else if (isDiscussionsPage) {
            setActiveTab('discussions');
        } else if (isGramPanchayatPage) {
            setActiveTab('grampanchayat');
        } else if (isIssuesPage) {
            setActiveTab('issues');
        } else if (isProfilePage) {
            setActiveTab('profile');
        }
    }, [location]);

    return (
        <footer className="footer-container">
            <button className="home-btn" onClick={onClickHome}>
                <AiOutlineHome color={activeTab === 'home' ? '#08c12a' : '#000000'}  size={30} />
                <span className={activeTab === 'home' ? 'active-text' : ''}>{t('home')}</span>
            </button>
            <button className="home-btn" onClick={onGoToDiscussions} active={activeTab === 'discussions'}>
                <VscCommentDiscussionSparkle color={activeTab === 'discussions' ? '#08c12a' : '#000000'}  size={30}/>
                <span className={activeTab === 'discussions' ? 'active-text' : ''}>{t('discussions')}</span>
            </button>
            <button className="home-btn" onClick={onGoToGramPanchayat} active={activeTab === 'grampanchayat'}>
                <BsBank color={activeTab === 'grampanchayat' ? '#08c12a' : '#000000'}  size={30}/>
                <span className={activeTab === 'grampanchayat' ? 'active-text' : ''}>{t('gramPanchayat')}</span>
            </button>
            <button className="home-btn" onClick={onGoToIssues} active={activeTab === 'issues'}>
                <CiCalendar color={activeTab === 'issues' ? '#08c12a' : '#000000'}  size={30}/>
                <span className={activeTab === 'issues' ? 'active-text' : ''}>{t('issues')}</span>
            </button>
            <button className="home-btn" onClick={onGoToProfile} active={activeTab === 'profile'}>
                <FiUser color={activeTab === 'profile' ? '#08c12a' : '#000000'}  size={30}/>
                <span className={activeTab === 'profile' ? 'active-text' : ''}>{t('profile')}</span>
            </button>
        </footer>
    )
}

export default Footer