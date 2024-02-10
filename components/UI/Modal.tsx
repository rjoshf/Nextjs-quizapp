import React, { useRef, MouseEvent } from 'react';
import styles from './Modal.module.css';

const Modal: React.FC<{ open: boolean; children: React.ReactNode; onClose: () => void }> = ({ open, children, onClose }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const handleDialogClick = (event: MouseEvent) => {
        event.stopPropagation(); // Prevent click from propagating to the backdrop
    };

    if (!open) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={handleDialogClick} ref={dialogRef}>
                {children}
            </div>
        </div>
    );
};

export default Modal;