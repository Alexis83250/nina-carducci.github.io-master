async function photosFilterss() {
  const response = await fetch("./assets/photosFilter.json");
  const photos = await response.json();
  return photos;
}

//Création d'une function qui genere les photos
async function genererPhotos(photo) {
  const photos = typeof photo === "undefined" ? await photosFilterss() : photo;
  //Création d'une boucle qui va prendre toutes les photos
  //console.log(photos.length);
  //console.log(photos);
  for (let i = 0; i < photos.length; i++) {
    // Création des balises

    const article = photos[i];

    const sectionGallery = document.querySelector(".gallery");

    const divElement = document.createElement("div");
    divElement.classList.add("gallery-item");

    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    imageElement.alt = article.alt;
    imageElement.id = article.id;

    //Ajout de articleElement dans sectionGallery

    sectionGallery.appendChild(divElement);

    //Ajout de nos balises au DOM
    divElement.appendChild(imageElement);

    //MODAL--------------------------------

    imageElement.addEventListener("click", () => {
      console.log(imageElement.id);
    });
    //MODAL--------------------------------
  }
}
//permet de generer les photos non filtrés par default
genererPhotos();

//FILTRES---------------------------------------

async function photosFilterIIIs() {
  const reponseFilt = await fetch("./assets/filtres.json");
  const filters = await reponseFilt.json();
  return filters;
}

async function genererFilters() {
  const filters = await photosFilterIIIs();
  //console.log(filters);

  for (let i = 0; i < filters.length; i++) {
    // Création des balises
    const myFilter = filters[i];

    const sectionFilter = document.querySelector(".filter");

    const divEl = document.createElement("div");
    divEl.classList.add("filterChoice");
    divEl.dataset.id = [i];
    divEl.innerText = myFilter.name;

    sectionFilter.appendChild(divEl);
  }
  selectionFilters();
}
//permet de generer les photos non filtrés par default
genererFilters();
async function selectionFilters() {
  const photos = await photosFilterss();
  Array.from(document.querySelectorAll(".filterChoice")).forEach((el) => {
    el.addEventListener("click", (event) => {
      const categoryId = event.target.dataset.id;
      //console.log("Category", categoryId);
      if (categoryId <= 0) {
        document.querySelector(".gallery").innerHTML = "";
        genererPhotos();
      } else {
        const photosFiltrees4 = photos.filter(function (photo) {
          return photo.categoryId == categoryId;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererPhotos(photosFiltrees4);
      }
    });
  });
}

async function carousel() {
  const responseCarousel = await fetch("./assets/carousel.json");
  const photosCarousel = await responseCarousel.json();
  return photosCarousel;
}

let firstSlide = 0;
const next = document.querySelector("#btn-d");
const prev = document.querySelector("#btn-g");

//console.log(carousel());

async function genererCarousel() {
  const slides = await carousel();

  slides.forEach((element, index) => {});

  const mySlides = slides[firstSlide];

  const sectionCarousel = document.querySelector(".carousel");

  const divElement = document.createElement("div");
  divElement.classList.add("carouselImage");

  const imageElement = document.createElement("img");
  imageElement.src = mySlides.image;
  imageElement.alt = mySlides.alt;
  imageElement.classList.add("carouselImg");

  //Ajout de articleElement dans sectionGallery
  sectionCarousel.appendChild(divElement);
  divElement.appendChild(imageElement);
  console.log(slides);
  //Ajout de nos balises au DOM
}
//permet de generer les photos non filtrés par default
genererCarousel();

const container = document.querySelector(".carouselImg");
// Photo suivante-----------------------

console.log(firstSlide);

next.addEventListener("click", () => {
  if (firstSlide >= 2) {
    firstSlide = 0;
    document.querySelector(".carouselImage").innerHTML = "";
    genererCarousel();
  } else {
    firstSlide = firstSlide + 1;
    document.querySelector(".carouselImage").innerHTML = "";
    genererCarousel();
  }
  console.log(firstSlide);
});

// Photo precedente-----------------------

prev.addEventListener("click", () => {
  if (firstSlide <= 0) {
    firstSlide = 2;
    document.querySelector(".carouselImage").innerHTML = "";
    genererCarousel();
  } else {
    firstSlide = firstSlide - 1;
    document.querySelector(".carouselImage").innerHTML = "";
    genererCarousel();
  }
  console.log(firstSlide);
});
