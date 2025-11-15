// src/js/render-functions.js

// Сбрасывает содержимое галереи
export function clearGallery(galleryEl) {
  if (galleryEl) galleryEl.innerHTML = '';
}

// Генерит разметку карточек из массива hits
export function createGalleryMarkup(items = []) {
  return items.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <ul class="card-stats">
          <li><span>Likes</span>${likes}</li>
          <li><span>Views</span>${views}</li>
          <li><span>Comments</span>${comments}</li>
          <li><span>Downloads</span>${downloads}</li>
        </ul>
      </li>`
  ).join('');
}

// Вставляет готовую строку разметки в галерею одной операцией
export function renderGallery(galleryEl, markup) {
  if (galleryEl && markup) {
    galleryEl.insertAdjacentHTML('beforeend', markup);
  }
}
