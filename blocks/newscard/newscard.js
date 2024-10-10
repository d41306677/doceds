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
    newsFilterTitle.innerText = '2024 News Articles';

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
    const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011'];

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

    // Create the results section and add news cards
    const newsCardResults = document.createElement('div');
    newsCardResults.className = 'news-card-results';

    // Example news articles data
    const newsArticles = [
        {
            imgSrc: 'https://www.devry.edu/content/dam/devry_edu/newsroom/news-women-ai-440.jpg',
            title: 'Learning in an AI Era: Equipping Women for Success Amid Gender Disparities',
            description: 'Despite significant positive momentum over the past century, women across all business sectors continue to face several gender-based challenges, often preventing them from reaching their upmost potential and earnings in the modern workplace.',
            link: 'https://www.devry.edu/newsroom/news/2024/learning-in-an-ai-era-equipping-women-for-success-amid-gender-disparities.html'
        },
        {
            imgSrc: 'https://www.devry.edu/content/dam/devry_edu/newsroom/upskilling-mat-release-440.png',
            title: '3 Things to Know About Learning AI for Career Advancement',
            description: 'Artificial intelligence (AI) undeniably continues to shape the workplace. Companies across the globe are navigating how to integrate AI into their business operations and strategies - making it increasingly paramount for professionals to keep pace with these modern tech advancements.',
            link: 'https://www.devry.edu/newsroom/news/2024/3-things-to-know-about-learning-ai-for-career-advancement.html'
        },
        {
            imgSrc: 'https://www.devry.edu/content/dam/devry_edu/newsroom/newsroom-article-2-upskilling-2024-440x440.jpg',
            title: 'AI Skills Development: How Employers Can Lean in with the Right Training',
            description: 'The modern workplace and business landscape continues to face swift transformation with the increasing prominence of artificial intelligence (AI).',
            link: 'https://www.devry.edu/newsroom/news/2024/ai-skills-development-how-employers-can-lean-in-with-the-right-training.html'
        }
    ];

    // Create news cards
    newsArticles.forEach(article => {
        const newsCardContent = document.createElement('div');
        newsCardContent.className = 'news-filter-card-content';

        const newsCardImg = document.createElement('div');
        newsCardImg.className = 'news-filter-card-img';
        const responsiveImage = document.createElement('div');
        responsiveImage.className = 'responsive-image';
        const responsiveImageContainer = document.createElement('div');
        responsiveImageContainer.className = 'responsive-image-container';
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        const img = document.createElement('img');
        img.src = article.imgSrc;
        img.className = 'responsive-img';
        img.alt = '';

        imageContainer.appendChild(img);
        responsiveImageContainer.appendChild(imageContainer);
        responsiveImage.appendChild(responsiveImageContainer);
        newsCardImg.appendChild(responsiveImage);

        const newsCardTileText = document.createElement('div');
        newsCardTileText.className = 'news-filter-card-tile-text';
        const newsCardTitle = document.createElement('h6');
        newsCardTitle.innerText = article.title;
        const newsCardDescription = document.createElement('p');
        newsCardDescription.innerText = article.description;
        const newsCardLink = document.createElement('a');
        newsCardLink.className = 'news-filter-card-link';
        newsCardLink.href = article.link;
        newsCardLink.setAttribute('aria-label', article.title);
        newsCardLink.innerText = 'Read Story';

        newsCardTileText.appendChild(newsCardTitle);
        newsCardTileText.appendChild(newsCardDescription);
        newsCardTileText.appendChild(newsCardLink);
        newsCardContent.appendChild(newsCardImg);
        newsCardContent.appendChild(newsCardTileText);
        newsCardResults.appendChild(newsCardContent);
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
}
