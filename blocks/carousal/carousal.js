import { h, render } from 'https://esm.sh/preact';
import { useState, useEffect } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

// API URL (replace this with your actual API endpoint)
const MENU_API_URL = 'https://main--doceds--d41306677.aem.page/blocks/carousal/carousal.json';

// Define the Header component
function Header({ title }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu visibility

  // Fetch the menu from the API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(MENU_API_URL);
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menu');
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Render loading, error, or the menu
  if (loading) {
    return html`<div class="header__loading">Loading menu...</div>`;
  }

  if (error) {
    return html`<div class="header__error">${error}</div>`;
  }

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  // Toggle the submenu for a specific item
  const toggleSubmenu = (index) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].isOpen = !newMenuItems[index].isOpen; // Toggle the open state
    setMenuItems(newMenuItems);
  };

  return html`
    <header class="header">
      <div class="header__logo">
        <h1 class="header__title">${title}</h1>
      </div>
      <button class="header__hamburger" onClick=${toggleMobileMenu}>
        ☰ <!-- Hamburger icon -->
      </button>
      <nav class="header__nav">
        <ul class="header__menu ${isMobileMenuOpen ? 'active' : ''}">
          ${menuItems.map(
            (item, index) => html`
              <li class="header__menu-item ${item.isOpen ? 'open' : ''}">
                <a href="${item.url}" class="header__menu-link" onClick=${(e) => {
                  if (item.submenu) {
                    e.preventDefault(); // Prevent default link behavior if submenu is present
                    toggleSubmenu(index);
                  }
                }}>
                  ${item.label}
                </a>
                ${item.submenu
                  ? html`
                    <ul class="header__submenu">
                      ${item.submenu.map(
                        (subItem) => html`
                          <li class="header__submenu-item">
                            <a href="${subItem.url}" class="header__submenu-link">
                              ${subItem.label}
                            </a>
                          </li>
                        `
                      )}
                    </ul>
                  `
                  : null}
              </li>
            `
          )}
        </ul>
      </nav>
    </header>
  `;
}

// Export and bind to AEM block
export default async function decorate(block) {
  const app = html`<${Header} title="MyApp" />`;
  render(app, block);
}
