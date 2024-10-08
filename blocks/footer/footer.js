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

  // Loop through the fragment children
  while (fragment.firstElementChild) {
    const child = fragment.firstElementChild;

    // Check if the child is a <p> or <ul> element
    if (child.tagName === 'P' || child.tagName === 'UL') {
      // Create a new wrapper <div> with the class 'degree-program-block'
      const wrapper = document.createElement('div');
      wrapper.classList.add('degree-program-block');

      // Append the <p> or <ul> to the wrapper
      wrapper.append(child);
      
      // Append the wrapper to the footer
      footer.append(wrapper);
    } else {
      // If it's not <p> or <ul>, just append it to the footer
      footer.append(child);
    }
  }

  block.append(footer);
}
