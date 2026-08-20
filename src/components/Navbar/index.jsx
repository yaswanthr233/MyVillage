import './index.css'
import { IoMenuOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const profilePictureUrl = localStorage.getItem('profile_picture_url');
    return (
        <div className="navbar-container">
            <button className="menu-button"><IoMenuOutline size={30} /></button>
            <img src="https://res.cloudinary.com/duokznlha/image/upload/v1785779485/ChatGPT_Image_Aug_3_2026_11_20_51_PM_us6g9t.png" className="logo" />
            <div className="logo-name-text-container">
                <h1 className="logo-name">MyVillage</h1>
                <p className="logo-subtitle">One Village, One Community</p>
            </div>
            <div className="profile-container">
                {profilePictureUrl ? (
                    <img src={profilePictureUrl} alt="Profile" className="profile-picture" />
                ) : (
                    <CgProfile size={25} />
                )}
            </div>
        </div>
    )
}
export default Navbar;