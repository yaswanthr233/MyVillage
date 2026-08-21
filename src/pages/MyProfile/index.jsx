import './index.css'
import { IoArrowBack } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useState,useEffect } from 'react';
import { AiFillMessage } from "react-icons/ai";
import Cookies from 'js-cookie';
import {BeatLoader} from 'react-spinners';
import React,{useContext} from 'react';
import { TiWarning } from "react-icons/ti";
import { FaAngleUp } from "react-icons/fa";
import Popup from "reactjs-popup";
import { GoPerson } from "react-icons/go";

const MyProfile = () => {
    const jwtToken = Cookies.get('jwt_token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    const phone = localStorage.getItem('phone');
    const email = localStorage.getItem('email');
    const profilePictureUrl = localStorage.getItem('profile_picture_url');
    const [isUploading, setIsUploading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [onEditMode, setOnEditMode] = useState(false);
    const [formData, setFormData] = useState({
        profile_picture_url: profilePictureUrl || '',
        name: name || '',
        phone: phone || '',
        email: email || '',
        gender: '',
        dob: '',
    });
    const isResident = role === 'RESIDENT';

    const onSubmitEditProfile =  async (e) => {
        e.preventDefault();
        const updatedProfileData = {
            name: formData.name,
            phone: formData.phone,
            gender: formData.gender,
            dob: formData.dob,
        };
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(updatedProfileData),
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, options);
            if (response.ok) {
                const data = await response.json();
                console.log('Profile updated successfully:', data);
                localStorage.setItem('userName', data.user.name);
                localStorage.setItem('phone', data.user.phone_number);
                localStorage.setItem('gender', data.user.gender);
                localStorage.setItem('dob', data.user.dob);
                localStorage.setItem('profile_picture_url', data.user.profile_picture_url);
                setFormData((prev) => ({ ...prev, name: data.user.name, phone: data.user.phone_number, gender: data.user.gender, dob: data.user.dob , profile_picture_url: data.user.profile_picture_url}));
                setOnEditMode(false);

                alert('Profile updated successfully!');

            } else {
                console.error('Failed to update profile:', response.status);
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        }
    }

    const handleProfilePictureChange = async (event) => {
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
            profile_picture_url: imageData.secure_url,
        }));

    } catch (error) {
        console.error("IMAGE UPLOAD ERROR:", error);
    } finally {
        setIsUploading(false);
    }
};
    const handleUpdateProfile = async () => {

    const imageUrl = formData.profile_picture_url;

    if (!imageUrl) {
        console.error("No image URL to update");
        return;
    }

    try {

        setIsUploading(true);

        console.log("Updating database with:");
        console.log("User ID:", userId);
        console.log("Image URL:", imageUrl);

        const apiUrl =
            `${import.meta.env.VITE_API_URL}/users/${userId}/profile-picture`;

        const response = await fetch(apiUrl, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },

            body: JSON.stringify({
                profile_picture_url: imageUrl,
            }),
        });

        const responseText = await response.text();

        console.log("Backend status:", response.status);
        console.log("Backend response:", responseText);

        if (!response.ok) {
            throw new Error(
                `Failed to update profile picture: ${response.status} ${responseText}`
            );
        }

        let result;

        try {
            result = JSON.parse(responseText);
        } catch {
            result = responseText;
        }

        console.log("Profile update result:", result);

        // Save the exact URL that was sent
        localStorage.setItem(
            "profile_picture_url",
            imageUrl
        );

        setFormData((prev) => ({
            ...prev,
            profile_picture_url: imageUrl,
        }));

        setIsPopupOpen(false);

    } catch (error) {

        console.error(
            "ERROR UPDATING PROFILE PICTURE:",
            error
        );

    } finally {

        setIsUploading(false);

    }
};

    const renderEditModePopup = () => {
        return (
            onEditMode && (
                <Popup
                    open={onEditMode}
                    onClose={() => setOnEditMode(false)}
                    modal
                    contentStyle={{ width: '300px', padding: '20px', borderRadius: '15px' , height: '500px'}}
                >
                    <div className="my-profile-edit-mode-container">
                        <button className="my-profile-edit-mode-close-button" onClick={() => setOnEditMode(false)}>X</button>
                        <form className="my-profile-edit-mode-form" onSubmit={onSubmitEditProfile}>
                            <label htmlFor="name"><GoPerson color="#029f1f" /> Full Name</label>
                            <input type="text" required id="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} />
                            <label htmlFor="phone"><FaPhoneAlt color="#029f1f" /> Phone</label>
                            <input type="text" required id="phone" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} />
                            <label htmlFor="gender"><GoPerson color="#029f1f" /> Gender</label>
                            <select id="gender" value={formData.gender} onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <label htmlFor="dob"><TiWarning color="#029f1f" /> Date of Birth</label>
                            <input type="date" required id="dob" value={formData.dob} onChange={(e) => setFormData((prev) => ({ ...prev, dob: e.target.value }))} />
                            <button type="submit" className="my-profile-edit-mode-save-button">Save Changes</button>
                        </form>
                    </div>
                </Popup>
            )
        )
    }

    const renderMyProfile = () => {
        return (
        <div className="my-profile-container">
            {renderEditModePopup()}
            <div className="my-profile-header-container">
                <button className="my-profile-header-back-button" onClick={() => window.history.back()}>
                    <IoArrowBack size={24}/>
                </button>
                <h1 className="my-profile-header">My Profile</h1>
            </div>
            <div className="my-profile-info-container">
                <div className="my-profile-content-container">
                    <div>
                        {formData.profile_picture_url ? (
                            <img src={formData.profile_picture_url} alt="Profile" className="my-profile-image" />
                        ) : (
                            <CgProfile size={48} />
                        )}
                        <button className="my-profile-change-picture-button"  onClick={() => setIsPopupOpen(true)}><FaAngleUp size={16} color="#fff" />Change</button>
                    </div>
                    <div className="my-profile-details-container">
                        <p className="my-profile-detail-name">{name}</p>
                        <p className={isResident ? "my-profile-detail-role" : "my-profile-detail-role-admin"}>
                            {isResident ? "Resident" : "Admin"}
                        </p>
                        <div className="my-profile-detail-phone-container">
                            <FaPhoneAlt size={14} />
                            <p className="my-profile-detail-phone">{phone}</p>
                        </div>
                        <div className="my-profile-detail-email-container">
                            <MdEmail size={14} />
                            <p className="my-profile-detail-email">{email}</p>
                        </div>
                        <button className="my-profile-edit-button" onClick={() => setOnEditMode(true)}>
                            <FiEdit2 size={12} color="#000" /> <span className="my-profile-edit-button-text">Edit Profile</span>
                        </button>
                    </div>
                </div>
                {
                    isPopupOpen && (
                       <Popup 
                       open={isPopupOpen}
                       onClose={() => setIsPopupOpen(false)}
                       modal
                       contentStyle={{ width: '200px', padding: '20px', borderRadius: '15px',height: '150px',  }}
                       >
                        <div className="my-profile-popup-update-profile-container">
                            <button className="my-profile-popup-update-profile-close-button" onClick={() => setIsPopupOpen(false)}>X</button>
                            <input type="file" className="my-profile-popup-update-profile-input" onChange={(e) => handleProfilePictureChange(e)} />
                            <button className="my-profile-popup-update-profile-button" onClick={handleUpdateProfile}>
                                {
                                    isUploading ? (
                                        <BeatLoader color="#fff" size={10} />
                                    ) : (
                                        "Update Profile Picture"
                                    )
                                }
                            </button>
                        </div>
                       </Popup>
                    )
                }
            </div>
            
        </div>
    )
    }

    const renderLoadingPage = () => {
        return (
            <div className="loading-container">
                <BeatLoader color="#1bd233" size={15} />
            </div>
        )
    }
    
    return  renderMyProfile();
}


export default MyProfile