import axios from 'axios';

const API_KEY = '53205336-e55107c6d88ae20d725e8d53c';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const { data } = await axios.get(BASE_URL, { params });
  return data;
}
