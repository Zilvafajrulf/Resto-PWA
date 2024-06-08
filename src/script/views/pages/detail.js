import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restodb-source';
import CONFIG from '../../globals/config';
import FavRestoIdb from '../../data/resto-idb';

const detailResto = {
  async render() {
    return ` 
      <div id="restaurantDetailContainer">
        <main id="mainContent" tabindex="0"></main>
        <h2 tabindex="1">Detail Restaurant</h2>
        <div id="loading" class="loading" tabindex="2"><i class="ri-loader-4-line ri-spin"></i> Loading...</div>
        <div id="error" class="error"></div> 
        
        <div class="restaurant-info" tabindex="3"></div>
        <div class="menu">
          <div class="card-detail">
            <h3 tabindex="4">Menu Makanan</h3>
            <ul id="foodMenu" class="menu-list" tabindex="5"></ul>
          </div>
          <div class="card-detail">
            <h3 tabindex="6">Menu Minuman</h3>
            <ul id="drinkMenu" class="menu-list" tabindex="7"></ul>
          </div>
        </div>
        <div class="card-detail-rev">
          <h3 tabindex="8">Customer Reviews</h3>
          <ul id="customerReviews" class="review-list" tabindex="9"></ul>
          <form id="reviewForm" tabindex="10">
            <h3 tabindex="11">Add a Review</h3>
            <input type="text" class="formname" id="reviewName" name="name" placeholder="Your name" required tabindex="12">
            <textarea id="reviewText" name="review" placeholder="Your review" required tabindex="13"></textarea>
            <button type="submit" tabindex="14">Submit</button>
          </form>
        </div>
        <button id="likeButton" tabindex="15"><i class="fas fa-heart"></i></button>
        <button id="unlikeButton" style="display: none;" tabindex="16"><i class="fas fa-heart-broken"></i></button>
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
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    try {
      const restaurant = await RestaurantDbSource.restaurantDetail(url.id);
      loadingElement.style.display = 'none';
      console.log(restaurant);

      const restaurantInfo = `
        <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
        <h3>${restaurant.name}</h3>
        <p><strong>Alamat:</strong> ${restaurant.address}, ${restaurant.city}</p>
        <p><strong>Deskripsi:</strong> ${restaurant.description}</p>
      `;
      document.querySelector('.restaurant-info').innerHTML = restaurantInfo;

      const foodMenuElement = document.getElementById('foodMenu');
      restaurant.menus.foods.forEach((food) => {
        const li = document.createElement('li');
        li.textContent = food.name;
        foodMenuElement.appendChild(li);
      });

      const drinkMenuElement = document.getElementById('drinkMenu');
      restaurant.menus.drinks.forEach((drink) => {
        const li = document.createElement('li');
        li.textContent = drink.name;
        drinkMenuElement.appendChild(li);
      });

      const customerReviewsElement = document.getElementById('customerReviews');
      restaurant.customerReviews.forEach((review) => {
        const li = document.createElement('li');
        li.textContent = `${review.name}: ${review.review}`;
        customerReviewsElement.appendChild(li);
      });

      const likeButton = document.getElementById('likeButton');
      const unlikeButton = document.getElementById('unlikeButton');

      const isFavorite = await FavRestoIdb.getResto(restaurant.id);

      if (isFavorite) {
        likeButton.style.display = 'none';
        unlikeButton.style.display = 'block';
      } else {
        likeButton.style.display = 'block';
        unlikeButton.style.display = 'none';
      }

      likeButton.addEventListener('click', async () => {
        await FavRestoIdb.putResto(restaurant);
        likeButton.style.display = 'none';
        unlikeButton.style.display = 'block';
      });

      unlikeButton.addEventListener('click', async () => {
        await FavRestoIdb.deleteResto(restaurant.id);
        likeButton.style.display = 'block';
        unlikeButton.style.display = 'none';
      });

      const reviewForm = document.getElementById('reviewForm');
      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const reviewName = document.getElementById('reviewName').value;
        const reviewText = document.getElementById('reviewText').value;
        const review = {
          id: restaurant.id,
          name: reviewName,
          review: reviewText,
        };
        try {
          const response = await fetch(`${CONFIG.BASE_URL}/review`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: '112233',
            },
            body: JSON.stringify(review),
          });
          const responseData = await response.json();
          if (responseData.error === false) {
            const newReview = responseData.customerReviews.pop();
            const li = document.createElement('li');
            li.textContent = `${newReview.name}: ${newReview.review}`;
            customerReviewsElement.appendChild(li);
            reviewForm.reset();
          } else {
            console.error('Error adding review:', responseData.message);
          }
        } catch (error) {
          console.error('Error adding review:', error);
        }
      });
    } catch (error) {
      loadingElement.style.display = 'none';
      errorElement.style.display = 'block';
      errorElement.textContent = `Error: ${error.message}`;
    }
  },
};

export default detailResto;
