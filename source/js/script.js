'use strict';

(function(){ 

// Блок кода показать меню

	const menuBtn = document.querySelector(".main-nav__burger");
	const subNav = document.querySelector(".main-nav__submenu");
	const body = document.querySelector(".page-body");

	function menuBtnHandler() {
		subNav.classList.toggle('main-nav__submenu--active');
		menuBtn.classList.toggle('main-nav__burger--closed');
		body.classList.toggle('lock');
	};

	menuBtn.addEventListener('click', function(evt) {
		evt.preventDefault();
		menuBtnHandler();
	});

// Блок кода показать все отзывы

	const feedbackShowBtn = document.querySelector(".feedback__show-more");
	const feedbackArticles = document.querySelectorAll(".feedback__item--hidden");

	function feedbackShowBtnHandler() {
		for (let i = 0; i < feedbackArticles.length; i++) {
			feedbackArticles[i].classList.toggle('feedback__item--show');
		};
		feedbackShowBtn.classList.toggle('feedback__show-more--show');
	};

	feedbackShowBtn.addEventListener('click', function(evt) {
		evt.preventDefault();
		feedbackShowBtnHandler();
	});
}());