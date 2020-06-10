'use strict';

(function(){ 

// Блок кода показать меню

	const menuBtn = document.querySelector(".main-nav__burger");
	const subNav = document.querySelector(".main-nav__submenu");
	const pageBody = document.querySelector(".page-body");
	const overlay = document.querySelector(".overlay");
	const headerWrapper = document.querySelector(".container__header");

	function menuBtnHandler() {
		subNav.classList.toggle('main-nav__submenu--active');
		headerWrapper.classList.toggle('container__header--show');
		menuBtn.classList.toggle('main-nav__burger--closed');
		pageBody.classList.toggle('lock');
		overlay.classList.toggle('overlay--show');
	};

	menuBtn.addEventListener('click', function(evt) {
		evt.preventDefault();
		menuBtnHandler();
	});

	function overlayHandler() {
		overlay.classList.remove('overlay--show');
		subNav.classList.remove('main-nav__submenu--active');
		menuBtn.classList.remove('main-nav__burger--closed');
		pageBody.classList.remove('lock');
	};

	overlay.addEventListener('click', function(evt) {
		evt.preventDefault();
		overlayHandler();
	});

// Блок прокрутка меню

	const header = document.querySelector(".container__header");
	function scrollHandler() {
		if (pageYOffset == 0) {
			if (header.classList.contains('container__header--scrolled')) {
				header.classList.remove('container__header--scrolled');
			};
		} else {
			if (!header.classList.contains('container__header--scrolled')) {
				header.classList.add('container__header--scrolled');
			};	
		}
	};
	window.addEventListener('scroll', function() {
  		scrollHandler();
	});

// Блок показать все отзывы

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

// Блок показать нижнее меню
	const footerMenuBtn = document.querySelectorAll(".footer-menu__title");

	for (let i = 0; i < footerMenuBtn.length; i++) {
		let item = footerMenuBtn[i];
		item.addEventListener('click', function(evt) {
			evt.preventDefault();
			item.classList.toggle('footer-menu__title--show');
		});
	};
	
}());