import styles from './DeleteConfirmation.module.css';

import { motion } from 'framer-motion';

export default function DeleteConfirmation({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {

    return (
        <div className={styles.deleteConfirmation}>
            <h2>Are you sure?</h2>
            <p>Do you really want to delete this quiz?</p>
            <div className={styles.confirmationActions}>
                <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} onClick={onCancel} className={styles.cancelButton}>
                    No Cancel
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} onClick={onConfirm} className={styles.confirmButton}>
                    Yes Delete
                </motion.button>
            </div>
        </div>
    );
}