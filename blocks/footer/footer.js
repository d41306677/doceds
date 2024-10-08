import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

   // Select the target element you want to replace
const targetElement = document.querySelector('.footer-wrapper');
 
// Create a new div element
const newDiv = document.createElement('div');
newDiv.className = 'default-content-wrapper';
 
// Create a new img element for the SVG
const newImage = document.createElement('img');
newImage.className ="logo"
newImage.src = 'https://www.devry.edu/content/dam/devry_edu/svg/graphics/outlined/devry-edu/headerlogos/large/Header-Logo-DeVryEdu-Large.svg';
newImage.alt = 'DeVry University Logo';
newImage.style.width = '240px'; // Adjust the width as per your needs
 
// Append the p and img elements to the div
newDiv.appendChild(newImage);
 
// Replace the old content with the new div
if (targetElement) {
    targetElement.appendChild(newDiv);
} 
}
