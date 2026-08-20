import React, { useEffect, useState } from 'react';
import IssuesContext from '../IssuesContext';
import Cookies from 'js-cookie';

const IssuesProvider = ({ children }) => {

    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchIssues = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const jwtToken = Cookies.get('jwt_token');

            if (!jwtToken) {
                setError('Authentication token not found');
                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/issues`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch issues: ${response.status}`);
            }

            const data = await response.json();

            console.log("Issues from API:", data);

            setIssues(data);

        } catch (error) {
            console.error("Error fetching issues:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <IssuesContext.Provider
            value={{
                issues,
                isLoading,
                error,
                fetchIssues
            }}
        >
            {children}
        </IssuesContext.Provider>
    );
};

export default IssuesProvider;