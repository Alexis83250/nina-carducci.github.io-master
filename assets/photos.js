const response = fetch("./assets/photosFilter.json").then((response) =>
  response.json()
);
const photos = response.json();

//Création d'une function qui genere les photos
function genererPhotos(photos) {
  //Création d'une boucle qui va prendre toutes les photos
  for (let i = 0; i < photos.length; i++) {
    // Création des balises
    const article = photos[i];

    const sectionGallery = document.querySelector(".gallery");

    const divElement = document.createElement("div");
    divElement.classList.add("gallery-item");

    const imageElement = document.createElement("img");
    imageElement.src = article.image;

    //Ajout de articleElement dans sectionGallery

    sectionGallery.appendChild(divElement);

    //Ajout de nos balises au DOM
    divElement.appendChild(imageElement);
  }
}
//permet de generer les photos non filtrés par default
genererPhotos(photos);

//FILTRES---------------------------------------

const reponseFilt = fetch("./assets/filtres.json");
const filters = reponseFilt.json();

function genererFilters(photos) {
  for (let i = 0; i < photos.length; i++) {
    // Création des balises
    const myFilter = photos[i];

    const sectionFilter = document.querySelector(".filter");

    const divEl = document.createElement("div");
    divEl.classList.add("filterChoice");
    divEl.dataset.id = [i];
    divEl.innerText = myFilter.name;

    sectionFilter.appendChild(divEl);
  }
}
//permet de generer les photos non filtrés par default
genererFilters(photos);
