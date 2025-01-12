import React, { useId } from 'react';
import PropTypes from 'prop-types';

/**
 * Modal component that renders a modal overlay and a container to display content passed as children.
 * @param {Object} props - The props passed to the component.
 * @param {boolean} props.isOpen - If the modal should be open.
 * @param {function} props.onClose - The function to call when the modal should be closed.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @returns {JSX.Element|null} - The modal element or null if an error occurs during rendering.
 */
const Modal = ({ isOpen, onClose, children }) => {
    const modalId = useId();

    try {
        if (!isOpen) {
            return null;
        }

        return (
            <div
                id={`modal-${modalId}`}
                className="fixed z-10 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                         <div
                            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={onClose}
                        ></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        role="document"
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error rendering Modal component:", error);
        return null;
    }
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;