
// DynamicCarousel.js
import { h, render, Component  } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

class DynamicCarousel extends Component {
  state = {
    items: this.props.items || [],
  };

  render() {
    const { items } = this.state;

    if (items.length === 0) {
      return html`<div>Loading...</div>`;
    }

    return html`
      <div class="gallery_carousel_with_cards carousel">
        <div class="cmp-carousel desktopPaddingLeft" role="group" aria-live="polite">
          <div class="cmp-carousel__content" aria-atomic="false">
            ${items.map(
              (item, index) => html`
                <div
                  key=${item.id}
                  class="cmp-carousel__item ${index === 0 ? 'cmp-carousel__item--active' : ''}"
                  role="tabpanel"
                  aria-labelledby="business-item-${index + 1}-tab"
                  aria-roledescription="slide"
                  aria-label="Slide ${index + 1} of ${items.length}"
                >
                  <div class="gallery_articles teaser gallery-articles-variant-11" style="height: 722px;">
                    <div class="cmp-teaser gallery_container">
                      <div class="gallery-article-content">
                        <div class="gallery-article-img">
                          <div class="cmp-teaser__image">
                            <img
                              src=${item.imageUrl}
                              loading="lazy"
                              class="cmp-image__image"
                              width="346"
                              height="230"
                              alt=${item.imageAlt}
                            />
                          </div>
                        </div>
                        <div class="gallery-article-tile-text" style="height: 460px;">
                          <div class="gallery-article-pretitle">${item.author}</div>
                          <div class="gallery-article-tile">
                            <h6>${item.title}</h6>
                            <p>${item.description}</p>
                            <div class="gallery-article-headline-separator"></div>
                            <div class="gallery-article-headline-label">
                              <a class="read-post-link" href=${item.link} aria-label=${item.title}>
                                Learn more
                                <div class="gallery_articles_forward_icon"></div>
                              </a>
                              <a
                                class="read-post-link cmp-button cmp-without-icon"
                                href=${item.link}
                                aria-label=${item.title}
                              >
                                <span class="cmp-button__text">Learn more</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

// AEM Edge Delivery Service Block
export default async function decorate(block) {
  try {
    // Fetch data at the edge (use caching, handle errors)
    const response = await fetch('https://main--doceds--d41306677.aem.page/blocks/dynamiccarousel/dynamiccarousel.json');
    const data = await response.json();

    // Pass fetched items to the Preact component
    const app = html`<${DynamicCarousel} items=${data.items} />`;
    render(app, block);
  } catch (error) {
    // Handle fetch error
    const errorMessage = html`<div>Error: Failed to load carousel items.</div>`;
    render(errorMessage, block);
  }
}
