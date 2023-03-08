window.addEventListener('load', function () {

	$('body').fadeIn('1000');
	$('.another').click(function () {
		$('body').fadeOut('1000');
	})
	const rightNavigationBox = document.getElementById('right-navigation-box');
	rightNavigationBox.addEventListener('click', appearanceOfMainMenu);

	let mainBox = document.getElementById('main-box');
	mainBox.addEventListener('click', disappearanceOfMainMenu);

	const slides = document.getElementsByClassName('slide')
	const dots = document.querySelectorAll('.dot')

	const footer = document.getElementsByTagName('footer')[0]
	const body = document.getElementsByTagName('body')[0]

	let index = 0;
	let time = 3000;

	let click0 = 0
	click1 = 0
	click2 = 0;

	const clicks = new Array(click0, click1, click2)


	const partsOfNavigation = document.querySelectorAll('.part-of-navigation')


	function appearanceOfMainMenu() {
		rightNavigationBox.classList.add('show');
		document.getElementById('burger').classList.add('left')

	}


	function disappearanceOfMainMenu() {
		if (rightNavigationBox.classList.contains('show')) {
			rightNavigationBox.classList.remove('show')
			document.getElementById('burger').classList.remove('left')
			listOfItems = document.querySelectorAll('.list-of-items')
			listOfItems.forEach((item) => {
				item.classList.remove('show')
			})
		}
	}

	const activeSlide = (n) => {
		for (slide of slides) {
			slide.classList.remove('active')
		}
		slides[n].classList.add('active')
	}

	const activeDot = (n) => {
		for (dot of dots) {
			dot.classList.remove('active')
		}
		dots[n].classList.add('active')
	}

	const changeOfSlide = (ind) => {
		activeSlide(ind)
		activeDot(ind)
	}

	const nextSlide = () => {
		if (index == slides.length - 1) {
			index = 0
			changeOfSlide(index)
		} else {
			index++
			changeOfSlide(index)
		}
	}
	dots.forEach((item, indexDot) => {
		item.addEventListener('click', () => {
			index = indexDot;
			changeOfSlide(index)
		})
	})
	setInterval(nextSlide, time)

	const showInnerContent = (ind, clicksQty) => {
		listOfItems = document.getElementsByClassName('list-of-items')
		if (clicksQty % 2 !== 0) {
			listOfItems[ind].classList.add('show')
		} else {
			listOfItems[ind].classList.remove('show')
		}
	}
	partsOfNavigation.forEach((item, indexPart) => {
		item.addEventListener('click', () => {
			index = indexPart;
			clicks[index]++
			showInnerContent(index, clicks[index])
		})
	})

	window.onload = function () {
		window.addEventListener('wheel', mouse_wheel, false);
	}

	const mouse_wheel = function (event) {
		if (false == !!event) event = window.event;
		let direction = ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3) || false;
		if (direction == -1) {
			footer.classList.add('active')
		} else {
			footer.classList.remove('active')
		}
	}
	$('.help').click(function () {
		if ($('footer').hasClass('active')) {
			$('footer').removeClass('active')
		} else {
			$('footer').addClass('active')
        }
    })
})
window.onload = function () {
	window.addEventListener('wheel', mouse_wheel, false);
}

const mouse_wheel = function (event) {
	if (false == !!event) event = window.event;
	let direction = ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3) || false;
	if (direction == -1) {
		footer.classList.add('active')
	} else {
		footer.classList.remove('active')
	}
}
