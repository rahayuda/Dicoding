import './RestaurantItem.scss';

class RestaurantItem extends HTMLElement {
  set dataRestaurant(data) {
    this.render(data);
  }

  render(data) {
    const {
      id,
      name,
      description,
      pictureId,
      city,
      rating,
    } = data;

    this.innerHTML = `
      <article class="restaurant-item">
        <div class="restaurant-item__information">
          <span class="restaurant-item__rating">
            Rating: ${rating}
          </span>
          <img height="200px" class="restaurant-item__banner" src="https://restaurant-api.dicoding.dev/images/small/${pictureId}" alt="${name} ${city} restaurant image" />
        </div>
        <div class="restaurant-item__description">
          <a class="restaurant-item__link" href="/#/restaurants/${id}" aria-label="article ${name} ${city}">${name} - ${city}</a>
               
          <p class="restaurant-item__paragraf">${description}</p>
        </div>
      </article>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
