import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {

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
  
  
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const hrtag = document.createElement('hr');
  hrtag.className="hrtag";
  block.textContent = '';
  block.append(hrtag)
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  block.append(newDiv);

  block.append(footer);
}
