import './index.css'
import Navbar from '../../components/Navbar/index.jsx'
import { AiFillMessage } from "react-icons/ai";
import HomePageShortcuts from '../../components/HomePageShortcuts/index.jsx';
import { MdReportProblem } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


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
                <h1 className="discussions-title">Discussions</h1>
            </div>
        )
    }

    return (
        <>
        <div className="home-container">
            <div className="home-shortcuts-container">
                <h1 className="welcome-title">Welcome to MyVillage</h1>
                <p className="welcome-subtitle">Let's make our village a better place today.</p>
                <ul className="home-shortcuts-list-container">
                    {
                        shortcuts.map((shortcut) => (
                            <HomePageShortcuts key={shortcut.name} name={shortcut.name} icon={shortcut.icon} text={shortcut.text} onGoToPage={onGoToPage} />
                        ))
                    }
                </ul>
                <hr className="divider"/>
                {renderDiscussionsAndIssues()}
            </div>
            
        </div>
        </>
    )
}
export default Home;