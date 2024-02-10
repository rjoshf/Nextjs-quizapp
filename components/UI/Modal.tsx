import React, { useRef, useEffect, MouseEvent } from 'react';
import styles from './Modal.module.css';

// Define the type for the component props
interface ModalProps {
    open: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, children, onClose }) => {
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