// pixabay-api.js
const API_KEY = '53205336-e55107c6d88ae20d725e8d53c';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Pixabay request failed: ${res.status} ${res.statusText}`);
  }
  return await res.json(); 
}
