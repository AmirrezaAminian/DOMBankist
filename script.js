'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

// tabs component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Project

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});



//* nav style hover

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibiling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sibiling.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
};

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const sibiling = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    sibiling.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });

    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', handleHover);



const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);


const stickyNav = function (entreis) {
  const [entry] = entreis;
  console.log(entry);

  if(!entry.isIntersecting){
    nav.classList.add('sticky') ;
  }else{
    nav.classList.remove('sticky')
  }
};


const headerObserver = new IntersectionObserver(stickyNav , {
  root : null ,
  threshold : 0 ,
  rootMargin : `-${navHeight}px`
})

headerObserver.observe(header)



// Reveal Sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entreis, observer) {
  const [entry] = entreis;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace  src with data-src
  entry.target.src = entry.target.dataset.src;

 

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));





const slides = document.querySelectorAll('.slide') ;
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots')


let curSlide = 0 ;

const maxSlide = slides.length ;

const slider = document.querySelector('.slider');
 

const createDots = function(){
  // adding the html in the last child of slide
  slides.forEach(function(_ , i){
    dotContainer.insertAdjacentHTML('beforeend' , `<button class ="dots__dot" data-slide="${i}"></button>`)
  }) 
}

createDots() ;

 
const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active')) ;

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
}
activateDot(0);


// next slide
const goToSlide = function(slide){

  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
}

goToSlide(0);
//* chon ke i - 0 = i 


const nextSlide = function(){
  // az 0 shoro mishe
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

 
  goToSlide(curSlide);
  activateDot(curSlide);
} 

const prevSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide  ;
  }else{
    curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  }
}

const init = function(){
  activateDot(0);
    
  goToSlide(0);
}
 

btnRight.addEventListener('click' , nextSlide) ;
btnLeft.addEventListener('click' , prevSlide) ;


document.addEventListener('keydown' , function(e){
  console.log(e); 
  if(e.key === 'ArrowLeft') prevSlide() ;
  if(e.key === 'ArrowRight') nextSlide() ;
  
})

dotContainer.addEventListener('click' , function(e){
  if(e.target.classList.contains('dots__dot')){
    //  const slide = e.target.dataset.slide
     const {slide} = e.target.dataset;
     goToSlide(slide) ;
    activateDot(slide);

  }
})