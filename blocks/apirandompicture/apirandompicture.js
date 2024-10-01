import {
    createOptimizedPicture
} from '../../scripts/aem.js';

// export default async function picture(block) {
//     fetchDogImage(block);
// }

// const apiEndpoint = 'https://dog.ceo/api/breeds/image/random';
 
//         // Fetch random dog image from API
// async function fetchDogImage(block) {
// try {
// const response = awaitfetch(apiEndpoint);
// const data = await response.json(); // Parse the JSON response
// if (data.status === 'success') {
//     block.data // Pass the image URL to displayImage function
//                 } else {
//                     console.error('Error fetching image:', data.message);
//                 }
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         }
    

export default async function decorates(block) {
    fetchData(block);
}


async function fetchData(block) {
    const response = await fetch('https://dog.ceo/api/breeds/image/random').then(res => res.clone().json())
    await block.append(displayImage(response.message));
    console.log(response);
}

function displayImage(imageUrl) {
    const imageContainer = document.querySelector('.apirandompicture-container');
    const picture = document.createElement('picture');

    // Creating image sources
    const sourceWebP = document.createElement('source');
    sourceWebP.srcset = imageUrl;
    sourceWebP.type = 'image/webp';

    const sourceJpeg = document.createElement('source');
    sourceJpeg.srcset = imageUrl;
    sourceJpeg.type = 'image/jpeg';

    const img = document.createElement('img');
    img.src = imageUrl; // Default fallback
    img.alt = 'Random Dog';
    img.style.width = '300px';

    // Append sources and img to picture tag
    picture.appendChild(sourceWebP);
    picture.appendChild(sourceJpeg);
    picture.appendChild(img);

    // Append picture to the image container
    imageContainer.appendChild(picture);
}
