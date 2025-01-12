import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../components/Button.jsx';
import { useAuth } from '../hooks/useAuth.js';

/**
 * Home component that serves as the landing page for the application.
 * It checks if a user is authenticated, and if so, redirects to the dashboard.
 * If not, it displays a welcome message and login/register buttons.
 * @returns {JSX.Element|null} - The home page element or null in case of error.
 */
const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();


    try {
        // Check if a user is authenticated. If so, redirect to the dashboard
        if (user) {
            navigate('/dashboard');
            return null; // Return null to prevent further rendering.
        }


        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-3xl font-semibold mb-6">Welcome to Fitness Tracker</h1>
                <div className="flex space-x-4">
                    <Button
                        text="Login"
                        onClick={() => navigate('/login')}
                    />
                    <Button
                        text="Register"
                        onClick={() => navigate('/register')}
                    />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error rendering Home component:", error);
        return null;
    }
};

Home.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
    }),
};

export default Home;