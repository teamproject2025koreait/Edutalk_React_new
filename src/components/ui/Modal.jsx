import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // 모달 열렸을 때 스크롤 방지
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // 모달 닫혔을 때 스크롤 허용
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 relative dark:bg-neutral-800 dark:text-white"
        onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 닫히지 않도록 방지
        ref={modalRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            aria-label="모달 닫기"
          >
            &times;
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
