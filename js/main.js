// TOGGLE MENU
function toggleMenu() { //With old html this is the one working. 
  document.getElementsByClassName('navigation')[0].classList.toggle('responsive');
}


// CURRENT DATE FIELD ON FOOTER
// Create a new Date object and inject in the DOM the current date
const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};

document.querySelector('#currentdate').innerHTML = new Date().toLocaleDateString('en-US', options);


// SHOW BANNER AD ON FRIDAY
const bannerad = document.getElementById('banner');
const newDateObj = new Date();
const today = newDateObj.getDay();

if (today == 5){
    bannerad.style.display = "block";
}
