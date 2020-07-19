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
let popupBtn = document.getElementById("popupBtn");
popupBtn.addEventListener("click", () => {
  popupToggle();
});

function popupToggle() {
  let blur = document.getElementById("blur");
  let popup = document.getElementById("popup");
  document.querySelector("body").style.overflow = "hidden";

  blur.classList.add("active");
  popup.classList.add("active");
}

let closePopup = document.querySelector(".close");
closePopup.addEventListener("click", () => {
  let blur = document.getElementById("blur");
  let popup = document.getElementById("popup");

  document.querySelector("body").style.overflow = "auto";

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
