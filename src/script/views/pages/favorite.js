import FavRestoIdb from '../../data/resto-idb';
import { createFavoriteResto } from '../templates/template-creator';

const favoriteResto = {
  async render() {
    return `
      <div class="content">
      <main id="mainContent" tabindex="0"></main>
        <h2 class="content__heading">Favorite Restaurant</h2>
        <div id="resto" class="fav-resto" tabindex="1">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const skipLink = document.querySelector('.skip-link');
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.getElementById(skipLink.getAttribute('href').slice(1));
      if (target) {
        target.focus();
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth',
        });
      }
    });
    const favoriteRestaurants = await FavRestoIdb.getAllResto();
    const restoContainer = document.querySelector('#resto');

    if (favoriteRestaurants.length === 0) {
      restoContainer.innerHTML = '<p>Tidak ada restoran favorit untuk ditampilkan</p>';
    } else {
      favoriteRestaurants.forEach((restaurant) => {
        restoContainer.innerHTML += createFavoriteResto(restaurant);
      });
    }
  },
};

export default favoriteResto;
