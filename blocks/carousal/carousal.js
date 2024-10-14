function Header({ title }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuActive, setMenuActive] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setMenuActive(!menuActive); // Toggle menu visibility
  };

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
      <button class="header__hamburger" onClick=${toggleMenu}>
        ☰ <!-- Hamburger icon -->
      </button>
      <nav class="header__navigation">
        <ul class=${`header__menu ${menuActive ? 'active' : ''}`}>
          ${menuItems.map(
            (item) => html`
              <li class="header__menu-item">
                <a href="${item.url}" class="header__menu-link">${item.label}</a>
                ${item.submenu ? html`
                  <ul class="header__submenu">
                    ${item.submenu.map(
                      (subItem) => html`
                        <li class="header__submenu-item">
                          <a href="${subItem.url}" class="header__submenu-link">${subItem.label}</a>
                        </li>
                      `
                    )}
                  </ul>
                ` : ''}
              </li>
            `
          )}
        </ul>
      </nav>
    </header>
  `;
}
