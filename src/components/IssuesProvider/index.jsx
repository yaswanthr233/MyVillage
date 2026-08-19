import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import IssuesContext from '../contexts/IssuesContext';

const IssuesProvider = ({ children }) => {

    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getIssues = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const jwtToken = Cookies.get('jwt_token');
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }
            const userId = localStorage.getItem('userId');
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
            }
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/issues`,options
            );
            if (!response.ok) {
                throw new Error('Failed to fetch issues');
            }
            const data = await response.json();
            setIssues(data);

        } catch (error) {
            console.error('Error fetching issues:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getIssues();
    }, []);

    return (
        <IssuesContext.Provider
            value={{
                issues,
                isLoading,
                error,
                getIssues,
            }}
        >
            {children}
        </IssuesContext.Provider>
    );
};

export default IssuesProvider;