import RestaurantDbSource from '../../data/restodb-source';
import { createItemResto } from '../templates/template-creator';

const exploreResto = {
  async render() {
    return `
      <div class="content" >
        <main id="mainContent" tabindex="0"></main>
        <h2 tabindex="0" class="content__heading">Explore Restaurant</h2>
        <div id="loading" class="loading"><i class="ri-loader-4-line"></i> Loading...</div> <!-- Elemen loading -->
        <div id="resto" class="resto" tabindex="1"></div>
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

    const loadingElement = document.getElementById('loading');
    const restoContainer = document.querySelector('#resto');

    loadingElement.style.display = 'block';

    try {
      const restaurants = await RestaurantDbSource.restaurantList();
      restaurants.forEach((restaurant) => {
        restoContainer.innerHTML += createItemResto(restaurant);
      });
    } catch (error) {
      console.error('Error fetching restaurant list:', error);
      restoContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    } finally {
      loadingElement.style.display = 'none';
    }
  },
};

export default exploreResto;
