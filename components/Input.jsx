import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input component that renders a styled input element with a label.
 * @param {Object} props - The props passed to the component.
 * @param {string} props.label - The label text for the input.
 * @param {string} [props.type="text"] - The type of the input (text, password, email, etc.).
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {string} [props.error] - The error message to display below the input.
 * @returns {JSX.Element} - The input element with its label and potential error message.
 */
const Input = ({ label, type = "text", placeholder, value, onChange, error }) => {
    try {
        return (
            <div className="mb-4">
                <label htmlFor={`input-${label}`} className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                </label>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    id={`input-${label}`}
                    className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'focus:border-red-500' : ''}`}
                />
                 {error && (
                    <div className="text-red-500 text-sm mt-1" style={{ color: 'red' }}>
                        {error}
                    </div>
                )}
            </div>
        );
    } catch (e) {
        console.error("Error rendering Input component", e);
        return null;
    }
};


Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default Input;