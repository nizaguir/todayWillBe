// TOGGLE MENU
function toggleMenu() { //With old html this is the one working. 
  document.getElementsByClassName('navigation')[0].classList.toggle('responsive');
}


// CURRENT DATE FIELD ON FOOTER
// ****** Create a new Date object and inject in the DOM the current date
const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};

document.querySelector('#currentdate').innerHTML = new Date().toLocaleDateString('en-US', options);


// SHOW BANNER AD ON FRIDAY
const bannerad = document.getElementById('banner');
const newDateObj = new Date();
const today = newDateObj.getDay();

if (today == 5){
    bannerad.style.display = "block";
}


// GALLERY PAGE LAZY LOADING 
// ***** get all data-src refs
const images = document.querySelectorAll("img[data-src]");

// Optional parameters for the IntersectionalObject
const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 50px 0px"
}

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if(!src) {
      return;
  }
  img.src = src;
}

// creates new observer
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
      if (!entry.isIntersecting){
          return;
      } else {
          entry.target.classList.add('fadeIn');
          preloadImage(entry.target);
          imgObserver.unobserve(entry.target);
      }
  });
}, imgOptions);

images.forEach(image => {
  imgObserver.observe(image);
});

