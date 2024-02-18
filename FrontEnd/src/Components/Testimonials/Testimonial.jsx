import PropTypes from 'prop-types';

const Testimonial = ({ name, prenom, description, date, rating }) => {
  const renderStars = () => {
    return Array.from({ length: rating }, (_, i) => <span key={i}>⭐</span>);
  };

  return (
    <div className="testimonial">
      <div className="testimonial-header">
        <h3>{name} {prenom}</h3>
        <div>{renderStars()}</div>
      </div>
      <p className="testimonial-description">{description}</p>
      <p className="testimonial-date">{date}</p>
    </div>
  );
};

Testimonial.propTypes = {
  name: PropTypes.string.isRequired,
  prenom: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default Testimonial;