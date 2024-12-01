import './_components/DetailRestaurantInformation/DetailRestaurantInformation';
import '../../../_components/Skeleton/Skeleton';
import '../../../_components/StatusMessage/StatusMessage';
import UrlParser from '../../../routes/url-parser';
import { GET_DETAIL_RESTAURANT, POST_ADD_REVIEW } from '../../../services/restaurant.service';
import LikeButtonInitiator from '../../../utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../../../data/favorite-restaurant-idb';

const DetailRestaurant = {
  render() {
    return `
      <detail-restaurant-information class="detail"></detail-restaurant-information>
      <div class="error__container">
        
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  renderSkeleton(container) {
    container.innerHTML = '<skeleton-component height="100vh"></skeleton-component>';
  },

  renderError(container, errorContainer, error) {
    container.innerHTML = '';
    errorContainer.innerHTML = `
      <status-message style="display: block; height:100vh;" message="${error?.response?.data?.message || 'Something when wrong'}"></status-message>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detailContainer = document.querySelector('detail-restaurant-information');
    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    const errorContainer = document.querySelector('.error__container');

    try {
      this.renderSkeleton(detailContainer);

      const data = await GET_DETAIL_RESTAURANT(url.id);
      detailContainer.detailRestaurantData = data.data.restaurant;

      await LikeButtonInitiator.init({
        likeButtonContainer,
        favoriteRestaurant: FavoriteRestaurantIdb,
        data: data.data,
      });

      this.postReview();
    } catch (error) {
      likeButtonContainer.innerHTML = '';
      this.renderError(detailContainer, errorContainer, error);
    }
  },

  postReview() {
    const postReviewContainer = document.querySelector('.detail__overview-body-reviews__form');
    const nameInput = postReviewContainer.querySelector('.input-name__review');
    const reviewInput = postReviewContainer.querySelector('.input-description__review');

    postReviewContainer.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        const data = await POST_ADD_REVIEW({
          id: UrlParser.parseActiveUrlWithoutCombiner().id,
          name: nameInput.value,
          review: reviewInput.value,
        });

        const reviewContainer = document.querySelector('.detail__overview-body-reviews__container');
        reviewContainer.innerHTML = data.data.customerReviews.map((reviewData) => `<article>
          <h3>${reviewData.name}</h3>
          <date>${reviewData.date}</date>
          <p>${reviewData.review}</p>a
        </article>`).join('');
      } catch (error) {
        alert(error?.response?.data?.message || 'Something when wrong');
      }

      postReviewContainer.reset();
    });
  },
};

export default DetailRestaurant;
