// -- preloader
window.onload = function () {
  this.document.querySelector(".preloader").style.display = "none";
};

// -- scroll paper animation

const flightPath = {
  curviness: 1.25,
  autoRotate: true,
  values: [
    {
      x: 100,
      y: -10,
    },
    {
      x: 300,
      y: -50,
    },
    {
      x: 500,
      y: 3,
    },
    {
      x: 950,
      y: -50,
    },
    {
      x: 350,
      y: -30,
    },
    {
      x: 600,
      y: 5,
    },
    {
      x: 900,
      y: 100,
    },
    {
      x: window.innerWidth,
      y: -250,
    },
  ],
};

const tween = new TimelineLite();

tween.add(
  TweenLite.to(".paper-plane", 1, {
    bezier: flightPath,
    ease: Power1.easeInOut,
  })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  triggerElement: ".scroll-animation",
  duration: 1000,
  triggerHook: 1,
})
  .setTween(tween)
  .addTo(controller);

// -- visual effect

function scrollAppear() {
  let targetEl = document.querySelectorAll(".transition");
  targetEl.forEach((el) => {
    let targetElTop = el.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
    if (targetElTop <= windowHeight) {
      el.classList.add("transition-appear");
    } else if (targetElTop >= windowHeight) {
      el.classList.remove("transition-appear");
    }
  });
}

window.addEventListener("scroll", scrollAppear);

// -- popup
let popupBtn = document.querySelector("#popupBtn");
popupBtn.addEventListener("click", () => {
  popupToggle();
});

function popupToggle() {
  let blur = document.querySelector("#blur");
  let popup = document.querySelector("#popup");
  document.querySelector("body").style.overflowY = "hidden";

  blur.classList.add("active");
  popup.classList.add("active");
}

let closePopup = document.querySelector(".close");
closePopup.addEventListener("click", () => {
  let blur = document.querySelector("#blur");
  let popup = document.querySelector("#popup");

  document.querySelector("body").style.overflowY = "auto";

  popup.classList.remove("active");
  blur.classList.remove("active");
});

// --forms validation

const formPopup = document.querySelector("#formPopup");
const inputName = document.querySelector("#input-name");
const inputNumber = document.querySelector("#input-number");

const contactForm = document.querySelector("#contactForm");
const contactName = document.querySelector("#contact-name");
const contactNumber = document.querySelector("#contact-number");

formPopup.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  CheckInputsContact();
});

function checkInputs() {
  const inputNameValue = inputName.value.trim();
  const inputNumberValue = inputNumber.value.trim();

  //Imię
  if (inputNameValue === "") {
    setErrorFor(inputName, "Wpisz imię");
  } else {
    setSuccessFor(inputName);
  }
  //Numer
  if (inputNumberValue === "") {
    setErrorFor(inputNumber, "Wpisz numer");
  } else {
    setSuccessFor(inputNumber);
  }
}

function CheckInputsContact() {
  const contactNameValue = contactName.value.trim();
  const contactNumberValue = contactNumber.value.trim();

  //Imię
  if (contactNameValue === "") {
    setErrorFor(contactName, "Wpisz imię");
  } else {
    setSuccessFor(contactName);
  }
  //Numer
  if (contactNumberValue === "") {
    setErrorFor(contactNumber, "Wpisz numer");
  } else {
    setSuccessFor(contactNumber);
  }
}

function setErrorFor(input, message) {
  const inputControl = input.parentElement;
  const small = inputControl.querySelector("small");

  small.innerText = message;
  inputControl.className = "input-text error";
}

function setSuccessFor(input) {
  const inputControl = input.parentElement;
  inputControl.className = "input-text success";
}

// --sliders
let images = document.querySelectorAll(".about-slider__item img");
let imgTrip = document.querySelectorAll(".slider-inner img");

let current = 0;
let currentTrip = 0;
let arrowBack = document.querySelector("#arrow-back");
let arrowNext = document.querySelector("#arrow-next");
let arrowBackTrip = document.querySelector("#arrowBackTrip");
let arrowNextTrip = document.querySelector("#arrowNextTrip");

// -- slider

slider();
arrowBack.addEventListener("click", () => {
  if (current - 1 == -1) {
    current = images.length - 1;
  } else {
    current--;
  }
  slider();
});

arrowNext.addEventListener("click", () => {
  if (current + 1 == images.length) {
    current = 0;
  } else {
    current++;
  }
  slider();
});

function slider() {
  for (let i = 0; i < images.length; i++) {
    images[i].classList.add("opacity0");
  }
  images[current].classList.remove("opacity0");
}

// -- sliderTrip
sliderTrip();
arrowBackTrip.addEventListener("click", () => {
  if (currentTrip - 1 == -1) {
    currentTrip = imgTrip.length - 1;
  } else {
    currentTrip--;
  }
  sliderTrip();
});

arrowNextTrip.addEventListener("click", () => {
  if (currentTrip + 1 == imgTrip.length) {
    currentTrip = 0;
  } else {
    currentTrip++;
  }
  sliderTrip();
});

function sliderTrip() {
  for (let i = 0; i < imgTrip.length; i++) {
    imgTrip[i].classList.add("opacity0");
  }
  imgTrip[currentTrip].classList.remove("opacity0");
}

//-- Smooth Scrolling
function smoothScroll(target, duration) {
  var target = document.querySelector(target);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset || window.scrollY;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function loop(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(loop);
  }
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(loop);
}

//Animating 1 Link
document.querySelector(".ourTripLink").addEventListener("click", function () {
  smoothScroll("#ourTrip", 500);
});

//Animating 2 Link
document.querySelector(".hotelLink").addEventListener("click", function (e) {
  e.preventDefault();
  smoothScroll("#hotel", 500);
});
// Animating 3 Link
document.querySelector(".priceLink").addEventListener("click", function (e) {
  e.preventDefault();
  smoothScroll("#price", 500);
});
