import './index.css'
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa6";


const IssueItem = (props) => {
    const {title, description, location, userName, createdAt,status,image} = props;
    const statusText = status === 'OPEN' ? 'Open' : status === 'IN_PROGRESS' ? 'In Progress' : status === 'RESOLVED' ? 'Resolved' : 'Closed';
    const createdAtDate = new Date(createdAt);
    return (
        <li className="issue-item-container">
            <div className="issue-profile-container">
                <CgProfile size={30} />
            </div>
            <div className="issue-details-container">
                <div className="issue-header-container">
                    <p className="issue-user-name">{userName}</p>
                    <p className="issue-date">{createdAtDate.toLocaleDateString()}</p>
                </div>
                <div className="issue-content-container">
                    <h1 className="issue-title">{title}</h1>
                    <p className="issue-description">{description}</p>
                </div>
                <div className="issue-images-container">
                    {image && <img src={image} alt="Issue" className="issue-image"  />}
                </div>
                <div className="issue-footer-container">
                    <p className="issue-location">< IoLocationOutline size={16}/> {location}</p>
                    <p className={`issue-status ${status.toLowerCase()}`}>{statusText}</p>
                </div>
                <div className="view-details-btn-container">
                    <button className="view-details-btn"><span className="view-details-text">View Details</span> <FaArrowRight  /></button>
                </div>
            </div>
            
        </li>
    )
}
export default IssueItem