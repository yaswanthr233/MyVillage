import { FaPlus } from 'react-icons/fa'
import './index.css'
import {useEffect, useState} from 'react'
import { IoSearch } from 'react-icons/io5'
import Cookies from 'js-cookie'
import IssueItem from '../../components/IssueItem'
import { BeatLoader } from 'react-spinners'
import Popup from 'reactjs-popup'
import { BiError } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'


const Issues =  () => {
    const navigate = useNavigate();
    const jwtToken = Cookies.get('jwt_token');
    const userId = localStorage.getItem('userId');
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        category: 'ROAD',
        title: '',
        description: '',
        location: '',
        image: '',
        userId: localStorage.getItem('userId'),
    });

    
    useEffect(() => {
        const fetchIssues = async () => {
            try{
                const token = Cookies.get('jwt_token');
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token}`
                    }
                }
                const response = await fetch(`${import.meta.env.VITE_API_URL}/issues`, options)
                if(response.ok){
                    const data = await response.json();
                    setIssues(data);
                    setFilteredIssues(data);
                    setIsLoading(false);
                    console.log(data);
                } else {
                    console.error('Failed to fetch issues');
                }
            } catch (error) {
                console.error('Error fetching issues:', error.message);
            }
        }
        fetchIssues();
    },[])

    const onFilterAll = () => {
        setFilteredIssues(issues);
        setActiveCategory('All');
    }
    const onFilterOpen = () => {
        const openIssues = issues.filter(issue => issue.status === 'OPEN');
        setFilteredIssues(openIssues);
        setActiveCategory('OPEN');
    }

    const onFilterInProgress = () => {
        const inProgressIssues = issues.filter(issue => issue.status === 'IN_PROGRESS');
        setFilteredIssues(inProgressIssues);
        setActiveCategory('IN_PROGRESS');
    }

    const onFilterResolved = () => {
        const resolvedIssues = issues.filter(issue => issue.status === 'RESOLVED');
        setFilteredIssues(resolvedIssues);
        setActiveCategory('RESOLVED');
    }

    const renderLoadingView = () => {
        return (
            <div className="loading-container">
                <BeatLoader color="#1bd233" size={15} />
            </div>
        )
    }
    const onSearchIssues = (event) => {
        setSearchQuery(event.target.value);
        const filtered = issues.filter(issue => 
            issue.title.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredIssues(filtered);
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

        console.log("Cloudinary status:", response.status);

        const imageData = await response.json();

        console.log("Cloudinary response:", imageData);

        if (!response.ok) {
            throw new Error(
                imageData.error?.message || "Cloudinary upload failed"
            );
        }

        if (!imageData.secure_url) {
            throw new Error("Cloudinary did not return secure_url");
        }

        console.log("IMAGE URL:", imageData.secure_url);

        setFormData((prev) => ({
            ...prev,
            image: imageData.secure_url,
        }));

    } catch (error) {
        console.error("IMAGE UPLOAD ERROR:", error);
    } finally {
        setIsUploading(false);
    }
};

    const onSubmitReportIssue = async (event) => {
        event.preventDefault();
        try{
            const token = Cookies.get('jwt_token');
            console.log("From submit" + JSON.stringify(formData));
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/issues`, options);
            if(response.ok){
                const data = await response.json();
                console.log('Issue reported successfully:', data.issue);
                setIsPopupOpen(false);
                navigate('/issues');

            }
            const fetchIssuesResponse = await fetch(`${import.meta.env.VITE_API_URL}/issues`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            });
            if(fetchIssuesResponse.ok){
                const data = await fetchIssuesResponse.json();
                setIssues(data);
                setFilteredIssues(data);
            }
        } catch (error) {
            console.error('Error reporting issue:', error.message);
        }
    }

    const renderIssuesList = () => {
        return (
        <div className="issues-page-container">
            <div className="issues-page-header-container">
                <div>
                    <h1 className="issues-page-header-text">Issues</h1>
                    <p className="issues-page-header-description">Report problems and track their status.</p>
                </div>
                <div>
                    <button className="report-issue-btn" onClick={() => setIsPopupOpen(true)}>
                        <FaPlus /> <span>Report Issue</span>
                    </button>
                </div>
            </div>
            <div className="search-container">
                <IoSearch color="gray" />
                <input type="search" placeholder="Search issues..." className="search-input" value={searchQuery} onChange={onSearchIssues} />
            </div>
            <div className="issues-filter-container">
                <button className={`issues-filter-btn ${activeCategory === 'All' ? 'active' : ''}`} onClick={onFilterAll}>All</button>
                <button className={`issues-filter-btn ${activeCategory === 'OPEN' ? 'active' : ''}`} onClick={onFilterOpen}>Open</button>
                <button className={`issues-filter-btn ${activeCategory === 'IN_PROGRESS' ? 'active' : ''}`} onClick={onFilterInProgress}>In Progress</button>
                <button className={`issues-filter-btn ${activeCategory === 'RESOLVED' ? 'active' : ''}`} onClick={onFilterResolved}>Resolved</button>
            </div>
            <ul className="issues-list-container">
                {filteredIssues.map(issue => (
                    <IssueItem key={issue.id} title={issue.title} description={issue.description} location={issue.location} userName={issue.name} createdAt={issue.created_at} status={issue.status} image={issue.image_url} />
                ))}
            </ul>
            {
                isPopupOpen && (
                    <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} modal contentStyle={{
                    width: '90%',
                    height: '80%',
                    padding: '0',
                    backgroundColor: '#ffffff',
                    border: 'none',
                    borderRadius: '15px',
                    overflow: 'auto',
                    }
                }>
                        <div className="popup-content-container">
                            <div className="popup-header-container">
                                <div className="popup-header-icon-container">
                                    <BiError size={30} color="#c10e08" />
                                </div>
                                <div className="popup-header-text-container">
                                    <h1 className="popup-header-text">Report Issue</h1>
                                    <p className="popup-header-description">Help us improve our village by reporting problems.</p>
                                </div>
                                <button className="popup-close-btn" onClick={() => setIsPopupOpen(false)}>
                                    <IoClose size={20} />
                                </button>
                            </div>
                            <div className="popup-body-container">
                                <form className="report-issue-form" onSubmit={onSubmitReportIssue}> 
                                    <label htmlFor="category" className="report-issue-form-label">Category <span className="required">*</span></label>   
                                    <select id="category" name="category" className="report-issue-form-select" value={formData.category} required onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                        <option value="ROAD">Road</option>
                                        <option value="INFRASTRUCTURE">Infrastructure</option>
                                        <option value="SANITATION">Drainage</option>
                                        <option value="WATER">Water</option>
                                        <option value="ELECTRICITY">Electricity</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    <label htmlFor="title" className="report-issue-form-label">Title <span className="required">*</span></label>
                                    <input type="text" id="title" name="title" className="report-issue-form-input" placeholder="Enter issue title" required maxLength="100" onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                                    <label htmlFor="description" className="report-issue-form-label">Description <span className="required">*</span></label>
                                    <textarea id="description" name="description" className="report-issue-form-textarea" placeholder="Enter issue description" required maxLength="1000" onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                                    <label htmlFor="location" className="report-issue-form-label">Location <span className="required">*</span></label>
                                    <input type="text" id="location" name="location" className="report-issue-form-input location" placeholder="Enter issue location" required maxLength="200" onChange={(e) => setFormData({...formData, location: e.target.value})} />
                                    <label htmlFor="image" className="report-issue-form-label">Image (Atleast one required)</label>
                                    <input type="file" id="image" name="image" className="report-issue-form-image-upload-input"  accept="image/*" onChange={handleFiles} />
                                    <div className="add-issue-tips-container">
                                        <IoShieldCheckmarkOutline size={16} color="#08c12a" />
                                        <p className="add-issue-rules">Be respectful and follow the community guidelines.</p>
                                    </div>
                                    {
                                        isUploading? (
                                            <div className="loading-container">
                                                <BeatLoader color="#1bd233" size={15} />
                                            </div>
                                            
                                        ) : (
                                             <button type="submit" className="report-issue-form-submit-btn">Submit Issue</button>
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                    </Popup>
                )
            }
        </div>
    )
    }
    return isLoading ? renderLoadingView() : renderIssuesList();
}
export default Issues