
const imageConatiner = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let totalImages = 0;
let imageloaded = 0;

const count = 30;
const apiKey = 'ujyRg60P-H7KdvtBY6H3SswY89eyUbpnyBlkgTBTC0U';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all image are loaded

const imageLoaded = () => {
    imageloaded++;
    if (imageloaded === totalImages) {
        ready = true;
        loader.hidden = true;

    }
}


//helper function to set attributess
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

//create Elements for link and photos Add to dom
const displayPhotos = () => {
    imageloaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo) => {
        //Create <a></a> to link unsplash
        const item = document.createElement('a');

        //create image per photo
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        })
        //Event listner check when each is finished loading
        img.addEventListener('load', imageLoaded)
        //put image in side <a></a> putn both in image container
        item.appendChild(img);
        imageConatiner.appendChild(item);

    })
}
// get photos from unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        console.log(error);
    }
}

//Check to see if scrolling near bottom of page Load more photos
window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }

})

getPhotos();