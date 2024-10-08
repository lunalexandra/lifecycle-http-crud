import classes from "./card.module.css";

interface CardProps {
    text: string;
    onDelete: () => void;
}

export const Card: React.FC<CardProps> = ({ text, onDelete }) => {
    return (
        <article className={classes.card}>
            <button type="button" className={classes["cross-btn"]} onClick={onDelete}>X</button>
            <p>{text}</p>
        </article>
    );
};
