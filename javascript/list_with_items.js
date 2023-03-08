function actions(){
	$('body').fadeIn('1000');
	$('.another').click(function () {
		$('body').fadeOut('1000');

    })
	function onEntry(entry){
		entry.forEach(change => {
			if (change.isIntersecting){
				change.target.classList.add('element-show');
			}
		});
	}


	
	function appearanceOfMainMenu(){
		rightNavigationBox.classList.add('show');
		document.getElementById('burger').classList.add('left')
		
    }
	
	
    function disappearanceOfMainMenu(){
		if (rightNavigationBox.classList.contains('show')){
			rightNavigationBox.classList.remove('show')
			document.getElementById('burger').classList.remove('left')
			listOfItems = document.querySelectorAll('.list-of-items')
			listOfItems.forEach((item) => {
				item.classList.remove('show')
			})
		}
    }
	
	const showInnerContent = (ind, clicksQty) => {
		listOfItems = document.getElementsByClassName('list-of-items')
		if (clicksQty % 2 !== 0){
			listOfItems[ind].classList.add('show')
		} else{
			listOfItems[ind].classList.remove('show')
		}
}

	let options = {
		thresholds:[0.1]};

	let observer = new IntersectionObserver(onEntry, options);

	let elements = document.querySelectorAll('.element-animation');
	
	for (let elm of elements){
		observer.observe(elm);
	}
	const rightNavigationBox = document.getElementById('right-navigation-box');
    rightNavigationBox.addEventListener('click', appearanceOfMainMenu);
	
    let mainBox = document.getElementById('main-box');
    mainBox.addEventListener('click',disappearanceOfMainMenu);

	for (let elm of elements){
		observer.observe(elm);
	}
	let click0 = 0
    click1 = 0
	click2 = 0;
	
    const clicks = new Array(click0,click1,click2)
    const partsOfNavigation = document.querySelectorAll('.part-of-navigation')
    partsOfNavigation.forEach((item,indexPart) => {
		item.addEventListener('click',() => {
			index = indexPart;
			clicks[index]++
			showInnerContent(index,clicks[index])
		})
  
	})
	$(window).scroll(function () {
		if (pageYOffset > 500) {
			$('.top-arrow').fadeIn(1000)
		}
		if (pageYOffset < 300) {
			$('.top-arrow').fadeOut(1000)
		}
		console.log(pageYOffset)
		if (pageYOffset > 2300) {
			$('.top-arrow img').css('bottom', pageYOffset-2300)
		}
		if (pageYOffset < 2400) {
			$('.top-arrow img').css('bottom',0)
		}
		console.log(pageYOffset)

    })
	$('.top-arrow').click(function (e) {
		e.preventDefault()
		const place = $('.top-arrow a').attr('href')
		const placeTop = $(place).offset().top - 20
		const time = window.pageYOffset
		$('html, body').animate({ scrollTop: placeTop, easing: 'easeOutCirc' },time)
		
    })
}