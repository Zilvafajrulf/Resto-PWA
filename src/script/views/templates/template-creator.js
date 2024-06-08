import CONFIG from '../../globals/config';

const createItemResto = (resto) => `
<div class="col" id="resto-item">
  <div class="card">
    <div class="card-img">
      <div class="city-label">
        <span class="city-label-text">
          Kota ${resto.city}
        </span>
      </div>
      <img src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}">
    </div>
    <div class="card-body">
      <div class="rating">
        <i class="fas fa-star"></i>
     
        <span class="rating-text">${resto.rating}</span>
      </div>
      <h3 class="card-title" id="resto-title">
        <a class="linkResto" href="./#/detail/${resto.id}" title="Link ke halaman detail makanan">${resto.name}</a>
      </h3>
      <p class="card-text">${resto.description}</p>
    </div>
  </div>
</div>
`;

const createFavoriteResto = (resto) => `
<div class="card">
<div class="card-img">
<img src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}">
  <div class="city-label">
    <span class="city-label-text">${resto.city}</span>
  </div>
</div>
<div class="card-body">
  <h3 class="card-title"><a href="#/detail/${resto.id}">${resto.name}</a></h3>
  <div class="rating">
    <i class="fas fa-star"></i>
    <span class="rating-text">${resto.rating}</span>
  </div>
  <p class="card-text">${resto.description}</p>
</div>
</div>
`;
export { createItemResto, createFavoriteResto };
