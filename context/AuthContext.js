import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

/**
 * Creates a context for managing user authentication state.
 * @type {React.Context<{user: null | {id: string, username: string, email: string}, token: null | string, setUser: function, setToken: function}>}
 */
export const AuthContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

/**
 * AuthProvider component that provides the authentication context to the application.
 * @param {Object} props - The props passed to the component.
 * @param {React.ReactNode} props.children - The children components to be wrapped with the provider.
 * @returns {JSX.Element|null} - The provider component or null if an error occurs during rendering.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    try {
           return (
            <AuthContext.Provider value={{ user, token, setUser, setToken }}>
                {children}
            </AuthContext.Provider>
        );
    } catch (error) {
        console.error("Error rendering AuthProvider component:", error);
        return null;
    }
};

/**
 * Custom hook to access the authentication context values.
 * @returns {object} - An object containing user, token, setUser, and setToken values from the context.
 */
export const useAuth = () => {
    try {
         return useContext(AuthContext);
    } catch (error) {
         console.error("Error using useAuth hook:", error);
         return {
             user: null,
             token: null,
             setUser: () => {},
             setToken: () => {},
         }
    }
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};