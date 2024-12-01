const style = `
  font-size: 18px;
  position: fixed;
  bottom: 16px;
  right: 16px;
  background-color: gray;
  border-radius: 12px;
  border: 0;
  width: 55px;
  height: 55px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like" style="${style}">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like" style="${style}">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export { createLikeButtonTemplate, createLikedButtonTemplate };
