const imageContainer = document.getElementById ('image-container');
const loader = document.getElementById ('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count=5;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }

}
// helper function to set attributes on DOM Elements
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute (key, attributes[key])
    }
};

//create elements for links and photos and add to DOM
function displayPhotos () {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //run function for each object in hpotos Array
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement ('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Evelnt listener, check when each photo loaded
        img.addEventListener('load', imageLoaded());

        //put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photos from Unsplash API
async function getPhotos() {
    try{

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
        //catch error here
    }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
      ready = false;
      getPhotos();
  }
})

//on load

getPhotos();
