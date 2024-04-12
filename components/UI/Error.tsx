import styles from './Error.module.css'

export default function Error({ errorTitle, errorMessage }: { errorTitle: string; errorMessage: string }) {
    return (
        <div className={styles.errorContainer}>
            <h2>{errorTitle}</h2>
            <p>{errorMessage}</p>
        </div>
    )
}
