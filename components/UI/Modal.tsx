import React, { useRef, MouseEvent } from 'react';
import styles from './Modal.module.css';

import { motion } from 'framer-motion';

const Modal: React.FC<{ open: boolean; children: React.ReactNode; onClose: () => void }> = ({ open, children, onClose }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const handleDialogClick = (event: MouseEvent) => {
        event.stopPropagation(); // Prevent click from propagating to the backdrop
    };

    if (!open) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} initial="hidden" animate="visible" exit="hidden" className={styles.modal} onClick={handleDialogClick} ref={dialogRef}>
                {children}
            </motion.div>
        </div>
    );
};

export default Modal;