import React from "react";

const Modal = ({ children, onClose }) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleBackdropClick}>
        <div className="bg-white rounded-lg shadow-lg p-5 w-1/3">
            <button className="absolute top-3 right-3 text-black" onClick={onClose}>Fechar</button>
            {children}
        </div>
    </div>
  );
};

export default Modal;
