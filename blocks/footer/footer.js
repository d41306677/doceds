import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
    // Load footer as fragment
    const footerMeta = getMetadata('footer');
    const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
    const fragment = await loadFragment(footerPath);

    // Decorate footer DOM
    block.textContent = '';
    const footer = document.createElement('div');
    while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

    // Wrap each <p> and <ul> in a new <div>
    const tabsPanel = block.querySelector('.tabs-panel > div');
    const elements = tabsPanel.children;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName === 'P') {
            const wrapperDiv = document.createElement('div');
            wrapperDiv.classList.add('degree-program-block'); // Add a class for styling if needed

            // Append <p> to the wrapper
            wrapperDiv.appendChild(elements[i]);
            // Append the corresponding <ul> to the wrapper if it exists
            if (elements[i + 1] && elements[i + 1].tagName === 'UL') {
                wrapperDiv.appendChild(elements[i + 1]);
                i++; // Skip to the next element to avoid re-processing the <ul>
            }

            // Append the wrapper to the tabsPanel
            tabsPanel.appendChild(wrapperDiv);
        }
    }

    // Append footer to the block
    block.append(footer);
}
