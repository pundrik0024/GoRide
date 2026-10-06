import React from 'react';
import Modal from '../ui/Modal';

export default function AdminModal({ isOpen, onClose, title, children, onSubmit, submitLabel = 'Save' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        {children}
        <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-[#E6E6E1]">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2 border border-[#E6E6E1] rounded-lg text-sm font-medium text-[#171717] hover:bg-[#F7F7F5]"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-6 py-2 bg-[#315C4B] text-white rounded-lg text-sm font-medium hover:bg-[#234F3E]"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
