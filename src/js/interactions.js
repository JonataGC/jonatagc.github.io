// Novo scroll do mouse
var wheelDeltaY = 0;

var interHeaderWhiteBg = document.getElementById("p-header-white-bg")
// Usa muita cpu esse trem aqui
document.addEventListener("mousemove", function(e) {
	// Atualiza o fundo somente se visível
	if (wheelDeltaY < 5) {
		movementX = e.x / 130
		movementY = e.y / 100
		interHeaderWhiteBg.style.clipPath = `polygon(0 0, ${100-movementX-movementY}% 0%, ${65+movementX-movementY}% 90%, 0% 70%)`
	}
})

document.addEventListener("scroll", function() {})
// Touch support
document.addEventListener("touchstart", (e) => {
	console.log(e.changedTouches[0].screenY)
})
document.addEventListener("touchend", (e) => {
	console.log(e.changedTouches[0].screenY)
})
document.addEventListener("wheel", (e) => {
	scrollPage(e.deltaY, e.target)
});

// Lista de elementos
let chapters = document.getElementsByClassName("p-chapter")
let interParallaxMe = document.getElementById("p-me")
let chapterOverlay = document.getElementById("p-chapter-overlay")
let newScrollBar = document.getElementById("p-progress-bar")
var scrollBarPosition = 0

var chapter1offset = 0
var chapter2offset = 100
chapters["0"].style.display = "block";

// var innerScroll = false
// var scrollTimer = -1;
function bodyScroll() {
	// innerScroll = true
	// if (scrollTimer != -1)
	// 	clearTimeout(scrollTimer);
	// scrollTimer = window.setTimeout(()=>{
	// 	innerScroll = false;
	// }, 1500);
}

var footerFadeOpacity = 0;
function scrollPage(direction, hoverElement) {
	// Block scroll on elements with the data set blockScroll
	// if (hoverElement.attributes["data-blockScroll"] != null && innerScroll == true) return;
	if (hoverElement.attributes["data-blockScroll"] != null) return;
	
	var padding = 0.3
	// Moving direction
	yOffset = direction < 0 ? -1 : 1;
	
	// Window size scroll size
	wheelDeltaY += padding * yOffset;
	// wheelDeltaY Clamp
	wheelDeltaY < 0 ? wheelDeltaY = 0 : true;
	wheelDeltaY > padding * 12 ? wheelDeltaY = padding * 12 : true;

	newScrollBar.style.top = wheelDeltaY * 27  + "%"

	// Chapter 1 - Intro
	// Banner parallax
	if (wheelDeltaY <= padding * 2) {
		interParallaxMe.style.backgroundPosition = `center ${wheelDeltaY*20}px`
		chapterOverlay.style.opacity = wheelDeltaY < 1 ? wheelDeltaY* 1.3 : 1;
		chapterOverlay.style.display = "block";
		chapters[0].style.display = "block";
		chapters[1].style.display = "none";
		chapters[2].style.display = "none";

		newScrollBar.style.backgroundColor = "white"
	}

	// Transition to chapter 2
	if (wheelDeltaY > padding * 3 && wheelDeltaY <= padding * 6) {
		chapterOverlay.style.opacity -= wheelDeltaY >= 0 ? wheelDeltaY : 0;
		chapterOverlay.style.display = "none";

		chapters[0].style.display = "none";
		chapters[1].style.top = "0vh";
		chapters[2].style.top = "100vh";

		chapters[1].style.display = "block";
		chapters[2].style.display = "block";

		newScrollBar.style.backgroundColor = "black"
	}
	
	if (wheelDeltaY > padding * 6 && wheelDeltaY <= padding * 8) {
		chapterOverlay.style.display = "none";
		chapterOverlay.style.backgroundColor = "white";
		footerFadeOpacity = 0
		newScrollBar.style.backgroundColor = "black"
		chapterOverlay.style.opacity = 0;
		
		chapters[1].style.top = "0vh";
		chapters[2].style.top = "0vh";
	}

	if (wheelDeltaY > padding * 8 && wheelDeltaY <= padding * 10) {
		footerFadeOpacity += yOffset / 2;
		chapterOverlay.style.opacity = footerFadeOpacity;
		chapterOverlay.style.backgroundColor = "black";
		chapterOverlay.style.display = "block";
		newScrollBar.style.backgroundColor = "white"

		chapters[3].style.display = "none";
	}

	if (wheelDeltaY > padding * 10 && wheelDeltaY <= padding * 12) {
		chapters[3].style.display = "block";
		chapterOverlay.style.display = "none";
	}
}