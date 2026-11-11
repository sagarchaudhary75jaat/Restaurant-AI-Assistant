import { useState, useEffect } from 'react';
import {
  FaMagnifyingGlass,
  FaRobot,
  FaCircleInfo,
  FaCode,
  FaCopy,
  FaCheck,
  FaUtensils,
  FaLeaf,
} from 'react-icons/fa6';
import DishCard from './DishCard';
import { fetchLiveMenu } from '../../services/restaurantApi';
import dosaImg from '../../assets/images/masala-dosa.jpg';
import thaliImg from '../../assets/images/special-thali.jpg';
import biryaniImg from '../../assets/images/paneer-biryani.jpg';
import './Menu.css';

// Verified signature dishes seeded in backend PostgreSQL database (MenuDataInitializer.java)
const VERIFIED_SIGNATURE_DISHES = [
  {
    id: 1,
    name: 'Masala Dosa',
    description: 'Crisp golden crepe stuffed with spiced potato masala, served with aromatic sambar and freshly ground coconut chutney.',
    mealTime: 'BREAKFAST',
    category: 'South Indian',
    price: 120.0,
    vegetarian: true,
    famousDish: true,
    available: true,
    image: dosaImg,
  },
  {
    id: 2,
    name: 'Special Veg Thali',
    description: 'A royal lunch platter with Shahi Paneer, Dal Makhani, Jeera Rice, freshly baked breads, crunchy salad, and traditional dessert.',
    mealTime: 'LUNCH',
    category: 'Thali',
    price: 200.0,
    vegetarian: true,
    famousDish: true,
    available: true,
    image: thaliImg,
  },
  {
    id: 3,
    name: 'Special Paneer Biryani',
    description: 'Aromatic layered basmati rice infused with rich saffron spices, marinated paneer cubes, caramelized onions, and fresh mint.',
    mealTime: 'DINNER',
    category: 'Biryani',
    price: 220.0,
    vegetarian: true,
    famousDish: true,
    available: true,
    image: biryaniImg,
  },
];

