import './index.css'
import Navbar from '../../components/Navbar/index.jsx'
import { AiFillMessage } from "react-icons/ai";
import HomePageShortcuts from '../../components/HomePageShortcuts/index.jsx';
import { MdReportProblem } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaLocationDot } from "react-icons/fa6";
import { useEffect,useState } from 'react';
import WeatherInfo from '../../components/WeatherInfo/index.jsx';
import { useContext } from 'react';
import DiscussionsContext from '../../contexts/DiscussionsContext';
import DiscussionItem from '../../components/DiscussionItem/index.jsx';
import { CgProfile } from 'react-icons/cg';

const shortcuts = [
    {
        name:'Start Discussion',
        icon:<AiFillMessage size={30} color="#08c12a" />,
        text:'Ask or Share'
    },
    {
        name:'Report Issue',
        icon:<MdReportProblem size={30} color="#c10e08" />,
        text:'Let us know '
    },
    {
        name:'Announcements',
        icon:<TfiAnnouncement  size={30} color="#0852c1" />,
        text:'Stay Updated'
    }
]



const Home = () => {
    const navigate = useNavigate()
    const {discussions, fetchDiscussions} = useContext(DiscussionsContext)
    const profilePictureUrl = localStorage.getItem('profile_picture_url');
    useEffect(() => {
        fetchDiscussions()
        console.log('discussions', discussions)
    },[])

    const onGoToPage = (pageName) => {
        if(Cookies.get('jwt_token')){
            if(pageName === 'Start Discussion'){
                navigate('/discussions')
            } else if(pageName === 'Report Issue'){
                navigate('/issues')
            }
        } else {
            navigate('/login')
        } 
    }

    const renderDiscussionsAndIssues = () => {
        return (
            <div className="discussions">
                <div className="discussions-header">
                    <h1 className="discussions-title">Recent Discussions</h1>
                    <button className="view-all-btn" onClick={() => navigate('/discussions')}>View All</button>
                </div>
                {
                    discussions && discussions.length > 0 ? (
                        <ul className="discussions-list-container">
                            {
                                discussions.slice(0, 1).map((discussion) => (
                                    <li key={discussion.discussion_id} className="discussion-item">
                                        {profilePictureUrl ? (
                                            <img src={profilePictureUrl} alt="Profile" className="discussion-user-profile-picture" />
                                        ) : (
                                            <CgProfile size={30} />
                                        )}
                                        <div>
                                            <p className="discussion-user-name">{discussion.name}</p>
                                            <p className="discussion-title">{discussion.title}</p>
                                            <p className="discussion-description">{discussion.content}</p>
                                            <p className="discussion-date">{new Date(discussion.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <p className="no-discussions">No discussions found.</p>
                    )
                }
            </div>
        )
    }

    

    

    return (
        <>
        <div className="home-container">
            <div className="home-shortcuts-container">
                <h1 className="welcome-title">Welcome to MyVillage</h1>
                <p className="welcome-subtitle">Let's make our village a better place today.</p>
                <p className="location"><FaLocationDot color="#08c12a" /> Dondapadu, Telangana, 508246</p>
                <ul className="home-shortcuts-list-container">
                    {
                        shortcuts.map((shortcut) => (
                            <HomePageShortcuts key={shortcut.name} name={shortcut.name} icon={shortcut.icon} text={shortcut.text} onGoToPage={onGoToPage} />
                        ))
                    }
                </ul>
                <hr className="divider"/>
                <WeatherInfo/>
                {renderDiscussionsAndIssues()}
            </div>
            
        </div>
        </>
    )
}
export default Home;