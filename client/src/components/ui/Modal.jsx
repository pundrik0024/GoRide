import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="fixed inset-0 bg-[#171717] bg-opacity-20 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className={`relative w-full ${sizeClasses[size]} bg-white rounded-xl border border-[#E6E6E1] z-10 flex flex-col max-h-[90vh]`}>
        <div className="flex items-center justify-between p-6 border-b border-[#E6E6E1]">
          <h2 className="text-xl font-bold text-[#171717]">{title}</h2>
          <button 
            onClick={onClose}
            className="text-[#6B6B67] hover:text-[#171717] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
