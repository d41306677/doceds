import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
    // Load footer as fragment
    const footerMeta = getMetadata('footer');
    const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
    const fragment = await loadFragment(footerPath);

    // Clear the block
    block.textContent = '';
    const footer = document.createElement('div');
    footer.classList.add('footer-container'); // Added class for future styling

    // Initialize a temporary container for wrapping
    let wrapper = null;

    // Loop through the fragment children
    while (fragment.firstElementChild) {
        const child = fragment.firstElementChild;

        // Check if the child is a <p> or <ul> element
        if (child.tagName === 'P' || child.tagName === 'UL') {
            // If we're at the start of a new block, create a new wrapper
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.classList.add('degree-program-block'); // Assign class here
            }

            // Append the <p> or <ul> to the wrapper
            wrapper.append(child);
        }

        // If we encounter an element that's neither <p> nor <ul>, it indicates the end of a block
        if (child.tagName !== 'P' && child.tagName !== 'UL' && wrapper) {
            // Append the wrapped block to the footer
            footer.append(wrapper);
            wrapper = null; // Reset wrapper for the next block
            footer.append(child); // Append the current child if not <p> or <ul>
        }
    }

    // If there's an unappended wrapper at the end, append it
    if (wrapper) {
        footer.append(wrapper);
    }

    // Append the footer to the block
    block.append(footer);
}
