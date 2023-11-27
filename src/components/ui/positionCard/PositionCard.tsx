import { FC } from 'react';
import styles from "./PositionCard.module.scss";
import cn from "classnames";

interface PositionCardProps {
    id: number;
    title: string;
    price: string;
    description: string;
    isSelected: boolean;
    handleCardSelect: (id: number) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

const PositionCard: FC<PositionCardProps> = ({ id, title, price, description, isSelected, handleCardSelect, onDragStart }) => {

    return (
        <div className={cn(styles.card, {
            [styles.active]: isSelected === true
        })}
            draggable="true"
            onDragStart={onDragStart}
            onClick={() => handleCardSelect(id)}
        >
            <div className={styles.card__info}>
                <h3 className={styles.card__position}>
                    {title}
                </h3>
                <p className={styles.card__description}>
                    {description}
                </p>
            </div>
            <div className={styles.card__details}>
                <span className={styles.card__price}>
                    ${price}
                </span>
                <span className={styles.card__time}>
                    / час
                </span>
            </div>
        </div>
    )
}

export default PositionCard;