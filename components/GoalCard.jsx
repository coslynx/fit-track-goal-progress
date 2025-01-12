import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';

/**
 * GoalCard component that renders a card-like element displaying details of a fitness goal,
 * with edit and delete actions available.
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.goal - The goal object containing goal details.
 * @param {string} props.goal.id - The unique identifier of the goal.
 * @param {string} props.goal.description - The description of the goal.
 * @param {number} props.goal.target - The target value of the goal.
 * @param {number} props.goal.progress - The current progress towards the goal.
 * @param {function} props.onEdit - The function to call when the edit button is clicked.
 * @param {function} props.onDelete - The function to call when the delete button is clicked.
 * @returns {JSX.Element} - The goal card element or null in case of error.
 */
const GoalCard = ({ goal, onEdit, onDelete }) => {
    try {
        const progressPercentage = (goal.progress / goal.target) * 100;
        const clampedPercentage = Math.min(100, Math.max(0, progressPercentage));


        return (
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold mb-2">{goal.description}</h3>
                <p className="text-gray-600 mb-1">Target: {goal.target}</p>
                <p className="text-gray-600">Progress: {goal.progress}</p>
                <div className="bg-gray-200 rounded-full h-2 relative mb-2">
                    <div
                        className="bg-green-500 rounded-full h-2"
                         style={{ width: `${clampedPercentage}%`}}
                        aria-valuenow={clampedPercentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        title={`${clampedPercentage.toFixed(2)}%`}
                    >
                    </div>
                </div>

                <div className="flex justify-end mt-2">
                    <Button text="Edit" onClick={() => onEdit(goal.id)}  />
                    <Button text="Delete" onClick={() => onDelete(goal.id)}  />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error rendering GoalCard component:", error);
        return null;
    }
};

GoalCard.propTypes = {
    goal: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        target: PropTypes.number.isRequired,
        progress: PropTypes.number.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default GoalCard;