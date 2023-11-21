/*När användaren klickar på “Book room” ska en ruta öppnas över allt annat, rutans innehåll byts ut i tre steg
I första steget visas en input där användaren kan välja ett datum, samt en knapp för att gå vidare. När användaren går vidare ska ett anrop göras till API för att se vilka tider som finns lediga det angivna datumet

I andra steget visas inputs för namn och e-post, samt två rullgardinsmenyer. I den första ska användaren kunna välja de tider som fanns tillgängliga, och i den andra hur många deltagare som ska medverka. Alternativen ska motsvara den data som hämtats från API. Slutligen även en knapp för att gå vidare.

När användaren går vidare ska ett tackmeddelande visas, samt möjlighet att stänga ned rutan och återgå till listan över utmaningar
Bokningen ska kunna öppnas både från startsidan och från den nya sidan, d.v.s. på båda de platser där rum finns. */

// Here im going to do the script for the booking-section
//Import challenges function from fetchchallenges.js
import { challenges } from "./fetchChallenges.js";
/*Import renderchallenges function from fetchchallenges.js*/
import { renderChallenges } from "./fetchChallenges.js";

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
/*Fetch Dates api */
console.log(challenges);

/*challenges.forEach((obj) => console.log(obj.id));*/

challenges.forEach((obj) => {
    const challengeIds = obj.id.toString();
    console.log(challengeIds);

    async function fetchDatesApi() {
        const res = await fetch(
            `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${inputDate}&challenge=${challengeIds}`
        );
        const data = await res.json();
        return data;

        console.log(fetchDatesApi());
    }
});

for (let i = 0; i < 30; i++) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + i);
    console.log(tomorrow.toISOString().split("T")[0]);
}

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

        //Getting the right challenge and id
        const challenge = challenges[i];
        booking.challenge = i;
        // function for creating participants
        getMaxAndMinParticipants(challenge);
        //function for making the titles correct
        makeTitleForBooking(challenge);
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
    let dateInput = document.querySelector(
        ".booking-container__dateInput"
    ).value;
    /*Adds variables into url and runs function fetchData then 
puts return value into dateApi variable*/
    dateApi = await fetchData(
        `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${dateInput}&challenge=${cardId}`
    );

    //giving the date key the correct value.
    booking.date = dateInput;

    console.log(cardId);
    console.log(dateApi.slots);
    console.log(dateApi.date);

    createAvailableTimes(dateApi);
});

submitBookingButton.addEventListener("click", async () => {
    document
        .querySelector(".booking-container__step-two")
        .classList.add("invisible");
    document
        .querySelector(".booking-container__step-three")
        .classList.remove("invisible");
    document
        .querySelector(".booking-container__step-three")
        .classList.add("fade-in");

    // getting the values from the different inputs into the object.

    booking.name = nameInput.value;
    booking.email = emailInput.value;
    booking.participants = parseInt(particiSelect.value);
    booking.time = timeInput.value;

    console.log(booking);

    const res = await fetch(
        "https://lernia-sjj-assignments.vercel.app/api/booking/reservations",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        }
    );
    const dataBooking = await res.json();
    console.log(dataBooking);
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

//section for later usage

const nameInput = document.querySelector(".booking-container__name-input");
const emailInput = document.querySelector(".booking-container__e-mail-input");
const particiSelect = document.querySelector(".participants");
const timeInput = document.querySelector(".time");
//creating obj for the booking request
const booking = {};

//Creating a function that creates option for the participant selector.
const createParticipants = function (minPar, maxPar) {
    for (let i = minPar; i <= maxPar; i++) {
        const participantOption = document.createElement("option");
        participantOption.classList.add("particiOption");
        participantOption.value = i;
        participantOption.innerText = i;
        particiSelect.appendChild(participantOption);
        console.log(participantOption.value);
    }
};

function makeTitleForBooking(obj) {
    const titleOfChallenge = obj.title;
    const titleOfBooking = document.querySelector(".booking-container__title");
    const secondTitle = document.querySelector(".title-two");
    secondTitle.innerText = `Book room ${titleOfChallenge} (step 2)`;
    titleOfBooking.innerText = `Book room ${titleOfChallenge} (step 1)`;
}

//Function that first gets max and min numbers then also creats options with every number in that span for the select.
function getMaxAndMinParticipants(obj) {
    const maxParticipants = obj.maxParticipants;
    const minParticipants = obj.minParticipants;

    createParticipants(minParticipants, maxParticipants);
}

//function that creats the available times
function createAvailableTimes(obj) {
    for (let i = 0; i < obj.slots.length; i++) {
        const timeSelect = document.querySelector(".time");
        const timeOption = document.createElement("option");
        timeOption.innerText = obj.slots[i];
        timeSelect.appendChild(timeOption);
    }
}
