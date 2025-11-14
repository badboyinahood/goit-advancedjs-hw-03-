// pixabay-api.js
const API_KEY = '53205336-e55107c6d88ae20d725e8d53c';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query.trim(),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}?${searchParams.toString()}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  });
}
