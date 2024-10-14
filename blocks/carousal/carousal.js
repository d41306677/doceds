import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import htm from 'htm';

const html = htm.bind(h);

// API URL (replace this with your actual API endpoint)
const MENU_API_URL = 'https://example.com/api/menu';

// Define the Header component
function Header({ title }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return html`
    <header class="header">
      <div class="header__logo">
        <h1 class="header__title">${title}</h1>
      </div>
      <nav class="header__nav">
        <ul class="header__menu">
          ${menuItems.map(
            (item) => html`
              <li class="header__menu-item">
                <a href="${item.url}" class="header__menu-link">${item.label}</a>
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
