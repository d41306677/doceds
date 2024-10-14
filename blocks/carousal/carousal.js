import { h, render } from 'https://esm.sh/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
 
const html = htm.bind(h);
 
// Carousel Component
function Carousel({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);
 
    // Move to the next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };
 
    // Move to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
 
    return html`
        <div class="carousel">
            <button onClick=${prevSlide}>Previous</button>
            
            <div class="carousel-slide">
                <h2>${slides[currentIndex].title}</h2>
                <img src="${slides[currentIndex].image}" alt="${slides[currentIndex].title}" />
                <p>${slides[currentIndex].description}</p>
            </div>
 
            <button onClick=${nextSlide}>Next</button>
        </div>
    `;
}
 
// Helper function to simulate fetching dynamic carousel data (e.g., from a URL or API)
function getCarouselDataFromUrl() {
    return [
        { title: "Slide 1", image: "https://via.placeholder.com/400x200", description: "This is the first slide." },
        { title: "Slide 2", image: "https://via.placeholder.com/400x200", description: "This is the second slide." },
        { title: "Slide 3", image: "https://via.placeholder.com/400x200", description: "This is the third slide." },
    ];
}
 
// Exported async function to decorate a block
export default async function decorate(block) {
    // Fetch the dynamic slides data
    const slides = getCarouselDataFromUrl();
 
    // Create the carousel component with dynamic slides
    const app = html`<${Carousel} slides=${slides} />`;
 
    // Render the carousel component inside the provided block
    render(app, block);
}
