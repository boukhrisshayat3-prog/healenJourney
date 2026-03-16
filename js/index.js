import {datos} from './date.js';

const contenedor = document.getElementById('slider__container');


// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('isActive');
const closeMenu = document.querySelector('.close-menu');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

closeMenu.addEventListener('click', () => {
    nav.classList.remove('active');
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});


datos.forEach(moda => {

    const newdiv =document.createElement('div');
    newdiv.classList.add('slider__item');
    
    newdiv.innerHTML=`<img src="${moda.imagen}" alt="imagen"> 
    <div class="slider__info flex-column">
    <span class="font--weight">${moda.subtitulo ? moda.subtitulo : ''}</span>
    <h2 class="text--lg">${moda.titulo ? moda.titulo : ''}</h2>
    <p class="body">${moda.parrafo ? moda.parrafo : ''}</p>
    <a href="${moda.botonLink ? moda.botonLink : '#'}" class=" btn body">${moda.botonTexto ? moda.botonTexto : ''}</a>
    </div>
    `;
    contenedor.appendChild(newdiv);
    
});
//slider automatico
let index = 0;
const slide = document.querySelectorAll('.slider__item');
slide[0].classList.add('active');

function autoSlide(i) {
  slide.forEach(sld => sld.classList.remove('active'));
  slide[i].classList.add('active');
}

setInterval(() => {
  index++;
  if (index >= slide.length) {
    index = 0;
  }
  autoSlide(index);
}, 3000);
