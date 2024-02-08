import { useRef, useEffect } from 'react';

import styles from './Modal.module.css'

const Backdrop: React.FC<{ children: React.ReactNode, onClose: () => void }> = ({ onClose, children }) => {
    return (
        <div className={styles.backdrop} onClick={onClose}>{children}</div>
    )
}

const Modal: React.FC<{ children: React.ReactNode, open: boolean, onClose: () => void }> = ({ open, children, onClose }) => {

    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open && dialog.current !== null) {
            dialog.current.showModal();
        } else if (dialog.current) {
            dialog.current.close();
        }
    }, [open]);

    return (
        <Backdrop onClose={onClose}>
            <dialog className={styles.modal} ref={dialog} onClose={onClose}>
                {open ? children : null}
            </dialog>
        </Backdrop>
    )
}

export default Modal;