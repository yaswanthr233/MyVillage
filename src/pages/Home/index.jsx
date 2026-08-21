import './index.css'

import Navbar from '../../components/Navbar/index.jsx'

import { AiFillMessage } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaLocationDot } from "react-icons/fa6";
import { CgProfile } from 'react-icons/cg';

import HomePageShortcuts from '../../components/HomePageShortcuts/index.jsx';
import WeatherInfo from '../../components/WeatherInfo/index.jsx';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useEffect, useState, useContext } from 'react';

import DiscussionsContext from '../../contexts/DiscussionsContext';

import { useTranslation } from 'react-i18next';
import {HashLoader} from "react-spinners";


const Home = () => {

    const navigate = useNavigate();
    const {
        discussions,
        fetchDiscussions
    } = useContext(DiscussionsContext);
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(
        i18n.language || localStorage.getItem('language') || 'en'
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDiscussions();
        setIsLoading(false);

    }, []);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        setLanguage(lang);
    };

    const shortcuts = [
        {
            name: t('startDiscussion'),
            icon: (
                <AiFillMessage
                    size={30}
                    color="#08c12a"
                />
            ),
            text: t('askOrShare')
        },
        {
            name: t('reportIssue'),
            icon: (
                <MdReportProblem
                    size={30}
                    color="#c10e08"
                />
            ),
            text: t('letUsKnow')
        },
        {
            name: t('announcements'),
            icon: (
                <TfiAnnouncement
                    size={30}
                    color="#0852c1"
                />
            ),
            text: t('stayUpdated')
        }
    ];


    

    const onGoToPage = (pageName) => {
        if (Cookies.get('jwt_token')) {
            if (pageName === t('startDiscussion')) {
                navigate('/discussions');
            } else if (pageName === t('reportIssue')) {
                navigate('/issues');
            }
        } else {
            navigate('/login');
        }
    };


    const renderDiscussionsAndIssues = () => {
        return (
            <div className="discussions">
                <div className="discussions-header">
                    <h1 className="discussions-title">
                        {t('recentDiscussions')}
                    </h1>
                    <button
                        className="view-all-btn"
                        onClick={() => navigate('/discussions')}
                    >
                        {t('viewAll')}
                    </button>
                </div>
                {
                    discussions && discussions.length > 0 ? (
                        <ul className="discussions-list-container">
                            {
                                discussions.slice(0, 1).map((discussion) => (
                                    <li
                                        key={discussion.discussion_id}
                                        className="discussion-item"
                                    >
                                        {
                                            discussion.profile_picture_url ? (
                                                <img
                                                    src={discussion.profile_picture_url}
                                                    alt="Profile"
                                                    className="discussion-user-profile-picture"
                                                />
                                            ) : (
                                                <CgProfile size={30} />

                                            )
                                        }
                                        <div>
                                            <p className="discussion-user-name">
                                                {discussion.name}
                                            </p>
                                            <p className="discussion-title">
                                                {discussion.title}
                                            </p>
                                            <p className="discussion-description">
                                                {discussion.content}
                                            </p>
                                            <p className="discussion-date">
                                                {
                                                    new Date(
                                                        discussion.created_at
                                                    ).toLocaleDateString()
                                                }
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <p className="no-discussions">
                            {t('noDiscussions')}
                        </p>
                    )
                }
            </div>
        );

    };


    const renderHomeView = () => {
        return (
        <>
            <Navbar />
            <div className="home-container">
                <div className="home-shortcuts-container">
                    <div className="language-switcher">
                        <button 
                            className={`language-btn ${language === 'en' ? 'active' : ''}`}
                            type="button"
                            onClick={() => changeLanguage('en')}
                            disabled={language === 'en'}
                        >
                            English
                        </button>
                        <button
                            className={`language-btn ${language === 'te' ? 'active' : ''}`}
                            type="button"
                            onClick={() => changeLanguage('te')}
                            disabled={language === 'te'}
                        >
                            తెలుగు
                        </button>
                    </div>
                    <h1 className="welcome-title">
                        {t('welcome')}
                    </h1>
                    <p className="welcome-subtitle">
                        {t('welcomeDescription')}
                    </p>
                    <p className="location">
                        <FaLocationDot color="#08c12a" />
                        Dondapadu, Telangana, 508246
                    </p>
                    <ul className="home-shortcuts-list-container">
                        {
                            shortcuts.map((shortcut) => (
                                <HomePageShortcuts
                                    key={shortcut.name}
                                    name={shortcut.name}
                                    icon={shortcut.icon}
                                    text={shortcut.text}
                                    onGoToPage={onGoToPage}
                                />
                            ))
                        }
                    </ul>
                    <hr className="divider" />
                    <WeatherInfo />
                    {renderDiscussionsAndIssues()}
                </div>
            </div>
        </>
    );
    }

    const renderLoadingView = () => {
        return (
            <div className="loading-container">
                <HashLoader color="#1bd233" size={15} />
            </div>
        )
    }
    return isLoading ? renderLoadingView() : renderHomeView();
}


export default Home;