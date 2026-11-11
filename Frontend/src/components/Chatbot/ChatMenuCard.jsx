import { FaStar, FaUtensils } from 'react-icons/fa6';
import dosaImg from '../../assets/images/masala-dosa.jpg';
import thaliImg from '../../assets/images/special-thali.jpg';
import biryaniImg from '../../assets/images/paneer-biryani.jpg';

export default function ChatMenuCard({ dish }) {
  const { name, category, price, isVeg, isFamous, mealTime } = dish;

  // Match reliable images based on verified seeded menu items
  const getReliableImage = (dishName) => {
    if (!dishName) return null;
    const lower = dishName.toLowerCase();
    if (lower.includes('dosa')) return dosaImg;
    if (lower.includes('thali')) return thaliImg;
    if (lower.includes('biryani')) return biryaniImg;
    return null;
  };

  const imageSrc = getReliableImage(name);

  // Format price string with Indian Rupee symbol
  const formattedPrice = price
    ? (price.toString().startsWith('₹') ? price : `₹${price}`)
    : '₹--';

  return (
    <div className="chat-menu-card">
      {/* Visual Header / Image */}
      <div className="chat-menu-card-media">
        {imageSrc ? (
          <img src={imageSrc} alt={name} className="chat-menu-card-img" loading="lazy" />
        ) : (
          <div className="chat-menu-card-placeholder">
            <FaUtensils className="placeholder-icon" />
            <span className="placeholder-brand">Bob Special</span>
          </div>
        )}

        {/* Famous / Signature Dish Badge */}
        {isFamous && (
          <div className="chat-menu-famous-tag">
            <FaStar className="star-icon" />
            <span>Signature Dish</span>
          </div>
        )}

        {/* Meal Category Tag */}
        {mealTime && (
          <div className="chat-menu-meal-tag">{mealTime}</div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="chat-menu-card-body">
        <div className="chat-menu-title-row">
          <h4 className="chat-menu-dish-name">{name}</h4>
          {/* Authentic Indian Veg / Non-Veg Indicator */}
          <div
            className={`chat-dietary-badge ${isVeg ? 'veg' : 'nonveg'}`}
            title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          >
            <span className="dietary-circle"></span>
          </div>
        </div>

        {/* Category Pill */}
        {category && (
          <div className="chat-menu-cat-pill">
            <span>{category}</span>
          </div>
        )}

        {/* Price & Status */}
        <div className="chat-menu-card-footer">
          <div className="chat-menu-price-container">
            <span className="chat-menu-price-label">Price</span>
            <span className="chat-menu-price-value">{formattedPrice}</span>
          </div>
          <span className="chat-menu-order-note">Available</span>
        </div>
      </div>
    </div>
  );
}
