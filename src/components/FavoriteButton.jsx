import { FaRegStar, FaStar } from "react-icons/fa";
import { isFavorite, toggleFavorite } from "./lib/storage";
import { useState } from "react";

const FavoriteButton = ({ job, className, onButtonClick }) => {
    const [favorite, setFavorite] = useState(isFavorite(job.id));

    const onClick = () => {
        setFavorite(toggleFavorite(job.id));

        if (onButtonClick) {
            onButtonClick();
        }
    };

    const Icon = favorite ? FaStar : FaRegStar;

    return (
        <button onClick={onClick} className={className}>
            <Icon className="inline text-lg" color="gold" />
        </button>
    );
};
export default FavoriteButton;
