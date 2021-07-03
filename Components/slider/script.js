'use strict';
const slideContainer = document.querySelector('.slide-container');
// const slides = document.querySelectorAll('.slide');
const slides = Array.from(document.querySelectorAll('.slide'));
const btnPrev = document.querySelector('.btn-left');
const btnNext = document.querySelector('.btn-right');
const dotContainer = document.querySelector('.js-dot');

const buttonSlider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;

  //* Creating dots
  const createDots = function () {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i}>
        <span class="scr-only">Dots</span>
       </button>`
      )
    );
  };

  //* Activating dots
  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDots(curSlide);
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDots(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  };

  init();

  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activateDots(slide);
    }
  });

  //* slide with keyboard
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  //* Automatic slide functionality
  // setInterval(nextSlide, 3000);

  //Touch slider
  let isDragging = false,
    currentPosition,
    newPosition;

  const getPositionX = (event) =>
    event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;

  const touchStart = function () {
    return function (event) {
      isDragging = true;

      currentPosition = getPositionX(event);
    };
  };

  const touchMove = function (event) {
    if (isDragging) {
      newPosition = getPositionX(event);
    }
  };

  const touchEnd = function () {
    isDragging = false;

    currentPosition > newPosition ? nextSlide() : prevSlide();
  };

  slides.forEach((slide, index) => {
    //* disable default image drag if any image is used
    // slideImage.addEventListener('dragstart', (e) => e.preventDefault())

    //* touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    //* mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mousemove', touchMove);
  });
};

buttonSlider();

const touchSlider = function () {
  let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

  //* Preventing menu opening
  // window.oncontextmenu = function (event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   return false;
  // };

  const getPositionX = (event) =>
    event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;

  const setSliderPositions = function () {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${currentTranslate * i}px)`)
    );
  };

  const animation = function () {
    setSliderPositions();

    if (isDragging) requestAnimationFrame(animation);
  };

  const setPositionByIndex = function () {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPositions();
  };

  const touchStart = function (index) {
    return function (event) {
      currentIndex = index;
      startPos = getPositionX(event);
      isDragging = true;

      animationID = requestAnimationFrame(animation);
    };
  };

  const touchEnd = function () {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) {
      currentIndex += 1;
    }

    if (movedBy > 100 && currentIndex > 0) {
      currentIndex -= 1;
    }

    setPositionByIndex();
  };

  const touchMove = function (event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  };

  //* slide with drag and touch only one would work at a time
  slides.forEach((slide, index) => {
    //* disable default image drag if any image is used
    // slideImage.addEventListener('dragstart', (e) => e.preventDefault())

    //* touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    //* mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mousemove', touchMove);
    slide.addEventListener('mouseleave', touchEnd);
  });
};

// touchSlider();
