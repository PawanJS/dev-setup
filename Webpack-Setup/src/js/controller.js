import '../sass/main.scss';

// removing preload class to make transition work
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});