export default function MenuSection({ onAskAi }) {
  const [activeMeal, setActiveMeal] = useState('ALL');
  const [vegOnly, setVegOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [liveDishes, setLiveDishes] = useState([]);
  const [isLiveApiAvailable, setIsLiveApiAvailable] = useState(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    async function loadMenu() {
      try {
        const result = await fetchLiveMenu();
        if (result.isAvailable && result.dishes.length > 0) {
          setIsLiveApiAvailable(true);
          setLiveDishes(result.dishes);
        } else {
          setIsLiveApiAvailable(false);
          setLiveDishes(VERIFIED_SIGNATURE_DISHES);
        }
      } catch {
        setIsLiveApiAvailable(false);
        setLiveDishes(VERIFIED_SIGNATURE_DISHES);
      }
    }

    loadMenu();
  }, []);

  // Filter logic
  const filteredDishes = liveDishes.filter((dish) => {
    // Meal time filter
    if (activeMeal !== 'ALL') {
      const dishMeal = (dish.mealTime || '').toUpperCase();
      if (dishMeal !== activeMeal) return false;
    }

    // Veg filter
    if (vegOnly && !dish.vegetarian) {
      return false;
    }

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = dish.name.toLowerCase().includes(term);
      const matchCategory = (dish.category || '').toLowerCase().includes(term);
      const matchDesc = (dish.description || '').toLowerCase().includes(term);
      if (!matchName && !matchCategory && !matchDesc) return false;
    }

    return true;
  });

  const getDishImage = (dish) => {
    if (dish.image) return dish.image;
    const nameLower = dish.name.toLowerCase();
    if (nameLower.includes('dosa')) return dosaImg;
    if (nameLower.includes('thali')) return thaliImg;
    if (nameLower.includes('biryani')) return biryaniImg;
    return null;
  };

  const handleCopyCode = () => {
    const code = `@GetMapping("/menu")\npublic ResponseEntity<List<Dish>> getMenu() {\n    return ResponseEntity.ok(restaurantService.getAllDishes());\n}`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="menu" className="section-padding menu-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Culinary Offerings</span>
          <h2 className="section-title">Explore Our Menu</h2>
          <p className="section-subtitle">
            From energizing morning dosas to regal lunch thalis and aromatic dinner biryanis,
            explore our authentic flavors or ask our AI assistant for live recommendations.
          </p>
        </div>

        {/* Backend Notice when REST endpoint is not yet created */}
        {!isLiveApiAvailable && (
          <div className="menu-backend-notice">
            <FaCircleInfo className="notice-icon" />
            <div style={{ flex: 1 }}>
              <div className="notice-title">
                Backend API Status: AI Chatbot Active (Direct Menu API Optional)
              </div>
              <p className="notice-text">
                Your Spring Boot backend currently operates the <strong>POST /api/restaurant/chat</strong> endpoint
                which has full real-time access to all 30 PostgreSQL dishes via LangChain4j tools.
                A direct REST menu listing endpoint (e.g. <code>GET /api/restaurant/menu</code>) is not yet registered.
                Below we showcase verified signature dishes. You can query any dish from our AI assistant!
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '10px', flexWrap: 'wrap' }}>
                <span
                  className="notice-action-btn"
                  onClick={() => setShowCodeSnippet(!showCodeSnippet)}
                >
                  <FaCode />
                  <span>
                    {showCodeSnippet
                      ? 'Hide recommended Spring Boot endpoint code'
                      : 'View recommended Spring Boot endpoint to enable full menu sync'}
                  </span>
                </span>
                <span
                  className="notice-action-btn"
                  onClick={() => onAskAi('What is on your menu?')}
                >
                  <FaRobot />
                  <span>Ask AI Assistant for Full Menu</span>
                </span>
              </div>

              {showCodeSnippet && (
                <div
                  style={{
                    backgroundColor: '#1E1714',
                    color: '#EBDDCF',
                    padding: '16px',
                    borderRadius: '8px',
                    marginTop: '12px',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    position: 'relative',
                  }}
                >
                  <button
                    onClick={handleCopyCode}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      color: '#FFFFFF',
                      background: 'rgba(255,255,255,0.15)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                    }}
                  >
                    {copiedCode ? <FaCheck /> : <FaCopy />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                  <div style={{ color: '#F59E0B', marginBottom: '6px' }}>
                    // Add this method to RestaurantChatController.java:
                  </div>
                  <code>
                    @GetMapping("/menu")
                    <br />
                    public ResponseEntity&lt;List&lt;Dish&gt;&gt; getMenu() &#123;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;return ResponseEntity.ok(restaurantService.getAllDishes());
                    <br />
                    &#125;
                  </code>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu Filter Controls */}
        <div className="menu-controls">
          {/* Meal Time Tabs */}
          <div className="meal-tabs">
            <button
              className={`meal-tab-btn ${activeMeal === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveMeal('ALL')}
            >
              All Dishes
            </button>
            <button
              className={`meal-tab-btn ${activeMeal === 'BREAKFAST' ? 'active' : ''}`}
              onClick={() => setActiveMeal('BREAKFAST')}
            >
              Breakfast
            </button>
            <button
              className={`meal-tab-btn ${activeMeal === 'LUNCH' ? 'active' : ''}`}
              onClick={() => setActiveMeal('LUNCH')}
            >
              Lunch
            </button>
            <button
              className={`meal-tab-btn ${activeMeal === 'DINNER' ? 'active' : ''}`}
              onClick={() => setActiveMeal('DINNER')}
            >
              Dinner
            </button>
          </div>

          {/* Search & Veg Only Toggle */}
          <div className="secondary-filters">
            <div className="menu-search-wrapper">
              <FaMagnifyingGlass className="menu-search-icon" />
              <input
                type="text"
                placeholder="Search dishes or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="menu-search-input"
              />
            </div>

            <button
              className={`veg-filter-toggle ${vegOnly ? 'active' : ''}`}
              onClick={() => setVegOnly(!vegOnly)}
            >
              <FaLeaf />
              <span>{vegOnly ? 'Vegetarian Only' : 'Show Vegetarian Only'}</span>
            </button>
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="dishes-grid">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id || dish.name}
                dish={dish}
                image={getDishImage(dish)}
                onAskAi={(name) => onAskAi(`What is the price of ${name}?`)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-menu-state">
            <FaUtensils />
            <h3>No dishes match your filter</h3>
            <p>Try searching for a different dish, or ask our AI assistant directly.</p>
            <button
              className="btn-primary"
              style={{ marginTop: '16px' }}
              onClick={() => {
                setActiveMeal('ALL');
                setVegOnly(false);
                setSearchTerm('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
