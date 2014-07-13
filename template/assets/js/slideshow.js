/*
* Author: Meshulam Silk (moomoohk@ymail.com) 
* Description: Slideshow widget
*/

var selectedIndex = 0;
var speed = 5000;
var timer;

$(document).ready(function() {
	timer = setInterval(function() {
		changeImage($(".slide:nth(" + ((++selectedIndex) % $(".slide").length()) + ")"));
	}, speed);

	$(".slideshow").append("<img class=\"currSlide\"/><div class=\"slides\"></div>");
	$(".slideshow").css("height", "500px");
	$(".slideshow").css("background-color", "white");
	$(".slideshow").css("overflow", "auto");
	$(".slideshow").css("border", "1px solid #505050");
	$(".slideshow").css("border-radius", "5px");

	$(".currSlide").css("height", "400px");
	$(".currSlide").css("display", "block");
	$(".currSlide").css("margin", "auto");

	$(".slides").css("vertical-align", "middle");
	$(".slides").css("height", "90px");
	$(".slides").css("background-color", "#505050");
	$(".slides").css("border-radius", "5px");
	$(".slides").css("padding", "5px");

	$("img.slide").each(function() {
		var thumbSlide = $(this).clone();
		$(this).removeClass("slide");
		$(".slides").append(thumbSlide);

		thumbSlide.css("height", (thumbSlide.parent().height() - 10) + "px");
		thumbSlide.css("margin-left", "2px");
		thumbSlide.css("margin-right", "2px");
		thumbSlide.css("cursor", "pointer");
		thumbSlide.css("background-color", "white");
		thumbSlide.css("border-style", "solid");
		thumbSlide.css("border-width", "0px");
		thumbSlide.css("border-color", "rgb(168, 168, 168)");
		thumbSlide.css("vertical-align", "middle");

		thumbSlide.hover(function() {
			$(this).addClass("mouseover");
			if ($(this).hasClass("selected")) {
				toggleTimer(false);
			}
			$(this).animate({
				"height" : ($(this).parent().height() - 5) + "px",
			}, 100);
		}, function() {
			$(this).removeClass("mouseover");
			if ($(this).hasClass("selected")) {
				toggleTimer(true);
			}
			$(this).animate({
				"height" : ($(this).parent().height() - 10) + "px",
			}, 100);
		});
		thumbSlide.click(function() {
			changeImage($(this));
		});
		$(this).css("display", "none");
		$(this).height(Math.min(300, ($("body").width - 10)));
	});

	changeImage($(".slide:nth(0)"));
});

function changeImage(thumbnail) {
	if (thumbnail.hasClass("selected")) {
		return;
	}
	toggleTimer(false);
	$(".currSlide").fadeOut(100, function() {
		$(".currSlide").attr("src", thumbnail.attr("src"));
	});
	$(".currSlide").fadeIn(100);
	if (!thumbnail.hasClass("mouseover")) {
		toggleTimer(true);
	}

	$(".selected").animate({
		borderWidth : "0px"
	}, 100);

	$(".selected").removeClass("selected");
	thumbnail.addClass("selected");

	$(".selected").animate({
		borderWidth : "3px"
	}, 100);
}

function toggleTimer(f) {
	if (f) {
		timer = setInterval(function() {
			if (selectedIndex == $(".slide").length - 1) {
				selectedIndex = 0;
			} else {
				selectedIndex++;
			}
			changeImage($(".slide:nth(" + selectedIndex + ")"));
		}, speed);
	} else {
		clearInterval(timer);
	}
}