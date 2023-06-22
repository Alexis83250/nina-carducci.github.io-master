async function photosFilterss() {
  const response = await fetch("./assets/photosFilter.json");
  const photos = await response.json();
  return photos;
}

//Création d'une function qui genere les photos
async function genererPhotos(photo) {
  console.log(photo);
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

    //Ajout de articleElement dans sectionGallery

    sectionGallery.appendChild(divElement);

    //Ajout de nos balises au DOM
    divElement.appendChild(imageElement);
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
//console.log(carousel());
let firstSlide = 0;
async function genererCarousel() {
  const slides = await carousel();

  slides.forEach((element, index) => {
    console.log(element, index);
  });
}
//permet de generer les photos non filtrés par default
genererCarousel();
