import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// Media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.classList.contains('nav-drop'); // Use classList.contains for clarity
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
    sections.querySelectorAll('.nav-sections .nav-drop').forEach((section) => {
        section.setAttribute('aria-expanded', expanded);
        const submenu = section.querySelector('ul'); // Select the submenu directly
        if (submenu) {
            submenu.style.display = expanded ? 'block' : 'none'; // Use display property
        }
    });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');

  navSections.classList.toggle('active');  // Toggle active class to show/hide menu
  toggleAllNavSections(navSections, expanded || isDesktop.matches);

  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');

  // Enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
      drop.addEventListener('click', () => {
        const dropExpanded = drop.getAttribute('aria-expanded') === 'true';
        toggleAllNavSections(navSections);
        drop.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
        const submenu = drop.querySelector('.submenu');
        if (submenu) {
          submenu.style.display = dropExpanded ? 'none' : 'block';
        }
      });

      // Added handling for keyboard navigation
      drop.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.preventDefault(); // Prevent the default action (e.g., scrolling)
          drop.click(); // Simulate a click on the dropdown
        }
      });
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // Manage keyboard accessibility
  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * Loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // Decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          const submenu = navSection.querySelector('.submenu');
          if (submenu) {
            submenu.style.display = expanded ? 'none' : 'block';
          }
        }
      });
    });
  }

  // Hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  // Prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  // Select the target element you want to replace
  const targetElement = document.querySelector('.default-content-wrapper');

  // Create a new div element
  const newDiv = document.createElement('div');
  newDiv.className = 'default-content-wrapper';

  // Create a new img element for the SVG
  const newImage = document.createElement('img');
  newImage.className = "logo";
  newImage.src = 'https://www.devry.edu/content/dam/devry_edu/svg/graphics/outlined/devry-edu/headerlogos/large/Header-Logo-DeVryEdu-Large.svg';
  newImage.alt = 'DeVry University Logo';
  newImage.style.width = '240px'; // Adjust the width as per your needs

  // Append the img element to the div
  newDiv.appendChild(newImage);

  // Replace the old content with the new div
  if (targetElement) {
    targetElement.replaceWith(newDiv);
  }
}

// Add DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
  // Get all menu items that have submenus
  const menuItems = document.querySelectorAll('.menu-item[aria-expanded]');

  menuItems.forEach(item => {
    // Set aria-expanded to false on page load
    item.setAttribute('aria-expanded', 'false');

    // Hide the submenu
    const submenu = item.nextElementSibling;
    if (submenu && submenu.classList.contains('submenu')) {
      submenu.style.display = 'none';
    }
  });
});
