import './DetailRestaurantInformation.scss';

class DetailRestaurantInformation extends HTMLElement {
  set detailRestaurantData(data) {
    this.render(data);
  }

  render(data) {
    const {
      name,
      description,
      city,
      address,
      pictureId,
      categories,
      menus,
      rating,
      customerReviews,
    } = data;

    this.innerHTML = `
      <section class="detail__overview">
        <section class="detail__overview-header">
          <figure>
            <img src="https://restaurant-api.dicoding.dev/images/small/${pictureId}" width="100%" alt=${city} />
          </figure>
          
          <div class="detail__overview-header-info">
            <h1>${name}</h1>
          </div>
        </section>
        
        <section class="detail__overview-body">
          <section class="detail__overview-body-info">
            <h2>Information</h2>
            <p>Rating: ${rating}</p>
            <p>Address: ${address}, ${city}</p>
          </section>
          
          <section class="detail__overview-body-description">
            <h2>Description</h2>
            <p>${description}</p>
          </section>
          
          <section class="detail__overview-body-categories">
            <h2>Categories</h2>
            <ul>
              ${categories.map((category) => `<li>${category.name}</li>`).join('')}
            </ul>
          </section>
          
          <section class="detail__overview-body-menus">
            <h2>Menus</h2>
            <div class="detail__overview-body-menus__container">
              <div class="detail__overview-body-menus__container-item">
                <h3>Foods</h2>
                <ul>
                  ${menus.foods.map((menu) => `<li>${menu.name}</li>`).join('')}
                </ul>
              </div>
              <div class="detail__overview-body-menus__container-item">
                <h3>Drinks</h2>
                <ul>
                  ${menus.drinks.map((menu) => `<li>${menu.name}</li>`).join('')}
                </ul>
              </div>
            </div>
          </section>
          
          <section class="detail__overview-body-reviews">
            <h2>Customer Reviews</h2>
            <div class="detail__overview-body-reviews__container">
              ${customerReviews.map((reviewData) => `<article>
          <h3>${reviewData.name}</h3>
          <date>${reviewData.date}</date>
          <p>${reviewData.review}</p>a
        </article>`).join('')}
            </div>
          </section>
          
          <section>
            <h2>Write a Review</h2>
            <form class="detail__overview-body-reviews__form">
              <div class="detail__overview-body-reviews__form-item">
                <label for="name">Name</label>
                <input type="text" name="name" placeholder="Name" class="input-name__review" />
              </div>
              
              <div class="detail__overview-body-reviews__form-item">
                <label for="review">Review</label>
                <textarea type="text" name="review" placeholder="Review" class="input-description__review"></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </section>
        </section>
       
      </section>
    `;
  }
}

customElements.define('detail-restaurant-information', DetailRestaurantInformation);
