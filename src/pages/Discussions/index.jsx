import './index.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie'
import DiscussionsItem from '../../components/DiscussionItem';
import BeatLoader from "react-spinners/BeatLoader";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoClose } from "react-icons/io5";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';



const Discussions = () => {
    const navigate = useNavigate();
    if(Cookies.get('jwt_token') === undefined){
        navigate('/login');
    }
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'GENERAL',
    })
    const [activeTab, setActiveTab] = useState('all');
    const [activeCategory, setActiveCategory] = useState('GENERAL');
    const [discussions, setDiscussions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [filteredDiscussions, setFilteredDiscussions] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        titleError: false,
        contentError: false
    })
    const [count, setCount] = useState({
        titleCount: 0,
        contentCount: 0
    })




    useEffect(() => {
        const fetchDiscussions = async () => {
            const jwtToken = Cookies.get('jwt_token');
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                }
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/discussions`, options);
            if(response.ok){
                const data = await response.json();
                console.log(data);
                const formattedData = data.map(discussion => {
                    return {
                        id: discussion.discussion_id,
                        userId: discussion.user_id,
                        category: discussion.category,
                        content: discussion.content,
                        title: discussion.title,
                        createdAt: discussion.created_at,
                        likesCount: discussion.likes_count,
                        imageUrl: discussion.image_url,
                        name: discussion.name,
                        role: discussion.role
                    }
                });
                setDiscussions(formattedData);
                setIsLoading(false);
                setFilteredDiscussions(formattedData);
            } else {
                console.error('Failed to fetch discussions');
            }
        }
        fetchDiscussions();
    },[])

    

    const onFilterAll = () => {
        setActiveTab('all');
        setFilteredDiscussions(discussions);
    }

    const onFilterGeneral = () => {
        setActiveTab('general');
        setFilteredDiscussions(discussions.filter(discussion => discussion.category === 'GENERAL'));
    }
    const onFilterIssues = () => {
        setActiveTab('issues');
        setFilteredDiscussions(discussions.filter(discussion => discussion.category === 'ISSUES'));
    }

    const onFilterEvents = () => {
        setActiveTab('events');
        setFilteredDiscussions(discussions.filter(discussion => discussion.category === 'EVENTS'));
    }

    const onSearchChange = (event) => {
        const searchValue = event.target.value;
        setSearchInputValue(searchValue);
        setFilteredDiscussions(discussions.filter(discussion => discussion.title.toLowerCase().includes(searchValue.toLowerCase())));
    }

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (count.titleCount === 0 || count.contentCount === 0) {
        setErrorMessage({
            titleError: count.titleCount === 0,
            contentError: count.contentCount === 0
        });
        return;
    }

    const jwtToken = Cookies.get('jwt_token');
    const userId = localStorage.getItem('userId');
    const discussionData = {
        title: formData.title,
        content: formData.content,
        category: activeCategory,
        userId: userId
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(discussionData)
    };

    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/discussions`,
            options
        );

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            navigate("/");
        } else {
            console.error('Failed to create discussion');
        }
    } catch (error) {
        console.error('Error creating discussion:', error);
    }
    };

    const onTitleChange = (event) => {
        const titleValue = event.target.value;
        setCount(prevState => ({
            ...prevState,
            titleCount: titleValue.length
        }))
        setFormData(prevState => ({
            ...prevState,
            title: titleValue
        }))
    }

    const onContentChange = (event) => {
        const contentValue = event.target.value;
        setCount(prevState => ({
            ...prevState,
            contentCount: contentValue.length
        }))
        setFormData(prevState => ({
            ...prevState,
            content: contentValue
        }))
    }
   

    const renderLoadingView = () => {
        return (
            <div className="loading-container">
                <BeatLoader color="#1bd233" size={15} />
            </div>
        )
    }
    return (
        <div className="discussions-container">
            <h1 className="discussions-title">Discussions</h1>
            <p className="discussions-subtitle">Share your thoughts and connect with your village.</p>
            <div className="search-container">
                <IoSearch color="gray" />
                <input type="search" placeholder="Search discussions..." className="search-input" value={searchInputValue} onChange={onSearchChange} />
            </div>
            <div className="discussion-filter-container">
                <button className={`discussion-filter-button ${activeTab === 'all' ? 'active-filter' : ''}`} onClick={onFilterAll}>
                    All
                </button>
                <button className={`discussion-filter-button ${activeTab === 'general' ? 'active-filter' : ''}`} onClick={onFilterGeneral}>
                    General
                </button>
                <button className={`discussion-filter-button ${activeTab === 'events' ? 'active-filter' : ''}`} onClick={onFilterEvents}>
                    Events
                </button>
                <button className={`discussion-filter-button ${activeTab === 'issues' ? 'active-filter' : ''}`} onClick={onFilterIssues}>
                    Issues
                </button>
            </div>
            {isLoading ? (
                <div className="loading-container">
                    <BeatLoader color="#1bd233" size={15} />
                </div>
            ) : (
                <ul className="discussion-list"> 
                    {
                        filteredDiscussions.map(discussion => (
                            <DiscussionsItem key={discussion.id} title={discussion.title} content={discussion.content} name={discussion.name} likesCount={discussion.likesCount} contentImage={discussion.imageUrl} createdAt={discussion.createdAt} role={discussion.role} />
                        ))
                    }
                </ul>
            )}
            <button className="add-discussion-button" onClick={() => setIsPopupOpen(true)}>+</button>
            {
                isPopupOpen && (
                    <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} modal contentStyle={{
                    width: '100%',
                    height: '100%',
                    padding: '0',
                    backgroundColor: '#ffffff'
                    }}>
                        <div className="add-discussion-popup-content">
                            <div className="add-discussion-popup-header">
                                <button className="add-discussion-popup-close-button" onClick={() => setIsPopupOpen(false)}>
                                    <IoClose size={24} />
                                </button>
                                <h2 className="add-discussion-popup-title">Add Discussion</h2>
                            </div>
                            <form className="add-discussion-form" onSubmit={handleSubmit}>
                                <label className="add-discussion-label">Title {errorMessage.titleError && <span className="required">*</span>}</label>
                                <input type="text" placeholder="Enter Short Title" className="add-discussion-input" maxLength="100" onChange={onTitleChange} />
                                <div className="discussion-character-count-container">
                                    <span className="discussion-character-count">0/100</span>
                                </div>
                                <label className="add-discussion-label">Content {errorMessage.contentError && <span className="required">*</span>}</label>
                                <textarea placeholder="Share your thoughts..." className="add-discussion-textarea" maxLength="1000" onChange={onContentChange} />
                                <div className="discussion-character-count-container">
                                    <span className="discussion-character-count">0/1000</span>
                                </div>
                                <label className="add-discussion-label">Category <span className="required">*</span></label>
                                <div className="add-discussion-category-container">
                                    <button type="button" value="General" className={activeCategory === 'GENERAL' ? 'add-discussion-category-button active-category' : 'add-discussion-category-button'} onClick={() => setActiveCategory('GENERAL')}>
                                        General
                                    </button>
                                    <button type="button" value="Events" className={activeCategory === 'EVENTS' ? 'add-discussion-category-button active-category' : 'add-discussion-category-button'} onClick={() => setActiveCategory('EVENTS')}>
                                        Events
                                    </button>
                                    <button type="button" value="Issues" className={activeCategory === 'ISSUES' ? 'add-discussion-category-button active-category' : 'add-discussion-category-button'} onClick={() => setActiveCategory('ISSUES')}>
                                        Issues
                                    </button>
                                </div>
                                <div className="upload-img-container">
                                    <label className="add-discussion-label">Upload Image</label>
                                    <p className="add-discussion-file-input">Currently We are working on this feature.</p>
                                </div>
                                <label className="add-discussion-label tips-label">Tips</label>
                                <div className="add-discussion-tips-container">
                                    <IoShieldCheckmarkOutline size={16} color="#08c12a" />
                                    <p className="add-discussion-file-input-rules">Be respectful and follow the community guidelines.</p>
                                </div>
                                <button type="submit" className="add-discussion-submit-button">
                                    Add Discussion
                                </button>
                            </form>
                        </div>
                        
                    </Popup>
                )
            }
        </div>
    )
}
export default Discussions;