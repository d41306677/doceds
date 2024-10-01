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
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.clone().json())
    block.append(response.title);
    console.log(response);
}
