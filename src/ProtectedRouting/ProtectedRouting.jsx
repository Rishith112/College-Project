import React from 'react';
import { Navigate } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const ProtectedRouting = ({ children }) => {
    const jwt = getCookie('jwt_token');
    if (!jwt) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRouting;
