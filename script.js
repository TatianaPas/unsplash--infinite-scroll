const imageContainer = document.getElementById ('image-container');
const loader = document.getElementById ('loader');


// unsplash API
const count=10;
const apiKey='ellMbYayyMmHU2fQlMR6fmMK9oxxI-VXLwubxa2y0FM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// helper function to set attributes on DOM Elements
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute (key, attributes[key])
    }
};


//create elements for links and photos and add to DOM

function displayPhotos () {
    //run function for each object in hpotos Array
    photosArray.forEach((photo) => {
        //create <a> to likn Unsplash
        const item = document.createElement('a');
        //item.setAttribute ('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        //create <img> for photo
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement ('img');
        //img.setAttribute ('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });



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

//on load

getPhotos();