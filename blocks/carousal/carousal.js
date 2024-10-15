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

  // Carousel setup logic
  useEffect(() => {
    setupCarousel(); // Initialize the carousel when the menu is loaded
  }, [menuItems]);

  const setupCarousel = () => {
    const carouselNavSections = document.querySelector('.carousel-nav-sections'); // Adjust this selector if necessary

    if (carouselNavSections) {
      const navItems = carouselNavSections.querySelectorAll('.nav-item');
      
      navItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSlide = item.getAttribute('data-slide'); // Assuming you have data-slide attributes
          navigateToSlide(targetSlide);
        });
      });

      initializeCarouselSlides();
    } else {
      console.error('Carousel navigation sections not found.');
    }
  };

  const navigateToSlide = (slideIndex) => {
    const slides = document.querySelectorAll('.carousel-slide'); // Adjust selector as needed
    slides.forEach((slide, index) => {
      slide.style.display = (index == slideIndex) ? 'block' : 'none'; // Show the selected slide
    });
  };

  const initializeCarouselSlides = () => {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
      slides[0].style.display = 'block'; // Show the first slide
    }
  };

  // Mobile Menu Toggle
  const toggleMenu = () => {
    const menu = document.querySelector('.mobile-menu'); // Update the selector as needed
    if (menu) {
      menu.classList.toggle('open');
    }
  };

  // Add event listeners for mobile menu toggle
  useEffect(() => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button'); // Update selector if necessary
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', toggleMenu);
    }

    return () => {
      if (mobileMenuButton) {
        mobileMenuButton.removeEventListener('click', toggleMenu);
      }
    };
  }, []);

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
      <div class="carousel-nav-sections">
        <!-- Assuming you have navigation items for the carousel -->
        <ul class="nav-item">
          ${menuItems.map((item, index) => html`
            <li class="nav-item" data-slide="${index}">
              <a href="#" class="nav-link">${item.label}</a>
            </li>
          `)}
        </ul>
      </div>
      <div class="mobile-menu-button">Menu</div> <!-- Button for toggling mobile menu -->
      <div class="mobile-menu"> <!-- Mobile menu content -->
        <ul class="header__menu">
          ${menuItems.map(
            (item) => html`
              <li class="header__menu-item">
                <a href="${item.url}" class="header__menu-link">${item.label}</a>
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
      </div>
    </header>
  `;
}

// Export and bind to AEM block
export default async function decorate(block) {
  const app = html`<${Header} title="MyApp" />`;
  render(app, block);
}
