/*När användaren klickar på “Book room” ska en ruta öppnas över allt annat, rutans innehåll byts ut i tre steg
I första steget visas en input där användaren kan välja ett datum, samt en knapp för att gå vidare. När användaren går vidare ska ett anrop göras till API för att se vilka tider som finns lediga det angivna datumet

I andra steget visas inputs för namn och e-post, samt två rullgardinsmenyer. I den första ska användaren kunna välja de tider som fanns tillgängliga, och i den andra hur många deltagare som ska medverka. Alternativen ska motsvara den data som hämtats från API. Slutligen även en knapp för att gå vidare.

När användaren går vidare ska ett tackmeddelande visas, samt möjlighet att stänga ned rutan och återgå till listan över utmaningar
Bokningen ska kunna öppnas både från startsidan och från den nya sidan, d.v.s. på båda de platser där rum finns. */

// Here im going to do the script for the booking-section
//Import challenges function from fetchchallenges.js
import { challenges } from "./fetchChallenges.js";

//Declaring global variables containing html elements
const bookingContainer = document.querySelector(".booking-container");

const bookingButtonOne = document.querySelector(".booking-container__button");

const submitBookingButton = document.querySelector(
  ".booking-container__submit-button"
);

const challengeTemplate = document.getElementById("card-template");

//Function that fetches data from api
async function fetchData(url) {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(
      `Something went wrong with the request. Error code: ${response.status} ${response.statusText}`
    );
  }
}
//Declaring empty global variables
let cardId;

let dateApi;
//Declaring variable and puts an array of all .sidescroll__btn inside
let bookingBtn = document.querySelectorAll(".sidescroll__btn");
//for loop that loops through bookingBtn array length
for (let i = 0; i < bookingBtn.length; i++) {
  // eventlistener that reacts to booking button on each card
  bookingBtn[i].addEventListener("click", () => {
    //If statement that returns function if innertext of button is wrong
    if (bookingBtn[i].innerText === "Take challenge online") {
      return;
    }
    //sets value of cardId to clicked .sideScroll__btn parent id
    cardId = bookingBtn[i].parentElement.id;
    //Changes style of element and adds class
    bookingContainer.style.display = "block";
    bookingContainer.classList.add("grow-in");
    //Changes style of element and removes class
    document.querySelector(".body").style.overflow = "hidden";
    document
      .querySelector(".booking-container__step-one")
      .classList.remove("invisible");
    //For loop that creates 30 dates starting from todays date and forward
    for (let i = 0; i < 30; i++) {
      const today = new Date();
      const comingDays = new Date(today);
      comingDays.setDate(today.getDate() + i);
      //Adds each date as option in booking-container__date
      const dateOption = document.createElement("option");
      dateOption.classList.add("booking-container__date");
      dateOption.innerText = comingDays.toISOString().split("T")[0];
      document
        .querySelector(".booking-container__dateInput")
        .appendChild(dateOption);
    }
  });
}
//Eventlistener function that reacts to click on "search available times" button
bookingButtonOne.addEventListener("click", async () => {
  //Adds and removes classes of elements
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
  //Sets variable value to the userinput of .booking-container__dateInput
  let dateInput = document.querySelector(".booking-container__dateInput").value;
  /*Adds variables into url and runs function fetchData then 
puts return value into dateApi variable*/
  dateApi = await fetchData(
    `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${dateInput}&challenge=${cardId}`
  );
  console.log(cardId);
  console.log(dateApi.slots);
  console.log(dateApi.date);
});

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

//Function to sort through challenges array
/*challenges.forEach((obj) => console.log(obj.id));

  challenges.forEach((obj) => {
  const challengeIds = obj.id.toString();
  console.log(challengeIds);*/

//making a function that helps me close down the modal and enable scroll on the website once again.
function escapeBooking() {
  bookingContainer.style.display = "none";
  document.querySelector(".body").style.overflow = "scroll";

  document
    .querySelector(".booking-container__step-one")
    .classList.add("invisible");
  document
    .querySelector(".booking-container__step-two")
    .classList.add("invisible");
  document
    .querySelector(".booking-container__step-three")
    .classList.add("invisible");

  document
    .querySelectorAll(".booking-container__date")
    .forEach((element) => element.remove());
}

//Making sure you can close the open modal with the esc butto
document.body.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    escapeBooking();
  }
});
