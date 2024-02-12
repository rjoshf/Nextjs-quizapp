import styles from './Card.module.css'

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <div className={`${styles.card} ${className}`}>
            {children}
        </div>
    )
}

export default Card;