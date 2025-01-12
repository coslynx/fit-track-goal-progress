import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component that renders a button element with customizable text, click handler, and style variants using Tailwind CSS.
 * @param {Object} props - The props passed to the component.
 * @param {string} props.text - The text to display on the button.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.type="button"] - The type of the button (button, submit, reset).
 * @param {boolean} [props.disabled=false] - If the button should be disabled.
 * @returns {JSX.Element} - The button element.
 */
const Button = ({ text, onClick, type = "button", disabled = false }) => {
    try {
        return (
            <button
                type={type}
                onClick={onClick}
                className={`rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={disabled}
            >
                {text}
            </button>
        );
    } catch (error) {
         console.error("Error rendering Button component:", error);
        // Returning null or a fallback UI to prevent complete failure, handle error gracefully
        return null;
    }
};


Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
};

export default Button;