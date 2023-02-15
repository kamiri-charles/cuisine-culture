import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as starAlt } from '@fortawesome/free-regular-svg-icons';
import './styles.scss';

const Rating = (rating) => {
    let full_stars = Math.floor(rating.rating * 0.5);
    let half_stars = Math.floor((rating.rating * 0.5 - full_stars) * 2);

    return (
        <div className="rating">
            <div className="stars">
                {[...Array(full_stars)].map((star, i) => (
                    <FontAwesomeIcon icon={faStar} key={i} color='gold' />
                ))}

                {/* Half star */}
                {half_stars > 0 && <FontAwesomeIcon icon={faStarHalfAlt} color='gold' />}
                {/* Add remaining stars */}
                {[...Array(5 - full_stars - half_stars)].map((star, i) => (
                    <FontAwesomeIcon icon={starAlt} key={i} color='gold' />
                ))}
            </div>
        </div>
    )

}

export default Rating;