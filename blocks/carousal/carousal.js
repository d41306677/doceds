import { h, render } from '../../../scripts/preact.module.js';
import {htm} from '../../../scripts/htm.module.js';
  
const html = htm.bind(h);

// Carousel component definition
function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return html`
    <div class="carousel-container">
      <button class="carousel-button prev" onClick=${prevSlide}>
        &#10094;
      </button>
      <div class="carousel-slide">
        <img src=${images[currentIndex]} alt="Slide ${currentIndex + 1}" />
      </div>
      <button class="carousel-button next" onClick=${nextSlide}>
        &#10095;
      </button>
    </div>
  `;
}

// Export the default `decorate` function which AEM will call
export default async function decorate(block) {
  // Define the image array (could be dynamic)
  const images = [
    'https://via.placeholder.com/600x300?text=Slide+1',
    'https://via.placeholder.com/600x300?text=Slide+2',
    'https://via.placeholder.com/600x300?text=Slide+3',
  ];

  // Render the Carousel component
  const app = html`<${Carousel} images=${images} />`;
  render(app, block);
}
