(() => {
  "use strict";

  const select = (el, all = false) => {
    const element = el.trim();
    return all ? [...document.querySelectorAll(element)] : document.querySelector(element);
  };

  const on = (type, el, listener, all = false) => {
    const element = select(el, all);
    if (all) {
      element.forEach(e => e.addEventListener(type, listener));
    } else {
      element.addEventListener(type, listener);
    }
  };

  function select(selector) {
    return document.querySelector(selector);
  }
  
  let preloader = select('#preloader');
  if (preloader) {
    const minLoadingTime = 2000; 
    const startTime = new Date().getTime();
  
    window.addEventListener('load', () => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
  
      if (elapsedTime < minLoadingTime) {
        setTimeout(() => {
          preloader.remove();
        }, minLoadingTime - elapsedTime);
      } else {
        preloader.remove();
      }
    });
  }
  
  

  const initializeTyped = () => {
    const typed = select('.typed');
    if (typed) {
      const typedStrings = typed.getAttribute('data-typed-items').split(',');
      const typedOptions = {
        strings: typedStrings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 3000
      };
      try {
        new Typed('.typed', typedOptions);
      } catch (e) {
        console.error("Error initializing Typed.js:", e);
      }
    }
  };

  const addFadeInAnimation = () => {
    const animatedElements = select('.animate-on-load', true);
    animatedElements.forEach(el => el.classList.add('animated'));
  };

  window.addEventListener('load', () => {
    initializeTyped();
    addFadeInAnimation();
  });

  const menuItems = select('#menu nav ul li a, .list-social li a', true);

  const handleMouseOver = (item) => {
    item.classList.add('hovered');
  };

  const handleMouseOut = (item) => {
    item.classList.remove('hovered');
  };

  const handleTransitionEnd = (item) => {
    item.classList.remove('hovered');
  };

  menuItems.forEach(item => {
    item.addEventListener('mouseover', () => handleMouseOver(item));
    item.addEventListener('mouseout', () => handleMouseOut(item));
    item.addEventListener('transitionend', () => handleTransitionEnd(item));
  });

})();
