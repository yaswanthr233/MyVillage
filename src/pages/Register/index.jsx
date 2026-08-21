import './index.css'
import { FaRegUser } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import {IoMdLock } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup'
import {HashLoader} from "react-spinners";

const Register = () => {
    if(Cookies.get('jwt_token') !== undefined){
        return <Navigate to="/" replace />
    }
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        village: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        name: 'hide',
        phoneNumber: 'hide',
        email: 'hide',
        password: 'hide',
        village: 'hide'
    });
    const [isEmailExists, setIsEmailExists] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const onNavigateToLogin = () => {
        navigate('/login')
    }

    const onRegisterAccount  = async (e) => {
        e.preventDefault();
        
        if(userDetails.name !== '' && userDetails.phoneNumber !== '' && userDetails.email !== '' && userDetails.password !== ''){
            setIsLoading(true);
            const userData = {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password,
                phoneNumber: userDetails.phoneNumber,
                village: userDetails.village
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`,options);
            setIsLoading(false);
            if(response.ok){
                const data = await response.text();
                console.log(data);
                navigate('/login')
            } else {
                const errorData = await response.text();
                if(errorData.includes('User already exists')){
                    setIsEmailExists(true);
                    console.error('Error:', errorData);
                }
            }
        } else {
            setErrorMessage({
                name: userDetails.name === '' ? 'show' : 'hide',
                phoneNumber: userDetails.phoneNumber === '' ? 'show' : 'hide',
                email: userDetails.email === '' ? 'show' : 'hide',
                password: userDetails.password === '' ? 'show' : 'hide'
            })
        }
    }
   const renderTermsModal = () => {
    return (
        showTerms && (
            <Popup
                open={showTerms}
                onClose={() => setShowTerms(false)}
                modal
                contentStyle={{ width: '80%', maxWidth: '600px', padding: '20px' ,overflowY: 'auto', maxHeight: '80vh'}}
            >
                <div className="terms-modal">
                    <h2 className="terms-title">సేవా నిబంధనలు</h2>

                    <p className="terms-content">
                        చివరిగా నవీకరించిన తేదీ: 21 ఆగస్టు 2026

MyVillage అనేది గ్రామ ప్రజలు, గ్రామ పంచాయతీ మరియు అధీకృత సభ్యుల మధ్య సమాచారాన్ని పంచుకోవడానికి, గ్రామ సమస్యలను నివేదించడానికి మరియు వాటి స్థితిని తెలుసుకోవడానికి రూపొందించిన డిజిటల్ ప్లాట్‌ఫారమ్.

MyVillage ఉపయోగించడం ద్వారా మీరు ఈ నిబంధనలను అంగీకరిస్తున్నట్లు భావించబడుతుంది.

1. MyVillage ఉపయోగించడం

MyVillage ద్వారా మీరు:

గ్రామ చర్చలను చూడవచ్చు మరియు సృష్టించవచ్చు.
ఇతరుల చర్చలను Like చేయవచ్చు.
గ్రామ సమస్యలను నివేదించవచ్చు.
మీ సమస్యల స్థితిని చూడవచ్చు.
గ్రామ పంచాయతీకి సంబంధించిన సమాచారాన్ని చూడవచ్చు.
అధికారిక గ్రామ సమాచారం మరియు అప్డేట్లను చూడవచ్చు.
మీ ప్రొఫైల్‌ను నిర్వహించవచ్చు.
2. ఖాతా బాధ్యత

మీ ఖాతాలో నమోదు చేసే సమాచారం సరైనదిగా మరియు తాజాదిగా ఉండేలా చూసుకోవాలి.

మీ:

పేరు
ఫోన్ నంబర్
ఇమెయిల్
ఇతర ఖాతా వివరాలు

తప్పుగా లేదా మోసపూరితంగా ఉపయోగించకూడదు.

మీ ఖాతా ద్వారా జరిగే కార్యకలాపాలకు మీరు బాధ్యత వహిస్తారు.

3. చర్చలు మరియు వినియోగదారు కంటెంట్

వినియోగదారులు చర్చలు, టెక్స్ట్ మరియు చిత్రాలను పోస్ట్ చేయవచ్చు.

మీరు పోస్ట్ చేసే కంటెంట్:

ఇతరులను బెదిరించకూడదు.
అవమానకరమైన లేదా ద్వేషపూరిత కంటెంట్ కలిగి ఉండకూడదు.
చట్టవిరుద్ధమైన కార్యకలాపాలను ప్రోత్సహించకూడదు.
ఇతరుల వ్యక్తిగత సమాచారాన్ని అనుమతి లేకుండా పంచకూడదు.
తప్పుడు సమాచారాన్ని ఉద్దేశపూర్వకంగా వ్యాప్తి చేయకూడదు.
ఇతరుల కాపీరైట్ లేదా మేధో సంపత్తి హక్కులను ఉల్లంఘించకూడదు.

MyVillage కమ్యూనిటీకి హానికరమైన లేదా నిబంధనలను ఉల్లంఘించే కంటెంట్‌ను తొలగించే హక్కును కలిగి ఉంటుంది.

4. సమస్యల నివేదికలు

వినియోగదారులు గ్రామంలోని సమస్యలను నివేదించవచ్చు.

ఉదాహరణకు:

రోడ్డు సమస్యలు
వీధి దీపాల సమస్యలు
నీటి సమస్యలు
చెత్త
డ్రైనేజీ
ఇతర ప్రజా సదుపాయాల సమస్యలు

Issue status ను MyVillage లేదా అధీకృత పంచాయతీ సభ్యులు నిర్వహించవచ్చు.

OPEN, IN PROGRESS, RESOLVED వంటి status లు సంబంధిత అధికారుల చర్యల ఆధారంగా మారవచ్చు.

MyVillage సమస్య పరిష్కారం జరుగుతుందని హామీ ఇవ్వదు.

5. అధీకృత వినియోగదారులు

గ్రామ పంచాయతీ అధ్యక్షుడు, ఉపాధ్యక్షుడు లేదా ఇతర అధీకృత సభ్యులకు సాధారణ నివాసితుల కంటే అదనపు permissions ఉండవచ్చు.

ఉదాహరణకు:

Issues నిర్వహించడం
Issue status మార్చడం
Issues ను resolved గా గుర్తించడం
అధికారిక గ్రామ అప్డేట్లు ప్రచురించడం

Permissions వినియోగదారు role ఆధారంగా నిర్ణయించబడతాయి.

6. నిషేధిత ఉపయోగం

MyVillage ను ఉపయోగించి:

ఇతరుల ఖాతాలను హ్యాక్ చేయడం
తప్పుడు గుర్తింపుతో ఖాతా సృష్టించడం
వ్యవస్థను దుర్వినియోగం చేయడం
స్పామ్ పంపడం
హానికరమైన software పంపడం
అనధికారికంగా డేటాను సేకరించడం
సేవకు అంతరాయం కలిగించడం

చేయకూడదు.

7. సేవలో మార్పులు

MyVillage లో features, functionality లేదా design ను ఎప్పుడైనా మార్చవచ్చు లేదా మెరుగుపరచవచ్చు.

కొన్ని features తాత్కాలికంగా అందుబాటులో లేకపోవచ్చు.

8. బాధ్యత పరిమితి

MyVillage లో వినియోగదారులు లేదా ఇతర వ్యక్తులు పోస్ట్ చేసిన సమాచారం తప్పనిసరిగా MyVillage అభిప్రాయాన్ని ప్రతిబింబించదు.

పంచాయతీ, ప్రభుత్వ పథకాలు, మార్కెట్ సమాచారం లేదా ఇతర third-party information ను ఉపయోగించే ముందు సంబంధిత అధికారిక వనరుల ద్వారా ధృవీకరించుకోవాలి.

9. ఖాతా నిలిపివేత

ఈ నిబంధనలను ఉల్లంఘించిన ఖాతాలను పరిమితం చేయడం, suspend చేయడం లేదా తొలగించడం MyVillage కు హక్కు ఉంటుంది.

10. సంప్రదింపు

MyVillage కు సంబంధించిన ప్రశ్నలు లేదా ఫిర్యాదుల కోసం:

Email: [yaswanthr233@gmail.com]

Village: Dondapadu Village
                    </p>

                    <button
                        className="terms-close-button"
                        onClick={() => setShowTerms(false)}
                    >
                        I Agree Terms of Service
                    </button>
                </div>
            </Popup>
        )
    );
};
const renderPrivacyPolicyModal = () => {
    return (
        showPrivacyPolicy && (
            <Popup
                open={showPrivacyPolicy}
                onClose={() => setShowPrivacyPolicy(false)}
                modal
                contentStyle={{ width: '80%', maxWidth: '600px', padding: '20px' ,overflowY: 'auto', maxHeight: '80vh'}}
            >
                <div className="terms-modal">
                    <h2 className="terms-title">గోప్యతా విధానం</h2>

                    <p className="terms-content">
                        Privacy Policy

చివరిగా నవీకరించిన తేదీ: 21 ఆగస్టు 2026

MyVillage మీ వ్యక్తిగత సమాచారాన్ని బాధ్యతాయుతంగా నిర్వహించడానికి ప్రయత్నిస్తుంది.

భారతదేశంలో డిజిటల్ వ్యక్తిగత డేటా రక్షణకు సంబంధించిన ప్రధాన చట్టపరమైన framework గా Digital Personal Data Protection Act, 2023 ఉంది.

1. మేము సేకరించే సమాచారం

MyVillage ఉపయోగించినప్పుడు మేము అవసరమైన సమాచారాన్ని సేకరించవచ్చు:

Account Information
పేరు
ఇమెయిల్
ఫోన్ నంబర్
Password (securely hashed form)
Village
User ID
Role
Profile Information
Profile picture
Profile details
User Content

మీరు స్వయంగా అందించే:

Discussions
Discussion images
Issue reports
Issue descriptions
Issue locations
Issue images
Likes మరియు సంబంధిత activity
2. మీ సమాచారాన్ని ఎందుకు ఉపయోగిస్తాము?

మీ సమాచారాన్ని ప్రధానంగా:

మీ ఖాతాను నిర్వహించడానికి
Login మరియు authentication కోసం
మీ profile చూపించడానికి
Discussions చూపించడానికి
Issues నిర్వహించడానికి
Issue status ను track చేయడానికి
Role-based permissions అమలు చేయడానికి
గ్రామ సంబంధిత సేవలను అందించడానికి
భద్రతను నిర్వహించడానికి
దుర్వినియోగాన్ని గుర్తించడానికి

ఉపయోగిస్తాము.

DPDP framework ప్రకారం personal-data processing కు purpose మరియు notice స్పష్టంగా ఉండటం ముఖ్యమైన అంశాలు.

3. మీ Public Content

మీరు MyVillage లో Discussion లేదా Issue ను పోస్ట్ చేసినప్పుడు, ఆ content ఇతర సంబంధిత వినియోగదారులకు కనిపించవచ్చు.

ఉదాహరణకు, ఒక discussion లో:

Name
Title
Content
Image
Date

చూపించబడవచ్చు.

అందువల్ల మీరు పబ్లిక్‌గా కనిపించకూడదనుకునే వ్యక్తిగత సమాచారాన్ని Discussion లేదా Issueలో పోస్ట్ చేయకండి.

4. Password భద్రత

మీ password ను plain text రూపంలో నిల్వ చేయకుండా secure password hashing వంటి భద్రతా పద్ధతులను ఉపయోగించాలి.

మీ password ను ఇతరులతో పంచుకోకండి.

5. Authentication Information

Login కోసం MyVillage authentication token/session information ను ఉపయోగించవచ్చు.

ఇది మీ ఖాతాను authenticated గా ఉంచడానికి మరియు అనధికార ప్రాప్యతను నిరోధించడానికి ఉపయోగించబడుతుంది.

6. మీ డేటాను ఎవరితో పంచుకుంటాము?

మీ వ్యక్తిగత సమాచారాన్ని అనవసరంగా అమ్మడం లేదా పంచుకోవడం MyVillage యొక్క ఉద్దేశం కాదు.

అయితే సేవను అందించడానికి అవసరమైన సందర్భాల్లో:

Hosting providers
Database providers
Cloud storage providers
Authentication/service providers

వంటి service providers ను ఉపయోగించవచ్చు.

చట్టం ప్రకారం అవసరమైనప్పుడు సంబంధిత ప్రభుత్వ లేదా చట్టపరమైన అధికారులకు సమాచారం అందించవచ్చు.

7. Images

మీరు Discussion లేదా Issue లో image upload చేస్తే, ఆ image మీ post/issue కు సంబంధించిన content గా నిల్వ చేయబడవచ్చు మరియు మీరు ఆ content ను ఎవరితో share చేశారో దాని ఆధారంగా ఇతరులకు కనిపించవచ్చు.

కాబట్టి ఇతరుల వ్యక్తిగత లేదా సున్నితమైన చిత్రాలను వారి అనుమతి లేకుండా upload చేయకండి.

8. Data Security

MyVillage అనధికార access, loss, misuse లేదా alteration నుండి personal data ను రక్షించడానికి తగిన technical మరియు organizational security measures అమలు చేయడానికి ప్రయత్నిస్తుంది.

అయితే ఏ internet-based system అయినా 100% security guarantee చేయలేము.

9. మీ హక్కులు

వర్తించే data-protection law మరియు దాని అమలులోకి వచ్చిన provisions ప్రకారం, వ్యక్తులకు తమ personal data గురించి కొన్ని హక్కులు ఉండవచ్చు.

ఉదాహరణకు:

Personal data గురించి సమాచారం పొందడం
తప్పుగా ఉన్న సమాచారాన్ని సరిచేయమని కోరడం
వర్తించే సందర్భాల్లో consent ను withdraw చేయడం
Data processing కు సంబంధించిన grievance ను raise చేయడం
వర్తించే చట్టం ప్రకారం ఇతర హక్కులను వినియోగించడం

DPDP Rules 2025 ప్రకారం privacy notices స్పష్టంగా, standalone గా మరియు సులభంగా అర్థమయ్యే భాషలో ఉండేలా framework రూపొందించబడింది.

10. Data Retention

మీ account మరియు service అవసరాలకు అవసరమైనంతకాలం మాత్రమే personal data ను ఉంచడానికి MyVillage ప్రయత్నిస్తుంది.

చట్టపరమైన, భద్రతా లేదా dispute-resolution అవసరాల కోసం కొన్ని information ఎక్కువకాలం ఉంచాల్సి రావచ్చు.

11. Children's Privacy

MyVillage ను ఉపయోగించడానికి అవసరమైన వయస్సు మరియు parental/guardian requirements వర్తించే చట్టాల ప్రకారం నిర్ణయించబడతాయి.

పిల్లల personal data ను అవసరానికి మించి సేకరించకుండా ఉండటం మా లక్ష్యం.

12. Privacy Policy Updates

ఈ Privacy Policy ను అవసరమైనప్పుడు update చేయవచ్చు.

మార్పులు చేసినప్పుడు:

Last Updated తేదీని మార్చుతాము.

ముఖ్యమైన మార్పులు ఉంటే, అందుబాటులో ఉన్న తగిన communication method ద్వారా వినియోగదారులకు తెలియజేయవచ్చు.

13. Privacy Contact

Privacy లేదా personal-data సంబంధిత ప్రశ్నలు/ఫిర్యాదుల కోసం:

Email: [yaswanthr233@gmail.com]

App: MyVillage

Village: Dondapadu Village
                    </p>

                    <button
                        className="terms-close-button"
                        onClick={() => setShowPrivacyPolicy(false)}
                    >
                        I Agree Privacy Policy
                    </button>
                </div>
            </Popup>
        )
    );
}

    const renderLoginPage = () => {
        return (
            <div className="bg-container-register">
            <div className="logo-container">
                <img src="https://res.cloudinary.com/duokznlha/image/upload/v1785779485/ChatGPT_Image_Aug_3_2026_11_20_51_PM_us6g9t.png" className="logo" />
                <div>
                    <h1 className="logo-title">MyVillage</h1>
                    <p className="logo-subtitle">One Village, One Community</p>
                </div>
            </div>
            <div className="register-container">
                <h1 className="register-title">Create an Account</h1>
                <p className="register-subtitle">join the MyVillage and be part of the change</p>
            </div>
            <form className="register-form" onSubmit={onRegisterAccount}>
                <div className="input-container">
                    <FaRegUser size={20} />
                    <input type="text" placeholder="Full Name" className="login-input" value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})} />
                </div>
                <p className={`error-message ${errorMessage.name}`}>{!userDetails.name && 'Name is required'}</p>
                <div className="input-container">
                    <FiPhone size={20}/>
                    <input type="number" placeholder="Phone Number" className="login-input" value={userDetails.phoneNumber} maxLength={10} onChange={(e) => setUserDetails({...userDetails, phoneNumber: e.target.value})} />
                </div>
                <p className={`error-message ${errorMessage.phoneNumber}`}>{!userDetails.phoneNumber && 'Phone number is required'}</p>
                <div className="input-container">
                    <HiOutlineMail size={24} />
                    <input type="email" placeholder="Email address" className="login-input" value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} />
                    
                </div>
                <p className={`error-message ${isEmailExists ? 'show' : 'hide'}`}>
                    Email already exists
                </p>
                <p className={`error-message ${errorMessage.email}`}>{!userDetails.email && 'Email is required'}</p>
                <div className="input-container">
                    <IoMdLock size={24} />
                    <input type="password" placeholder="Password" className="login-input" value={userDetails.password} onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} />
                    
                </div>
                <p className={`error-message ${errorMessage.password}`}>{!userDetails.password && 'Password is required'}</p>
                <div className="input-container">
                    <IoMdLock size={24} />
                    <input type="text" placeholder="Village Name" className="login-input" value={userDetails.village} onChange={(e) => setUserDetails({...userDetails, village: e.target.value})} />
                </div>
                
                <p className={`error-message ${errorMessage.village}`}>{!userDetails.village && 'Village name is required'}</p>
                <div className="terms-container">
                    <input type="checkbox" className="terms-checkbox" onChange={(e) => setIsTermsAccepted(e.target.checked)} />
                    <span className="terms-text">I agree to the <button className="terms-link" onClick={() => setShowTerms(true)}>Terms of Service</button> and <button className="terms-link" onClick={() => setShowPrivacyPolicy(true)}>Privacy Policy</button></span>
                </div>
                {renderTermsModal()}
                {renderPrivacyPolicyModal()}
                <p className={`error-message ${!isTermsAccepted ? 'show' : 'hide'}`}>{!isTermsAccepted && 'You must accept the terms of service and privacy policy'}</p>
                <button type="submit" className="register-button">Create Account</button>
                <div className="or-container">
                    <div className="or-divider"/>
                    <span className="or-text">or continue with</span>
                    <div className="or-divider"/>
                </div>
                
            </form>
            <div className="social-login-container">
                    <button className="social-login-button">
                    <FaGoogle size={24} color="#4285F4" />
                    <span className="social-login-text">Continue with Google</span>
                    </button>
                </div>
                <div className="have-account-container">
                    <span className="have-account-text">Have an account? <button onClick={onNavigateToLogin} className="login-account-button">Login</button></span>
                </div>
        </div>
        )
    }
    const renderLoadingPage = () => {
        return (
            <div className="loading-container">
                <HashLoader color="#1bd233" size={15} />
            </div>
        )
    }
    return <>{isLoading ? renderLoadingPage() : renderLoginPage()}</>
}
export default Register