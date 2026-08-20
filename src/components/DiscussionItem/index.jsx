import './index.css';
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

const DiscussionItem = (props) => {

    const {
        title,
        content,
        name,
        likesCount,
        contentImage,
        createdAt,
        role,
        profilePictureUrl
    } = props;

    const createdAtDate = new Date(createdAt);

    const formattedDate = createdAtDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <li className="discussion-item">
            <div className="discussion-user-row">
                <div className="discussion-user-info">
                    {
                        profilePictureUrl ? (
                            <img src={profilePictureUrl} alt="Profile" className="discussion-user-profile-picture" />
                        ) : (
                            <CgProfile size={30} />
                        )
                    }
                    <div className="discussion-user-details">
                        <div className="discussion-name-row">
                            <h3 className="discussion-user-name">
                                {name}
                            </h3>
                            <span className="discussion-role">
                                {role}
                            </span>
                        </div>
                        <span className="discussion-date">
                            {formattedDate}
                        </span>
                    </div>
                </div>
                <button className="discussion-menu-button">
                    ⋮
                </button>
            </div>
            <h2 className="discussion-item-title">
                {title}
            </h2>
            <p className="discussion-item-description">
                {content}
            </p>
            {contentImage && (
                <img
                    src={contentImage}
                    alt="Discussion"
                    className="discussion-item-image"
                />
            )}
            <div className="discussion-bottom-row">
                <div className="discussion-actions">
                    <button className="discussion-action-button">
                        <FaRegHeart size={18} />
                        <span>{likesCount || 0}</span>
                    </button>
                </div>
            </div>
        </li>
    );
};

export default DiscussionItem;