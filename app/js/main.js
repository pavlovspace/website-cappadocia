// -- preloader
window.onload = function () {
    this.document.querySelector('.preloader').style.display = 'none'
}

// -- scroll paper animation

const flightPath = {
    curviness: 1.25,
    autoRotate: true,
    values: [{
            x: 100,
            y: -10
        },
        {
            x: 300,
            y: -50
        },
        {
            x: 500,
            y: 3
        },
        {
            x: 950,
            y: -50
        },
        {
            x: 350,
            y: -30
        },
        {
            x: 600,
            y: 5
        },
        {
            x: 800,
            y: -50
        },
        {
            x: window.innerWidth,
            y: -250
        },
    ]
}

const tween = new TimelineLite();

tween.add(
    TweenLite.to('.paper-plane', 1, {
        bezier: flightPath,
        ease: Power1.easeInOut
    })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
        triggerElement: '.scroll-animation',
        duration: 1000,
        triggerHook: 1,
    })
    .setTween(tween)
    .addTo(controller)