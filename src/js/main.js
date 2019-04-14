window.onload = function() {
	const width = window.innerWidth;

	if (width < 600) {
		document.getElementById("main-section").dataset.bg =
			"url(images/tami-bg-mobile.png)";
	} else {
		document.getElementById("bg-plan-section").dataset.bg =
			"url(images/vicente-bg-min.jpg)";
	}

	lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy",
	});
};

window.onscroll = function() {
	var header = document.getElementById("sticky-header");
	var offsetHeader = header.offsetTop;
	var hideOffset = document.getElementById("about-section").offsetTop;

	if (window.pageYOffset > offsetHeader && window.pageYOffset < hideOffset) {
		header.style.display = "block";
		header.style.animation = "fadeIn 1s";
	} else {
		header.style.animation = "fadeOut 1s";
		header.style.display = "none";
	}
};

/* 
	var myLandbotLivechat = new LandbotLivechat({
		index: "https://landbot.io/u/H-147712-UKC709CRMO26Z5Q5/index.html",
	}); 
*/
