// src/main.js
import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup, renderGallery, clearGallery } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');   
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader'); 

let lightbox = null;

function showLoader() { loader?.classList.remove('hidden'); }
function hideLoader() { loader?.classList.add('hidden'); }

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.currentTarget.elements.query?.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query', position: 'topRight' });
    return;
  }

  clearGallery(gallery);
  showLoader();

  try {
    const { hits } = await fetchImages(query);
    hideLoader();

    if (!hits || hits.length === 0) {
      iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!', position: 'topRight' });
      return;
    }

    renderGallery(gallery, createGalleryMarkup(hits));
    if (lightbox) lightbox.refresh();
    else {
      lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
    }
  } catch (err) {
    hideLoader();
    iziToast.error({ message: 'Something went wrong. Try again later.', position: 'topRight' });
    console.error(err);
  }
});
