import './index.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie'
import DiscussionsItem from '../../components/DiscussionItem';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoClose } from "react-icons/io5";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import DiscussionsContext from '../../contexts/DiscussionsContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { HashLoader, BeatLoader } from 'react-spinners';


const Discussions = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const jwtToken = Cookies.get('jwt_token');
    const { discussions, isLoading, error, fetchDiscussions } = useContext(DiscussionsContext);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('GENERAL');
    const [activeTab, setActiveTab] = useState('ALL');
    const [searchInputValue, setSearchInputValue] = useState('');
    const [filteredDiscussions, setFilteredDiscussions] = useState(discussions);
    const [errorMessage, setErrorMessage] = useState({ titleError: false, contentError: false, imageError: '' });
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '' , imageUrl: null});

    useEffect(() => {
        setFilteredDiscussions(discussions);
    }, [discussions]);

    const onSearchChange = (event) => {
        setSearchInputValue(event.target.value);
        const filteredDiscussions = discussions.filter(discussion => discussion.title.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredDiscussions(filteredDiscussions);
    }
    const onFilterAll = () => {
        setActiveTab('ALL');
        setFilteredDiscussions(discussions);
    }

    const onFilterGeneral = () => {
        setActiveTab('GENERAL');
        const filteredDiscussions = discussions.filter(discussion => discussion.category === 'GENERAL');
        setFilteredDiscussions(filteredDiscussions);
    }
    const onFilterEvents = () => {
        setActiveTab('EVENTS');
        const filteredDiscussions = discussions.filter(discussion => discussion.category === 'EVENTS');
        setFilteredDiscussions(filteredDiscussions);
    }
    const renderLoadingView = () => {
        return (
            <div className="loading-container">
                <HashLoader color="#1bd233" size={15} />
            </div>
        )
    }

    const onTitleChange = (event) => {
        setFormData({ ...formData, title: event.target.value });
    }
    const onContentChange = (event) => {
        setFormData({ ...formData, content: event.target.value });
    }

   const handleFiles = async (event) => {
    const file = event.target.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }

    try {
        setIsUploading(true);

        const data = new FormData();

        data.append("file", file);
        data.append("upload_preset", "my_village");

        console.log("Uploading file:", file.name);

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/duokznlha/image/upload",
            {
                method: "POST",
                body: data,
            }
        );

        const imageData = await response.json();

        console.log("Cloudinary response:", imageData);

        if (!response.ok) {
            throw new Error(
                imageData.error?.message || "Cloudinary upload failed"
            );
            setErrorMessage({ ...errorMessage, imageError: "Image upload failed" });
        }

        if (!imageData.secure_url) {
            throw new Error("Cloudinary did not return secure_url");
        }

        console.log("IMAGE URL:", imageData.secure_url);

        setFormData((prev) => ({
            ...prev,
            imageUrl: imageData.secure_url,
        }));

    } catch (error) {
        console.error("IMAGE UPLOAD ERROR:", error);
    } finally {
        setIsUploading(false);
    }
};

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(formData.title === ''){
            setErrorMessage({ ...errorMessage, titleError: true });
        } else if(formData.content === ''){
            setErrorMessage({ ...errorMessage, contentError: true });
        } else if(formData.imageUrl === ''){
            setErrorMessage({ ...errorMessage, imageError: true });
        } else {
            setIsUploading(true);
            const jwtToken = Cookies.get('jwt_token');
            const apiUrl = `${import.meta.env.VITE_API_URL}/discussions`;
            const userId = localStorage.getItem('userId');
            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    content: formData.content,
                    category: activeCategory,
                    userId: userId,
                    imageUrl: formData.imageUrl,
                }),
            };
            try {
                const response = await fetch(apiUrl, options);
                if (response.ok) {
                    const data = await response.json();
                    setFilteredDiscussions(prevDiscussions => [data, ...prevDiscussions]);
                    setIsPopupOpen(false);
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error adding discussion:', error);
            }
            setIsUploading(false);
        }
    }

    return (
        <div className="discussions-container">
            <h1 className="discussions-title">Discussions</h1>
            <p className="discussions-subtitle">Share your thoughts and connect with your village.</p>
            <div className="search-container">
                <IoSearch color="gray" />
                <input type="search" placeholder={t('searchDiscussions')} className="search-input" value={searchInputValue} onChange={onSearchChange} />
            </div>
            <div className="discussion-filter-container">
                <button className={`issues-filter-btn ${activeTab === 'ALL' ? 'active' : ''}`} onClick={onFilterAll}>
                    {t('all')}
                </button>
                <button className={`issues-filter-btn ${activeTab === 'GENERAL' ? 'active' : ''}`} onClick={onFilterGeneral}>
                    {t('general')}
                </button>
                <button className={`issues-filter-btn ${activeTab === 'EVENTS' ? 'active' : ''}`} onClick={onFilterEvents}>
                    {t('events')}
                </button>
            </div>
            {isLoading ? (
                <div className="loading-container">
                    <HashLoader color="#1bd233" size={15} />
                </div>
            ) : error ? (  
            <p>{error}</p>
            )
            :(
                <ul className="discussion-list"> 
                    {
                        filteredDiscussions.map(discussion => (
                            <DiscussionsItem key={discussion.discussion_id} title={discussion.title} content={discussion.content} name={discussion.name} likesCount={discussion.likes_count} contentImage={discussion.image_url} createdAt={discussion.created_at} role={discussion.role} profilePictureUrl={discussion.profile_picture_url} />
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
                                <h2 className="add-discussion-popup-title">{t('addDiscussion')}</h2>
                            </div>
                            <form className="add-discussion-form" onSubmit={handleSubmit}>
                                <label className="add-discussion-label">{t('title')} {errorMessage.titleError && <span className="required">*</span>}</label>
                                <input type="text" placeholder={t('enterShortTitle')} className="add-discussion-input" maxLength="100" onChange={onTitleChange} />
                                <div className="discussion-character-count-container">
                                    <span className="discussion-character-count">0/100</span>
                                </div>
                                <label className="add-discussion-label">{t('content')} {errorMessage.contentError && <span className="required">*</span>}</label>
                                <textarea placeholder={t('shareYourThoughts')} className="add-discussion-textarea" maxLength="1000" onChange={onContentChange} />
                                <div className="discussion-character-count-container">
                                    <span className="discussion-character-count">0/1000</span>
                                </div>
                                <label className="add-discussion-label">{t('category')} <span className="required">*</span></label>
                                <div className="add-discussion-category-container">
                                    <button type="button" value="General" className={activeCategory === 'GENERAL' ? 'add-discussion-category-button active-category' : 'add-discussion-category-button'} onClick={() => setActiveCategory('GENERAL')}>
                                        {t('general')}
                                    </button>
                                    <button type="button" value="Events" className={activeCategory === 'EVENTS' ? 'add-discussion-category-button active-category' : 'add-discussion-category-button'} onClick={() => setActiveCategory('EVENTS')}>
                                        {t('events')}
                                    </button>
                                </div>
                                <div className="upload-img-container">
                                    <label className="add-discussion-label">{t('uploadImage')}</label>
                                    <input type="file" accept="image/*" className="add-discussion-file-input" onChange={handleFiles} />
                                    {errorMessage.imageError !== '' && <span className="required">{errorMessage.imageError}</span>}
                                </div>
                                <label className="add-discussion-label tips-label">{t('tips')}</label>
                                <div className="add-discussion-tips-container">
                                    <IoShieldCheckmarkOutline size={16} color="#08c12a" />
                                    <p className="add-discussion-file-input-rules">{t('beRespectful')}</p>
                                </div>
                                {
                                    isUploading ? (
                                        <div className="loading-container">
                                            <BeatLoader color="#1bd233" size={40} />
                                            </div>)
                                    : (
                                        <button type="submit" className="add-discussion-submit-button">
                                    {t('addDiscussion')}
                                </button>
                                    )
                                }
                                
                            </form>
                        </div>
                        
                    </Popup>
                )
            }
        </div>
    )
}
export default Discussions;