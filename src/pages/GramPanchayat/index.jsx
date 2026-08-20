import './index.css'
import { IoLocation } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdAccessTime } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdCampaign } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { useContext } from 'react';
import IssuesContext from '../../contexts/IssuesContext/index.jsx';
import Popup from "reactjs-popup";
import { useState,useEffect } from 'react';
import { IoMdSearch } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import Cookies from 'js-cookie';


const GramPanchayat = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const jwtToken = Cookies.get('jwt_token');
    const role = localStorage.getItem('role');
    const {issues, fetchIssues} = useContext(IssuesContext);
    const openIssuesCount = issues.filter(issue => issue.status === "OPEN").length;
    const inProgressIssuesCount = issues.filter(issue => issue.status === "IN_PROGRESS").length;
    const resolvedIssuesCount = issues.filter(issue => issue.status === "RESOLVED").length;
    const renderResidentView = () => {
        return(
            <>
            <div className="grampanchayat-members-container">
                <h2 className="grampanchayat-members-title">Panchayat Members</h2>
                <ul className="grampanchayat-members-list">
                    <li className="grampanchayat-members-item">
                        <CgProfile color="#087F08" size={30} />
                        <div className="grampanchayat-member-details">
                            <h3 className="grampanchayat-member-name">Chinnakesu Venkaya</h3>
                            <p className="grampanchayat-member-position">Sarpanch / President</p>
                        </div>
                    </li>
                    <li className="grampanchayat-members-item">
                        <CgProfile color="#087F08" size={30} />
                        <div className="grampanchayat-member-details">
                            <h3 className="grampanchayat-member-name">Member 2</h3>
                            <p className="grampanchayat-member-position">Vice President</p>
                        </div>
                    </li>
                    <li className="grampanchayat-members-item">
                        <CgProfile color="#087F08" size={30} />
                        <div className="grampanchayat-member-details">
                            <h3 className="grampanchayat-member-name">P. Saidulu</h3>
                            <p className="grampanchayat-member-position">Panchayat Secretary</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="grampanchayat-office-container">
                <h2 className="grampanchayat-office-title">Panchayat Office</h2>
                <ul className="grampanchayat-office-list">
                    <li className="grampanchayat-office-item">
                        <MdAccessTime size={20} color="#000" />
                        <p className="grampanchayat-office-detail">9:00 AM - 5:00 PM (Monday - Saturday)</p>
                    </li>
                    <li className="grampanchayat-office-item">
                        <CiLocationOn size={20} color="#000" />
                        <p className="grampanchayat-office-detail">Dondapadu, Telangana</p>
                    </li>
                </ul>
            </div>
            </>
        )
    }

    useEffect(() => {
        fetchIssues();
    },[]);



    const handleMarkInProgress = async (issueId) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ status: "IN_PROGRESS" })
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/issues/${issueId}`, options);
            if (!response.ok) {
                throw new Error('Failed to update issue status');
            }
            setIsPopupOpen(false);
            alert('Issue status updated to In Progress');
            window.location.reload(); 
        } catch (error) {
            console.error('Error updating issue status:', error);
        }
    };
    const handleMarkResolved = async (issueId) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ status: "RESOLVED" })
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/issues/${issueId}`, options);
            if (!response.ok) {
                throw new Error('Failed to update issue status');
            }
            setIsPopupOpen(false);
            alert('Issue status updated to Resolved');
            window.location.reload();
        } catch (error) {
            console.error('Error updating issue status:', error);
        }
    };


    const renderManageIssuesPopup = () => {
        return (
            <>
            {
                isPopupOpen && (
                    <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} modal
                    contentStyle={{ 
                        width: "100%",
                        height: "80vh",
                        padding: "0",
                        margin: "0",
                        backgroundColor: "#ffffff",
                        border: "none",
                        borderRadius: "30px 30px 0 0",
                        overflow: "auto",
                        position: "fixed",
                        bottom: "0",
                        left: "0",
                    }}
                    >
                        <div className="grampanchayat-manage-issues-popup">
                            <div className="popup-header-hr"/>
                            <div className="grampanchayat-manage-issues-popup-header-container">
                                <div>
                                <h1 className="grampanchayat-manage-issues-popup-header">Manage Issues</h1>
                                <p className="grampanchayat-manage-issues-popup-subheader">View, update and resolve reported issues.</p>
                                </div>
                                <button className="popup-close-button" onClick={() => setIsPopupOpen(false)}>X</button>
                            </div>
                            <div className="grampanchayat-manage-issues-popup-content-container">
                                <div className="search-bar-container">
                                    <IoMdSearch size={20} color="#666666" />
                                    <input type="text" className="search-bar-input" placeholder="Search issues..." />
                                </div>
                            </div>
                            <ul className="grampanchayat-manage-issues-list">
                                {issues.map((issue) => (
                                    <li key={issue.issue_id} className="grampanchayat-manage-issues-item">
                                        <div className="grampanchayat-manage-issues-item-details">
                                        <div className="grampanchayat-manage-issues-item-img-container">
                                            <img src={issue.image_url} alt={issue.title} className="grampanchayat-manage-issues-item-img" />
                                        </div>
                                        <div className="grampanchayat-manage-issues-item-text-container">
                                            <h3 className="grampanchayat-manage-issues-item-title">{issue.title}</h3>
                                            <p className="grampanchayat-manage-issues-item-location"><CiLocationOn /> {issue.location}</p>
                                            <p className="grampanchayat-manage-issues-item-date"><CiCalendar /> {new Date(issue.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className={`grampanchayat-manage-issues-item-status ${issue.status.toLowerCase()}`}>
                                            {issue.status === 'OPEN' ? 'Open' : issue.status === 'IN_PROGRESS' ? 'In Progress' : issue.status === 'RESOLVED' ? 'Resolved' : 'Closed'}
                                        </div>
                                        </div>
                                        <div className="issues-popup-btns-container">
                                            <button className="issues-popup-btn view-btn"><FaEye /> View Details</button>
                                            <button className="issues-popup-btn in-progress-btn" onClick={() => handleMarkInProgress(issue.id)}>
                                                <FcProcess color="#3191ff" /> Mark In Progress
                                            </button>
                                            <button className="issues-popup-btn resolved-btn" onClick={() => handleMarkResolved(issue.id)}>
                                                <FcCheckmark color="#16833b" /> Mark Resolved
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Popup>
                )
            }
            </>
        )
    }

    const renderAdminView = () => {
        return (
            <div className="grampanchayat-admin-container">
                <ul className="grampanchayat-admin-shortcut-list">
                <li className="grampanchayat-admin-shortcut-item">
                    <MdCampaign className="grampanchayat-admin-shortcut-icon" />
                    <p className="grampanchayat-admin-shortcut-text">Add<br />Update</p>
                </li>
                <li className="grampanchayat-admin-shortcut-item" onClick={() => setIsPopupOpen(true)}>
                    <MdErrorOutline className="grampanchayat-admin-shortcut-icon" />
                    <p className="grampanchayat-admin-shortcut-text">Manage<br />Issues</p>
                </li>
                <li className="grampanchayat-admin-shortcut-item">
                    <MdGroups className="grampanchayat-admin-shortcut-icon" />
                    <p className="grampanchayat-admin-shortcut-text">
                        Manage<br />Members
                    </p>
                </li>
                <li className="grampanchayat-admin-shortcut-item">
                    <MdAccountBalance className="grampanchayat-admin-shortcut-icon" />
                    <p className="grampanchayat-admin-shortcut-text">
                        Panchayat<br />Info
                    </p>
                </li>
                </ul>
                
                <div className="grampanchayat-issues-summary">
                    <h2 className="grampanchayat-issues-title">Active Issues Summary</h2>
                    <div className="grampanchayat-issues-cards">
                        <div className="grampanchayat-issue-card open">
                            <h3 className="grampanchayat-issue-card-number">{openIssuesCount}</h3>
                            <p className="grampanchayat-issue-card-label">Open</p>
                        </div>
                        <div className="grampanchayat-issue-card progress">
                            <h3 className="grampanchayat-issue-card-number">{inProgressIssuesCount}</h3>
                            <p className="grampanchayat-issue-card-label">In Progress</p>
                        </div>
                        <div className="grampanchayat-issue-card resolved">
                            <h3 className="grampanchayat-issue-card-number">{resolvedIssuesCount}</h3>
                            <p className="grampanchayat-issue-card-label">Resolved</p>
                        </div>
                    </div>
                </div>
                {renderManageIssuesPopup()}
            </div>
        )
    }

    return (
        <div className="grampanchayat-container">
            <div className="grampanchayat-header-container">
                <div className="grampanchayat-header-image-container">
                    <img className="grampanchayat-header-image" src="https://res.cloudinary.com/duokznlha/image/upload/v1787212200/ChatGPT_Image_Aug_20_2026_01_19_26_PM_wrj2e9.png" alt="Gram Panchayat" />
                </div>
                <div className="grampanchayat-header-text">
                    <h1 className="grampanchayat-header-title">Gram Panchayat</h1>
                    <p className="grampanchayat-header-location"><IoLocation size={12} color="#666666" /> Dondapadu, Telangana</p>
                </div>
            </div>
            {role === 'RESIDENT' ? renderResidentView() : renderAdminView()}
        </div>
    )
}

export default GramPanchayat;