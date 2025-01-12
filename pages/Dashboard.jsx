import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import GoalCard from '../components/GoalCard.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../hooks/useAuth.js';
import useFetch from '../hooks/useFetch.js';
/**
 * Dashboard component that serves as the main dashboard for the application.
 * It displays a user's overall progress and a list of their current fitness goals.
 * @returns {JSX.Element|null} - The dashboard element or null in case of error.
 */
const Dashboard = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [goals, setGoals] = useState([]);
    const { fetchData, loading, error } = useFetch();
    try {
        useEffect(() => {
            if (!user) {
                navigate('/');
                return;
            }
            const fetchGoals = async () => {
                try {
                    const data = await fetchData('/api/goals', 'GET', null, token);
                    if (data) {
                        setGoals(data);
                    }
                } catch (fetchError) {
                    console.error('Error fetching goals:', fetchError);
                }
            };
            fetchGoals();
        }, [user, navigate, fetchData, token]);
        const handleEditGoal = (goalId) => {
            navigate(`/goals?edit=${goalId}`);
        };
        const handleDeleteGoal = async (goalId) => {
            try {
                await fetchData(`/api/goals/${goalId}`, 'DELETE', null, token);
                const data = await fetchData('/api/goals', 'GET', null, token);
                if (data) {
                    setGoals(data);
                }
            } catch (deleteError) {
                console.error('Error deleting goal:', deleteError);
            }
        };
         if (!user) {
            return null;
        }
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-semibold mb-6">Your Dashboard</h1>
                {loading && <p>Loading goals...</p>}
                {error && <p className="text-red-500 mb-4">Error: {error.message || 'Failed to load goals. Please try again.'}</p>}
                {goals && goals.length > 0 ? (
                     <div className="flex flex-col w-full max-w-2xl">
                        {goals.map((goal) => (
                            <GoalCard
                                key={goal._id}
                                goal={{
                                    id: goal._id,
                                    description: goal.description,
                                    target: goal.target,
                                    progress: goal.progress,
                                }}
                                onEdit={handleEditGoal}
                                onDelete={handleDeleteGoal}
                            />
                        ))}
                     </div>
                ) : !loading && !error && (
                    <p className="text-gray-600 mb-4">No goals set yet. Start by adding one!</p>
                )}
                 <Button text="Add Goal" onClick={() => navigate('/goals')} />
            </div>
        );
    } catch (error) {
        console.error('Error rendering Dashboard component:', error);
        return null;
    }
};
Dashboard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
    }),
    token: PropTypes.string,
};
export default Dashboard;