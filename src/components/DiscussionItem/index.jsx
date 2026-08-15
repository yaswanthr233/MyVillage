import './index.css'
import { CgProfile } from "react-icons/cg";

const DiscussionItem = (props) => {
    const {title, content,name, likesCount, contentImage, createdAt, role} = props;
    const createdAtDate = new Date(createdAt);
    return (
        <li className="discussion-item">
            <div className="discussion-item-profile-container">
                <CgProfile size={30} />
            </div>
            <div className="discussion-item-content">
                <h3 className="discussion-item-title">{title}</h3>
                <p className="discussion-item-description">{content}</p>
                <div className="discussion-item-meta">
                    <p className="discussion-item-name">{name}</p>
                    <span className="discussion-item-date">{createdAtDate.toLocaleDateString()}</span>
                </div>
            </div>
            <div className="discussion-item-role-container">
                <p className="discussion-item-role">{role}</p>
            </div>
        </li>
    )
}
export default DiscussionItem