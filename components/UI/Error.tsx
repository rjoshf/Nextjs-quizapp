import styles from './Error.module.css'

const Error: React.FC<{ errorTitle: string, errorMessage: string }> = ({ errorTitle, errorMessage }) => {
    return (
        <div className={styles.errorContainer}>
            <h2>{errorTitle}</h2>
            <p>{errorMessage}</p>
        </div>
    )
}

export default Error;