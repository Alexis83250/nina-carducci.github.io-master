async function photosFilterss() {
  const response = await fetch("./assets/photosFilter.json");
  const photos = await response.json();
  return photos;
}

//Création d'une function qui genere les photos
async function genererPhotos(photo) {
  const photos = typeof photo === "undefined" ? await photosFilterss() : photo;
  //Création d'une boucle qui va prendre toutes les photos

  for (let i = 0; i < photos.length; i++) {
    // Création des balises

    const article = photos[i];

    const sectionGallery = document.querySelector(".gallery");

    const divElement = document.createElement("div");
    divElement.classList.add("gallery-item");

    const imageElement = document.createElement("img");
    divElement.classList.add("imageId");
    imageElement.src = article.image;
    imageElement.alt = article.alt;
    imageElement.id = article.id;
    imageElement.style.width = "440px";
    imageElement.style.height = "440px";

    //Ajout de articleElement dans sectionGallery

    sectionGallery.appendChild(divElement);

    //Ajout de nos balises au DOM
    divElement.appendChild(imageElement);

    //MODAL--------------------------------
    // OUVRIR MODAL----
    imageElement.addEventListener("click", openModal);
    //console.log(imageElement.id);

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

//----------FILTRES--------------------

async function selectionFilters() {
  const photos = await photosFilterss();
  Array.from(document.querySelectorAll(".filterChoice")).forEach((el) => {
    el.addEventListener("click", (event) => {
      const categoryId = event.target.dataset.id;
      //console.log("Category", categoryId);
      Array.from(document.querySelectorAll(".filterChoice")).forEach((el) => {
        el.classList.remove("activedButton");
      });
      event.target.classList.add("activedButton");
      if (categoryId <= 0) {
        document.querySelector(".gallery").innerHTML = "";
        genererPhotos();
      } else {
        const photosFiltrees4 = photos.filter(function (photo) {
          return photo.categoryId == categoryId;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererPhotos(photosFiltrees4);
        console.log(photosFiltrees4);
      }
    });
  });
}

//------------Modif couleur filtres-----------

//----------------CAROUSEL-----------------------

let firstSlide = 0;
const next = document.querySelector("#boutonDroite");
const prev = document.querySelector("#boutonGauche");
const btnNum1 = document.querySelector("#bouton1");
const btnNum2 = document.querySelector("#bouton2");
const btnNum3 = document.querySelector("#bouton3");

//console.log(carousel());

async function genererCarousel() {
  //slides.forEach((element, index) => {});
  const slides = [
    {
      id: 1,
      image: "./assets/images/slider/ryoji-iwata.webp",
      alt: "Homme qui marche pour aller au travail",
    },

    {
      id: 2,
      image: "./assets/images/slider/nicholas-green.webp",
      alt: "Photo du public joyeux à un concert",
    },

    {
      id: 3,
      image: "./assets/images/slider/edward-cisneros.webp",
      alt: "Photo d'un couple de marié qui s'embrassent",
    },
  ];
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
  //console.log(slides);
  //Ajout de nos balises au DOM
  if (firstSlide == 0) {
    btnNum1.style.opacity = "1";
    btnNum2.style.opacity = "0.5";
    btnNum3.style.opacity = "0.5";
  } else if (firstSlide == 1) {
    btnNum1.style.opacity = "0.5";
    btnNum2.style.opacity = "1";
    btnNum3.style.opacity = "0.5";
  } else {
    btnNum1.style.opacity = "0.5";
    btnNum2.style.opacity = "0.5";
    btnNum3.style.opacity = "1";
  }
}
//permet de generer les photos non filtrés par default
genererCarousel();

next.addEventListener("click", photoSuivante);
function photoSuivante() {
  if (firstSlide >= 2) {
    firstSlide = 0;
    document.querySelector(".carouselImage").remove();
    genererCarousel();
  } else {
    firstSlide = firstSlide + 1;
    document.querySelector(".carouselImage").remove();
    genererCarousel();
  }
}

setInterval(photoSuivante, 8000);

// Photo precedente-----------------------

prev.addEventListener("click", () => {
  if (firstSlide <= 0) {
    firstSlide = 2;
    document.querySelector(".carouselImage").remove();
    genererCarousel();
  } else {
    firstSlide = firstSlide - 1;
    document.querySelector(".carouselImage").remove();
    genererCarousel();
  }
});

//--------------BTN CAROUSEL -----------------

btnNum1.addEventListener("click", () => {
  firstSlide = 0;
  document.querySelector(".carouselImage").remove();
  genererCarousel();
  btnNum1.style.opacity = "1";
  btnNum2.style.opacity = "0.5";
  btnNum3.style.opacity = "0.5";
});

btnNum2.addEventListener("click", () => {
  firstSlide = 1;
  document.querySelector(".carouselImage").remove();
  genererCarousel();
  btnNum1.style.opacity = "0.5";
  btnNum2.style.opacity = "1";
  btnNum3.style.opacity = "0.5";
});

btnNum3.addEventListener("click", () => {
  firstSlide = 2;
  document.querySelector(".carouselImage").remove();
  genererCarousel();
  btnNum1.style.opacity = "0.5";
  btnNum2.style.opacity = "0.5";
  btnNum3.style.opacity = "1";
});
//--------------BTN CAROUSEL -----------------

// -------------------MODAL------------------

// OUVRIR MODAL----
const target = document.querySelector("#modal1");
const stopPropagation = function (e) {
  e.stopPropagation();
};

const openModal = function (e) {
  e.preventDefault();

  const monIdPhoto = parseInt(e.target.getAttribute("id")) - 1;
  const catId = parseInt(document.querySelector(".activedButton").dataset.id);

  //console.log(monIdPhoto);
  target.style.display = null;
  target.setAttribute("aria-hidden", "false");
  target.setAttribute("aria-modal", "true");
  document
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
  if (catId === null || catId === undefined) {
    catId = 0;
    genererPhotosModal();
  } else {
    genererPhotosModal(monIdPhoto, catId);
  }
};

// CLOSE MODAL-----------

const closeModal = function (e) {
  e.preventDefault();

  document
    .querySelector(".modal-wrapper")
    .removeEventListener("click", stopPropagation);
  target.style.display = "none";
  target.setAttribute("aria-hidden", "true");
  target.setAttribute("aria-modal", "false");
  document.querySelector(".modaleDivImage").remove();
};

document.querySelector(".modal").addEventListener("click", closeModal);

//----------GENERER PHOTOS MODAL---------
let IdPhoto = 0;
let nbMedias = 8;

const btnModal1 = document.querySelector("#btn-gModal");
const btnModal2 = document.querySelector("#btn-dModal");

async function genererPhotosModal(IdPhoto, catId) {
  const photosModal = await photosFilterss();
  //console.log(photosModal.length);

  //const isLargeNumber = (element) => element.id === IdPhoto;

  //console.log(catId);
  let maPhotoFiltre = photosModal.filter(
    (el) => el.categoryId === parseInt(catId)
  );

  console.log(maPhotoFiltre.findIndex((element) => element.id === IdPhoto));

  console.log(IdPhoto);
  IdPhoto = parseInt(IdPhoto) - 1;
  let myPhotosModale = maPhotoFiltre[IdPhoto];
  nbMedias = maPhotoFiltre.length - 1;

  const sectionCarousel = document.querySelector(".contenuModal");
  const divElement = document.createElement("div");
  divElement.classList.add("modaleDivImage");

  const imageElement = document.createElement("img");
  imageElement.src = myPhotosModale.image;
  imageElement.alt = myPhotosModale.alt;
  imageElement.classList.add("modaleImage");

  //Ajout de articleElement dans sectionGallery
  sectionCarousel.appendChild(divElement);
  divElement.appendChild(imageElement);
}
//permet de generer les photos non filtrés par default

// Photo suivante-----------------------

btnModal2.addEventListener("click", () => {
  console.log(IdPhoto);
  nbMedias = photosModal.length;
  if (IdPhoto >= nbMedias) {
    IdPhoto = 0;
    document.querySelector(".modaleDivImage").remove();
    genererPhotosModal(IdPhoto);
  } else {
    IdPhoto = IdPhoto + 1;
    document.querySelector(".modaleDivImage").remove();
    genererPhotosModal(IdPhoto);
  }
  console.log(nbMedias);
});

// Photo precedente-----------------------

btnModal1.addEventListener("click", () => {
  nbMedias = photosModal.length;
  if (IdPhoto <= 0) {
    IdPhoto = nbMedias;
    document.querySelector(".modaleDivImage").remove();
    genererPhotosModal(IdPhoto);
  } else {
    IdPhoto = IdPhoto - 1;
    document.querySelector(".modaleDivImage").remove();
    genererPhotosModal(IdPhoto);
  }
});
