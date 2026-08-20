import React,{useState,useEffect} from 'react';
import DiscussionsContext from '../DiscussionsContext';
import Cookies from 'js-cookie';

const DiscussionsProvider = ({children}) => {
    const [discussions, setDiscussions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDiscussions = async () => {
        try{
            setIsLoading(true);
            setError(null);

            const jwtToken = Cookies.get('jwt_token');

            if(!jwtToken){
                setError('Authentication token not found');
            }
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                }
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/discussions`, options);
            const data = await response.json();
            setDiscussions(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDiscussions();
    }, []);

    return (
        <DiscussionsContext.Provider value={{discussions, isLoading, error, fetchDiscussions}}>
            {children}
        </DiscussionsContext.Provider>
    )

}
export default DiscussionsProvider;