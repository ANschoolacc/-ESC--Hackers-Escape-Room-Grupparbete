  // Here im going to do the script for the booking-section

  const bookingContainer = document.querySelector(".booking-container");

  const bookingButtonOne = document.querySelector(".booking-container__button");

  const submitBookingButton = document.querySelector(".booking-container__submit-button");
  
  const cardButton = document.querySelectorAll(".sidescroll__btn");


  //making a function that helps me close down the modal and enable scroll on the website once again.
  function escapeBooking() {
    console.log("key pressed");
    bookingContainer.style.display = "none";
    document.querySelector(".body").style.overflow = "scroll";
  }


  //adding an forEach so that every button theres an eventlistener.
  cardButton.forEach(button => {
    button.addEventListener("click", () => {
        bookingContainer.style.display = "block";
        bookingContainer.classList.add("grow-in");
        document.querySelector(".body").style.overflow = "hidden";
  });
});

  
    //Making sure you can close the open modal with the esc butto
    document.body.addEventListener("keydown", (e) => {
        if(e.key == "Escape") {
          escapeBooking();
        }
      })


  //Adding eventlistener which takes you from first step to second step.
  bookingButtonOne.addEventListener("click", () => {
    document.querySelector(".booking-container__step-one").classList.add("invisible");
    document.querySelector(".booking-container__step-two").classList.remove("invisible");

    document.querySelector(".second-step").classList.add("fade-in");
    document.querySelector(".booking-container__submit-button").classList.add("fade-in");
  })

  //Adding eventlistener which takes you from the second step to the final step (Thank you)

  submitBookingButton.addEventListener("click", () => {
    document.querySelector(".booking-container__step-two").classList.add("invisible");
    document.querySelector(".booking-container__step-three").classList.remove("invisible");
    document.querySelector(".booking-container__step-three").classList.add("fade-in");
  })