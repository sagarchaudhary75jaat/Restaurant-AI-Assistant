import { FaStar, FaRobot, FaUtensils } from 'react-icons/fa6';

export default function DishCard({ dish, image, onAskAi }) {
  const isVeg = dish.vegetarian ?? true;
  const isAvailable = dish.available ?? true;
  const isFamous = dish.famousDish ?? false;

  // Format price
  const formattedPrice = dish.price
    ? `₹${Number(dish.price).toFixed(0)}`
    : 'Price upon request';

  return (
    <div className="dish-card" id={`dish-${dish.id || dish.name.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* Media area */}
      <div className="dish-card-media">
        {image ? (
          <img
            src={image}
            alt={dish.name}
            className="dish-card-image"
            loading="lazy"
          />
        ) : (
          <div className="dish-placeholder-media">
            <FaUtensils />
            <span className="dish-placeholder-text">Bob Restaurant Specialty</span>
          </div>
        )}

        <div className="card-top-badges">
          {isFamous ? (
            <span className="famous-badge">
              <FaStar /> Famous Dish
            </span>
          ) : <span />}

          {dish.mealTime && (
            <span className="mealtime-badge">{dish.mealTime}</span>
          )}
        </div>
      </div>

      {/* Body content */}
      <div className="dish-card-body">
        <div className="dish-header-row">
          <h3 className="dish-name">{dish.name}</h3>

          {/* Authentic Indian Veg/Non-Veg indicator */}
          <div
            className={`dietary-symbol ${isVeg ? 'veg' : 'nonveg'}`}
            title={isVeg ? 'Vegetarian Dish' : 'Non-Vegetarian Dish'}
          >
            <div className="inner-mark"></div>
          </div>
        </div>

        {dish.category && (
          <span className="dish-category-tag">{dish.category}</span>
        )}

        <p className="dish-description">
          {dish.description && dish.description.trim().length > 0
            ? dish.description
            : `Delicious and freshly prepared ${dish.name.toLowerCase()} at Bob Restaurant.`}
        </p>

        {/* Card Footer with Price, Availability & AI Query Button */}
        <div className="dish-card-footer">
          <div className="dish-price-block">
            <span className="dish-price-label">Price</span>
            <span className="dish-price-val">{formattedPrice}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className={`dish-availability-badge ${
                isAvailable ? 'available' : 'unavailable'
              }`}
            >
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>

            <button
              className="ask-dish-ai-btn"
              onClick={() => onAskAi(dish.name)}
              title={`Ask AI Assistant about ${dish.name}`}
            >
              <FaRobot />
              <span>Ask AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
