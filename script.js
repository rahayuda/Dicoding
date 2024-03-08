var articles = [
  {
    title: "Pemrograman Berbasis Web",
    content: "Kata Bandung berasal dari kata bendung atau bendungan karena terbendungnya sungai Citarum oleh lava Gunung Tangkuban Parahu yang lalu membentuk telaga. Legenda yang diceritakan oleh orang-orang tua di Bandung mengatakan bahwa nama Bandung diambil dari sebuah kendaraan air yang terdiri dari dua perahu yang diikat berdampingan yang disebut perahu bandung yang digunakan oleh Bupati Bandung, R.A. Wiranatakusumah II, untuk melayari Ci Tarum dalam mencari tempat kedudukan kabupaten yang baru untuk menggantikan ibu kota yang lama di Dayeuhkolot.",
    image: "assets/image/content.png",
    id: "web"
  },
  {
    title: "Pemrograman Berbasis Mobile",
    content: "Kata Bandung berasal dari kata bendung atau bendungan karena terbendungnya sungai Citarum oleh lava Gunung Tangkuban Parahu yang lalu membentuk telaga. Legenda yang diceritakan oleh orang-orang tua di Bandung mengatakan bahwa nama Bandung diambil dari sebuah kendaraan air yang terdiri dari dua perahu yang diikat berdampingan yang disebut perahu bandung yang digunakan oleh Bupati Bandung, R.A. Wiranatakusumah II, untuk melayari Ci Tarum dalam mencari tempat kedudukan kabupaten yang baru untuk menggantikan ibu kota yang lama di Dayeuhkolot.",
    image: "assets/image/content.png",
    id: "mobile"
  },
  {
    title: "Gudang Data",
    content: "Kata Bandung berasal dari kata bendung atau bendungan karena terbendungnya sungai Citarum oleh lava Gunung Tangkuban Parahu yang lalu membentuk telaga. Legenda yang diceritakan oleh orang-orang tua di Bandung mengatakan bahwa nama Bandung diambil dari sebuah kendaraan air yang terdiri dari dua perahu yang diikat berdampingan yang disebut perahu bandung yang digunakan oleh Bupati Bandung, R.A. Wiranatakusumah II, untuk melayari Ci Tarum dalam mencari tempat kedudukan kabupaten yang baru untuk menggantikan ibu kota yang lama di Dayeuhkolot.",
    image: "assets/image/content.png",
    id: "warehouse"
  },
];

var contentSection = document.getElementById("content");

articles.forEach(function(articleData) {
  var article = document.createElement("article");
  article.classList.add("card");
  article.id = articleData.id; 

  var title = document.createElement("h3");
  var titleIcon = document.createElement("i");
  titleIcon.classList.add("fas", "fa-th-list"); 
  title.appendChild(titleIcon);
  title.appendChild(document.createTextNode(" " + articleData.title)); 
  article.appendChild(title);

  var imageDiv = document.createElement("div");
  imageDiv.classList.add("img-artc");
  var image = document.createElement("img");
  image.src = articleData.image;
  image.alt = "geografis";
  image.classList.add("featured-image");
  imageDiv.appendChild(image);

  var textDiv = document.createElement("div");
  textDiv.classList.add("txt-artc");
  var text = document.createElement("p");
  text.textContent = articleData.content;
  textDiv.appendChild(text);

  article.appendChild(imageDiv);
  article.appendChild(textDiv);

  contentSection.appendChild(article);
});

var slideIndex = 0;
var slides = document.getElementsByClassName("slide");

function showSlides() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}

showSlides();
