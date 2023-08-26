// The main idea here, is when the user scrolls, this impacts the top placement of the
// parallax elements. Then after the top is is changed, the element is
// modulated so that it definitely fits on screen (that's why it is times two (x2) height)

var space = document.getElementById("space")
var stars0 = document.getElementById("stars0")
var stars1 = document.getElementById("stars1")

function parallax_scrolling(){

    // space.style.top = `${-Math.floor((scrollY * 0.008) % 150)}%`
    // stars.style.top = `${-Math.floor((scrollY * 0.020) % 150)}%`

    space.style.top = `${-(scrollY * 0.008) % 150}%`
    stars0.style.top = `${-(scrollY * 0.008) % 150}%`
    stars1.style.top = `${-(scrollY * 0.022) % 150}%`
}

window.addEventListener("scroll", parallax_scrolling)
