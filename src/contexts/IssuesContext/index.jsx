import React from 'react';
import { createContext } from 'react';
const IssuesContext = React.createContext({
    issues: [],
    isLoading: false,
    error: null,
});

export default IssuesContext;