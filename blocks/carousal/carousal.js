import { h, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';
 

const html = htm.bind(h);

// Define the Header component
function Header({ title }) {
  return html`
    <header class="header">
  <div class="header__logo">
    <h1 class="header__title">MyApp</h1>
  </div>
  <nav class="header__nav">
    <ul class="header__menu">
      <li class="header__menu-item">
        <a href="/home" class="header__menu-link">Home</a>
      </li>
      <li class="header__menu-item">
        <a href="/about" class="header__menu-link">About</a>
      </li>
      <li class="header__menu-item">
        <a href="/services" class="header__menu-link">Services</a>
      </li>
      <li class="header__menu-item">
        <a href="/contact" class="header__menu-link">Contact</a>
      </li>
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
