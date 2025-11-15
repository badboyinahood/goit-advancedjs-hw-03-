// src/main.js
import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup, renderGallery, clearGallery } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');

let lightbox = null;

function showLoader() { loader?.classList.remove('hidden'); }
function hideLoader() { loader?.classList.add('hidden'); }

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // ВАЖНО: input должен иметь name="query"
  const query = event.currentTarget.elements.query?.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  clearGallery(gallery);
  showLoader();

  try {
    const data = await fetchImages(query);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    const markup = createGalleryMarkup(data.hits);
    renderGallery(gallery, markup);

    // Реинициализируем/обновляем SimpleLightbox
    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }
  } catch (err) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(err);
  } finally {
    // form.reset();  // если хочешь сохранять введённый запрос — не сбрасывай форму
  }
});
