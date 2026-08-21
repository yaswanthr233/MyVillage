import './index.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { IoIosWarning } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { HashLoader } from 'react-spinners';

const IssueDetails = () => {
    const {id} = useParams();
    const [expanded, setExpanded] = useState(false);
    const [issueDetails, setIssueDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIssueDetails = async () => {
            setIsLoading(true);
            try {
                const jwtToken = Cookies.get('jwt_token');
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                };
                const response = await fetch(`${import.meta.env.VITE_API_URL}/issues/${id}`, options);
                const data = await response.json();
                setIssueDetails(data);
                console.log('Fetched issue details:', issueDetails);
            } catch (error) {
                console.error('Error fetching issue details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchIssueDetails();
    }, [id]);
    
    const renderIssueDetails = () => {
        return (
        <div className="issue-details-main-container">
            <button className="issue-details-back-button" onClick={() => window.history.back()}><IoMdArrowRoundBack size={20} /></button>
            <div className="issue-details-header-text-container">
                <div>
                    <h1 className="issue-details-title">Issue Details</h1>
                    <p className="issue-details-description">Complete information and current status</p>
                </div>
                <div className="issue-details-header-status-container">
                    <span className={`issue-details-status-indicator ${issueDetails?.status === 'OPEN' ? 'open-status' : 'closed-status'}`}></span>
                    <p className={`issue-details-status ${issueDetails?.status === 'OPEN' ? 'open-status' : 'closed-status'}`}>{issueDetails?.status}</p>
                </div>
            </div>
            <div className="issue-details-content-user-details-container">
                <img className="issue-details-user-avatar" src={issueDetails?.profile_picture_url} alt="User Avatar" />
                <div className="issue-details-user-details-text-container">
                    <p className="issue-details-user-name">{issueDetails?.name} <span className={`issue-details-user-role ${issueDetails?.role === 'admin' ? 'admin-role' : ''}`}>{issueDetails?.role}</span></p>
                    <p className="issue-details-user-created-at">Reported on {new Date(issueDetails?.created_at).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="issue-details-content-more-info-container">
                <div className="issue-details-content-location-container">
                    <FaLocationDot size={15} color="#fa3c08" />
                    <p className="issue-details-content-location">{issueDetails?.location}</p>
                </div>
                <div className="issue-details-content-location-container">
                    <MdCategory size={15} color="#fa3c08" />
                    <p className="issue-details-content-category">{issueDetails?.category}</p>
                </div>
            </div>
            <div className="issue-details-content-container">
                <div className="issue-details-content-header-container">
                    <div className="issue-details-content-warning-icon-container">
                        <IoIosWarning color="#856404" size={20} />
                    </div>
                    <h1 className="issue-details-content-title">{issueDetails?.title}</h1>
                </div>
                <div className="issue-details-content-description-container">
                    <p className={`issue-details-content-description ${expanded ? 'expanded' : ''}`}>
                        {issueDetails?.description}
                    </p>
                    <button className="issue-details-content-view-details-button" onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Show Less' : 'View Details'}
                    </button>
                </div>
                <div className="issue-details-content-image-container">
                    
                    {issueDetails?.image_url && <img src={issueDetails.image_url} alt="Issue" className="issue-details-content-image" />}
                </div>
                
            </div>
            

        </div>
    )
    }

    const renderLoadingView = () => {
        return (
            <div className="issue-details-loading-container">
                <HashLoader color="rgb(0, 170, 68)" size={40} />
            </div>
        )
    }

    return (
        isLoading ? renderLoadingView() : renderIssueDetails()
    )


};

export default IssueDetails;