'use strict';
const btnMenuToggle = document.querySelector('.js-btn');

btnMenuToggle.addEventListener('click', function () {
  console.log('clicked');

  document.querySelector('.js-menu').classList.toggle('active');
});
