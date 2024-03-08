var articles = [
  {
    title: "Website Programming",
    content: "Website programming is the process of creating and developing websites using programming languages and related technologies. It involves a series of steps, from designing the layout and design of the site to writing code, managing the database and testing its functionality. In website programming, programming languages such as HTML, CSS, and JavaScript are often used to create the appearance and interaction of websites. HTML (Hypertext Markup Language) is used to build the basic structure of a website, CSS (Cascading Style Sheets) is used to design the layout and visual style, while JavaScript is used to add interactivity and dynamic functionality. Additionally, website development often involves utilizing frameworks and libraries such as React, Angular, or Vue.js to speed up the development process and improve website performance. In website development, it is important to pay attention to aspects of security, performance and responsiveness of the website to various devices and platforms. This involves regular testing, maintenance, and adapting to changing technology and user needs. Website programming has an important role in facilitating online interactions, providing information, and building a digital presence for companies, organizations, and individuals. With advances in technology and the demand for better user experiences, website programming continues to grow and become an integral part of the modern information technology industry.",
    image: "assets/image/content-web.png",
    id: "web"
  },
  {
    title: "Mobile Programming",
    content: "Mobile programming involves the development of software applications specifically designed to run on mobile devices such as smartphones and tablets. This field of programming encompasses a wide range of technologies and platforms, including iOS for Apple devices and Android for devices from various manufacturers. In mobile programming, developers use programming languages such as Java, Kotlin, Swift, and Objective-C to create mobile applications. These applications can range from simple utilities and games to complex enterprise solutions and social networking platforms. Mobile programming also involves understanding the unique characteristics and constraints of mobile devices, such as limited processing power, memory, and screen size. Developers must optimize their applications to run efficiently on these devices while providing a smooth and responsive user experience. Additionally, mobile programming often involves integrating with various hardware components and sensors found in mobile devices, such as GPS, cameras, accelerometers, and gyroscopes. This allows developers to create innovative and interactive applications that leverage the full capabilities of modern smartphones and tablets. With the rapid growth of the mobile market and the increasing popularity of mobile devices, mobile programming has become an essential skill for developers looking to create cutting-edge applications and reach a wide audience of users.",
    image: "assets/image/content-mobile.png",
    id: "mobile"
  },
  {
    title: "Data Warehouse",
    content: "A data warehouse is a centralized repository that stores large volumes of structured and unstructured data collected from various sources within an organization. It is designed to support business intelligence (BI) and analytics activities by providing a unified and integrated view of data for analysis and reporting purposes. In a data warehouse, data is extracted from operational systems, transformed to ensure consistency and quality, and loaded into the warehouse for storage and analysis. This process, known as ETL (Extract, Transform, Load), helps to standardize and organize data in a format that is suitable for querying and analysis. Data warehouses are used by organizations to gain insights into their business operations, customer behavior, and market trends. By analyzing historical and real-time data stored in the warehouse, businesses can make informed decisions, identify opportunities for growth, and optimize their strategies. One of the key benefits of a data warehouse is its ability to provide a single source of truth for data analysis. By consolidating data from disparate sources into a centralized repository, organizations can eliminate data silos and ensure consistency and accuracy across different departments and functions. Data warehouses also support advanced analytics techniques such as data mining, predictive modeling, and machine learning. These techniques enable organizations to uncover hidden patterns, correlations, and insights in their data, helping them to make more accurate predictions and forecasts. Overall, a data warehouse plays a crucial role in enabling data-driven decision-making and empowering organizations to gain a competitive edge in today's data-driven business environment. By providing a comprehensive and reliable platform for data analysis, data warehouses help organizations unlock the full potential of their data and drive business success.",
    image: "assets/image/content-warehouse.png",
    id: "warehouse"
  },
];

var contentSection = document.getElementById("content");
var MAX_CONTENT_LENGTH = 500;

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
  image.alt = "course";
  image.classList.add("featured-image");
  imageDiv.appendChild(image);

  var textDiv = document.createElement("div");
  textDiv.classList.add("txt-artc");
  var text = document.createElement("p");

  // Memotong konten jika melebihi batasan jumlah karakter
  if (articleData.content.length > MAX_CONTENT_LENGTH) {
    text.textContent = articleData.content.substring(0, MAX_CONTENT_LENGTH) + '...';
  } else {
    text.textContent = articleData.content;
  }

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
