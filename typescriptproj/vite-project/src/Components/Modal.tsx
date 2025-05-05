
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  title: string;
}

const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '400px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
  } as const;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, children, title }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h3>{title}</h3>
        <form onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};



export default Modal;