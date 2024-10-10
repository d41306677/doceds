export default async function createNewsFilter(block) {
    // Create the news filter wrapper div
    const newsFilter = document.createElement('div');
    newsFilter.className = 'news-filter';

    // Create hidden input elements
    const inputType = document.createElement('input');
    inputType.className = 'typee';
    inputType.type = 'hidden';
    inputType.name = 'newsType';
    inputType.value = 'press-releases';

    const inputTilesCount = document.createElement('input');
    inputTilesCount.className = 'tilesCount';
    inputTilesCount.type = 'hidden';
    inputTilesCount.name = 'tilescount';
    inputTilesCount.value = '3';

    const inputTotalResults = document.createElement('input');
    inputTotalResults.type = 'hidden';
    inputTotalResults.name = 'totalResults';
    inputTotalResults.value = '34';

    // Create the content wrapper
    const newsFilterContent = document.createElement('div');
    newsFilterContent.className = 'news-filter-content';

    // Add title
    const newsFilterTitle = document.createElement('div');
    newsFilterTitle.className = 'news-filter-title';
    newsFilterTitle.innerText = 'News Articles';

    // Add separator
    const newsFilterSeparator = document.createElement('div');
    newsFilterSeparator.className = 'news-filter-separator';

    // Add group title
    const newsFilterGroupTitle = document.createElement('p');
    newsFilterGroupTitle.className = 'news-filter-groupTitle';
    newsFilterGroupTitle.innerText = 'Select Year';

    // Create the filter container
    const newsFilterContainer = document.createElement('div');
    newsFilterContainer.className = 'news-filter-container';

    // Create select element for dropdown
    const yearSelect = document.createElement('select');
    yearSelect.className = 'news-filter-dropdown';
    yearSelect.name = 'year';

    // Array of years for dropdown options
    const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

    // Create dropdown options
    years.forEach((year) => {
        const option = document.createElement('option');
        option.value = year;
        option.innerText = year;
        yearSelect.appendChild(option);
    });

    // Create the view button
    const viewButton = document.createElement('button');
    viewButton.className = 'dvu_news_filter_btn';
    viewButton.innerText = 'View';
    viewButton.style.backgroundColor = '#007bff'; // Example color
    viewButton.style.color = '#fff';
    viewButton.style.border = 'none';
    viewButton.style.padding = '10px 15px';
    viewButton.style.cursor = 'pointer';
    viewButton.style.borderRadius = '4px';
    viewButton.style.marginLeft = '10px'; // Add space between dropdown and button

    // Append filter item container and button to newsFilterContainer
    newsFilterContainer.appendChild(yearSelect);
    newsFilterContainer.appendChild(viewButton);

    // Create the results section
    const newsCardResults = document.createElement('div');
    newsCardResults.className = 'news-card-results';

    // Fetch news articles data from the API
    let newsArticlesByYear = {};

    async function fetchNewsData() {
        try {
            const response = await fetch('https://main--doceds--d41306677.aem.page/blocks/newscard/newscardapi.json');
            const data = await response.json();

            // Group articles by year
            newsArticlesByYear = data.reduce((acc, article) => {
                const year = new Date(article.date).getFullYear().toString();
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push({
                    imgSrc: article.imgSrc,
                    title: article.title,
                    description: article.description,
                    link: article.link
                });
                return acc;
            }, {});

            // Render initial year's articles (default to 2024)
            renderNewsArticles('2024');
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    }

    // Function to render news articles for the selected year
    function renderNewsArticles(year) {
        newsCardResults.innerHTML = ''; // Clear previous results
        const articles = newsArticlesByYear[year] || [];
        articles.forEach(article => {
            const newsCardContent = document.createElement('div');
            newsCardContent.className = 'news-filter-card-content';

            const newsCardImg = document.createElement('div');
            newsCardImg.className = 'news-filter-card-img';
            const img = document.createElement('img');
            img.src = article.imgSrc;
            img.className = 'responsive-img';
            img.alt = '';

            const newsCardTileText = document.createElement('div');
            newsCardTileText.className = 'news-filter-card-tile-text';
            const newsCardTitle = document.createElement('h6');
            newsCardTitle.innerText = article.title;
            const newsCardDescription = document.createElement('p');
            newsCardDescription.innerText = article.description;
            const newsCardLink = document.createElement('a');
            newsCardLink.href = article.link;
            newsCardLink.innerText = 'Read Story';

            newsCardTileText.appendChild(newsCardTitle);
            newsCardTileText.appendChild(newsCardDescription);
            newsCardTileText.appendChild(newsCardLink);
            newsCardContent.appendChild(newsCardImg);
            newsCardContent.appendChild(newsCardTileText);
            newsCardResults.appendChild(newsCardContent);
        });
    }

    // Event listener to handle the year selection and render news articles
    viewButton.addEventListener('click', () => {
        const selectedYear = yearSelect.value;
        renderNewsArticles(selectedYear);
    });

    // Create show more link
    const showMore = document.createElement('div');
    showMore.className = 'news-filter-showmore';
    const showMoreLink = document.createElement('a');
    showMoreLink.tabIndex = 0;
    showMoreLink.className = 'show-more-link itemsnewsfiltercardShowmoreLink';

    const showMoreIcon = document.createElement('div');
    showMoreIcon.className = 'show-more-icon';
    showMoreIcon.innerHTML = '<i class="fa fa-plus-circle"></i>';

    const showMoreText = document.createElement('div');
    showMoreText.className = 'show-more';
    showMoreText.title = 'show more';
    showMoreText.innerText = 'Show more';

    showMoreLink.appendChild(showMoreIcon);
    showMoreLink.appendChild(showMoreText);
    showMore.appendChild(showMoreLink);

    // Append all components to newsFilterContent
    newsFilterContent.appendChild(newsFilterTitle);
    newsFilterContent.appendChild(newsFilterSeparator);
    newsFilterContent.appendChild(newsFilterGroupTitle);
    newsFilterContent.appendChild(newsFilterContainer);
    newsFilterContent.appendChild(newsCardResults);
    newsFilterContent.appendChild(showMore);

    // Append hidden inputs and content to newsFilter
    newsFilter.appendChild(inputType);
    newsFilter.appendChild(inputTilesCount);
    newsFilter.appendChild(inputTotalResults);
    newsFilter.appendChild(newsFilterContent);

    // Append the entire newsFilter to the block
    block.appendChild(newsFilter);

    // Fetch news data and initialize the articles display
    await fetchNewsData();
}
