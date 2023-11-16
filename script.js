import { renderChallenges } from './fetchChallenges.js';
if (window.location.pathname === '/index.html') {
  const container = document.querySelector('.sidescroll')
  renderChallenges(container, 3);
}

/*Eventlistener that reacts to click on menu lines in mobilemode */
document
  .querySelector(".logoAndTitle__hamburgerBtn")
  .addEventListener("click", () => {
    /*Waits 130 ms and then adds class to element */
    setTimeout(() => {
      document
        .querySelector(".hamburgerMenu__menuCont")
        .classList.add("hamburgerMenu__menuCont--open");
    }, 130);

    /*Adds class to element */
    document.querySelector(".body").classList.add("body--openMenu");
    /*Adds class to element */
    document
      .querySelector(".hamburgerMenu")
      .classList.add("hamburgerMenu--active");

    /*Eventlistener that reacts to the X symbol in overlaymenu */
    document
      .querySelector(".hamburgerMenu__closeBtn")
      .addEventListener("click", () => {
        /*Removes class from element */
        document
          .querySelector(".hamburgerMenu__menuCont")
          .classList.remove("hamburgerMenu__menuCont--open");
        /*Removes class from element */
        document.querySelector(".body").classList.remove("body--openMenu");
        /*Removes class from element */
        document
          .querySelector(".hamburgerMenu")
          .classList.remove("hamburgerMenu--active");
      });
  });