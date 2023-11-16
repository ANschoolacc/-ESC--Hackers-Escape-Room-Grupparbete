/*När användaren klickar på “Book room” ska en ruta öppnas över allt annat, rutans innehåll byts ut i tre steg
I första steget visas en input där användaren kan välja ett datum, samt en knapp för att gå vidare. När användaren går vidare ska ett anrop göras till API för att se vilka tider som finns lediga det angivna datumet

I andra steget visas inputs för namn och e-post, samt två rullgardinsmenyer. I den första ska användaren kunna välja de tider som fanns tillgängliga, och i den andra hur många deltagare som ska medverka. Alternativen ska motsvara den data som hämtats från API. Slutligen även en knapp för att gå vidare.

När användaren går vidare ska ett tackmeddelande visas, samt möjlighet att stänga ned rutan och återgå till listan över utmaningar
Bokningen ska kunna öppnas både från startsidan och från den nya sidan, d.v.s. på båda de platser där rum finns. */

// Here im going to do the script for the booking-section
/*Import challenges function from fetchchallenges.js*/
import { challenges } from "./fetchChallenges.js";
/*Import renderchallenges function from fetchchallenges.js*/
import { renderChallenges } from "./fetchChallenges.js";

const bookingContainer = document.querySelector(".booking-container");

const bookingButtonOne = document.querySelector(".booking-container__button");

const submitBookingButton = document.querySelector(
  ".booking-container__submit-button"
);

const challengeTemplate = document.getElementById("card-template");
/*Fetch Dates api */
console.log(challenges);

/*challenges.forEach((obj) => console.log(obj.id));*/

/*challenges.forEach((obj) => {
  const challengeIds = obj.id.toString();
  console.log(challengeIds);

  async function fetchDatesApi() {
    const res = await fetch(
      `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${inputDate}&challenge=${challengeIds}`
    );
    const data = await res.json();
    return data;
  

  console.log(fetchDatesApi());
});*/
for (let i = 0; i < 30; i++) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + i);
  console.log(tomorrow.toISOString().split("T")[0]);
}

let bookingBtn = document.querySelectorAll(".sidescroll__btn");

for (let i = 0; i < bookingBtn.length; i++) {
  bookingBtn[i].addEventListener("click", () => {
    if (bookingBtn[i].innerText === "Take challenge online") {
      return;
    }

    console.log("button pressed");
    bookingContainer.style.display = "block";
    bookingContainer.classList.add("grow-in");
    document.querySelector(".body").style.overflow = "hidden";
    console.log("button pressed");
  });
}

/*challenges.forEach((button) => {
  const template = challengeTemplate.content.cloneNode(true);
  button = template.querySelector(".sidescroll__btn");

  button.addEventListener("click", () => {
    console.log("button pressed");
    bookingContainer.style.display = "block";
    bookingContainer.classList.add("grow-in");
    document.querySelector(".body").style.overflow = "hidden";
  });
});*/

//making a function that helps me close down the modal and enable scroll on the website once again.
function escapeBooking() {
  console.log("key pressed");
  bookingContainer.style.display = "none";
  document.querySelector(".body").style.overflow = "scroll";
}

//adding an forEach so that every button theres an eventlistener.

//Making sure you can close the open modal with the esc butto
document.body.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    escapeBooking();
  }
});

//Adding eventlistener which takes you from first step to second step.
bookingButtonOne.addEventListener("click", () => {
  document
    .querySelector(".booking-container__step-one")
    .classList.add("invisible");
  document
    .querySelector(".booking-container__step-two")
    .classList.remove("invisible");

  document.querySelector(".second-step").classList.add("fade-in");
  document
    .querySelector(".booking-container__submit-button")
    .classList.add("fade-in");
});

//Adding eventlistener which takes you from the second step to the final step (Thank you)

submitBookingButton.addEventListener("click", () => {
  document
    .querySelector(".booking-container__step-two")
    .classList.add("invisible");
  document
    .querySelector(".booking-container__step-three")
    .classList.remove("invisible");
  document
    .querySelector(".booking-container__step-three")
    .classList.add("fade-in");
});
