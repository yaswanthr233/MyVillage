import React from 'react';
const DiscussionsContext = React.createContext({
    discussions: [],
    isLoading: true,
    error: null
})
export default DiscussionsContext;