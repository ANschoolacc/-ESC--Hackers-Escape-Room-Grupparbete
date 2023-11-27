import { challenges } from "./fetchChallenges.js";

let tagButtons;

//Getting DOM elements to be used globally
const onlineCheckbox = document.querySelector(".filter__onlineCheckbox");
const onSiteCheckbox = document.querySelector(".filter__onSiteCheckbox");

//Getting search params from URL
const searchParams = new URL(document.location).searchParams;
onlineCheckbox.checked = searchParams.get("online") !== "false";
onSiteCheckbox.checked = searchParams.get("onsite") !== "false";

//Event listeners for the filter options
onlineCheckbox.addEventListener("change", () => {
    setSearchParams(`online, ${onlineCheckbox.checked}`);
    filterData(challenges);
});
onSiteCheckbox.addEventListener("change", () => {
    filterData(challenges);
    setSearchParams(`onsite, ${onSiteCheckbox.checked}`);
});

/*
This function, getAllLabels, is used to extract all unique labels from an array of challenges. 
It takes an array, challenges, as an argument. 
The function uses the reduce method to iterate over each challenge in the array. For each challenge, it further iterates over each label in the challenge's labels array.
If a label is not already included in the uniqueLabels array, it is added. This ensures that each label only appears once in the uniqueLabels array, even if it appears multiple times in the challenges array.
Finally, the function returns the uniqueLabels array, which contains all unique labels from the challenges array.
*/
function getAllLabels(challenges) {
    return challenges.reduce((uniqueLabels, challenge) => {
        challenge.labels.forEach((label) => {
            if (!uniqueLabels.includes(label)) {
                uniqueLabels.push(label);
            }
        });
        return uniqueLabels;
    }, []);
}

/*
This function, createButtonsForLabels, creates a button for each label in the provided array and appends them to a container in the DOM. 
It takes an array, labels, as an argument. 
For each label in the array, it creates a new button element, sets its text content to the label, adds a CSS class for styling, and appends it to the container. 
After creating all the buttons, it selects them from the DOM and assigns them to the global variable 'tagButtons'. 
Finally, it calls the 'addEventListenersToButtons' function, passing 'tagButtons' as an argument.
*/
function createButtonsForLabels(labels) {
    const buttonsContainer = document.querySelector(".filter__filterByTags");

    labels.forEach((label) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.classList.add("filter__tagButton");
        buttonsContainer.appendChild(button);
    });

    tagButtons = document.querySelectorAll(".filter__tagButton");
    addEventListenersToButtons(tagButtons);
}

/*
This function, addEventListenersToButtons, adds click event listeners to an array of button elements.
It takes an array, tagButtons, as an argument.
For each button in the array, it adds a click event listener. 
When a button is clicked, the event listener triggers a series of functions to filter the displayed challenges based on the selected tags.
*/
function addEventListenersToButtons(tagButtons) {
    tagButtons.forEach((button) => {
        searchParams.forEach((value, key) => {
            if (key === "tags") {
                if (value.includes(button.innerHTML.toLowerCase())) {
                    button.classList.add("filter__tagButton--selected");
                }
            }
        });

        button.addEventListener("click", () => {
            button.classList.toggle("filter__tagButton--selected");
            filterData(challenges);
            setSearchParams(
                `tags, ${[...document.querySelectorAll(".filter__tagButton--selected")].map(
                    (button) => button.innerHTML.toLowerCase()
                )}`
            );
        });
    });
}

const uniqueLabels = getAllLabels(challenges);
createButtonsForLabels(uniqueLabels);

//Filter challenges on page load if search params exist
if (searchParams.size > 0) {
    filterData(challenges);
}

function setSearchParams(str) {
    const searchParams = new URLSearchParams(window.location.search);
    const [key, value] = str.split(", ");
    searchParams.set(key, value);
    const entries = [...searchParams.entries()];
    entries.forEach(([key, value]) => {
        if (!value || value === "true") {
            searchParams.delete(key);
        }
    });
    const newRelativePath =
        searchParams.toString().length > 0
            ? window.location.pathname + "?" + searchParams.toString()
            : window.location.pathname;
    history.pushState(null, "", newRelativePath);
}

/*
This function, byType, is used to filter an array of challenges based on their type (online or on-site). 
It takes an array, filteredData, as an argument. 
If both the online and on-site checkboxes are checked, it resets filteredData to the original list of challenges. 
If only the online checkbox is checked, it filters out the on-site challenges. 
If only the on-site checkbox is checked, it filters out the online challenges. 
If neither checkbox is checked, it sets filteredData to an empty array. 
Finally, it returns the filtered list of challenges.
*/
function byType(filteredData) {
    if (onlineCheckbox.checked && onSiteCheckbox.checked) {
        filteredData = challenges;
    } else if (onlineCheckbox.checked && !onSiteCheckbox.checked) {
        filteredData = challenges.filter((challenge) => challenge.type !== "onsite");
    } else if (onSiteCheckbox.checked && !onlineCheckbox.checked) {
        filteredData = challenges.filter((challenge) => challenge.type !== "online");
    } else {
        filteredData = [];
    }
    return filteredData;
}

/*
This function, byTag, is used to filter an array of challenges based on their tags. 
It takes an array, filteredData, as an argument. 
First, it creates an array, selectedButtons, to store any tag buttons that have been selected by the user. 
It then iterates over all the tag buttons, and if a button has been selected (indicated by the 'filter__tagButton--selected' class), it adds that button to the selectedButtons array.
If no buttons have been selected, it returns the original filteredData array without making any changes.
If one or more buttons have been selected, it creates a new array, selectedTags, that contains the text of each selected button in lowercase. 
It then filters the filteredData array to include only challenges whose labels include all of the selected tags. 
Finally, it returns the newly filtered list of challenges.
*/
function byTag(filteredData) {
    const selectedButtons = [];
    tagButtons.forEach((button) => {
        if (button.classList.contains("filter__tagButton--selected")) {
            selectedButtons.push(button);
        }
    });

    if (selectedButtons.length === 0) {
        return filteredData;
    }

    const selectedTags = selectedButtons.map((button) => button.innerHTML.toLowerCase());
    filteredData = filteredData.filter((challenge) =>
        selectedTags.every((tag) => challenge.labels.includes(tag))
    );

    return filteredData;
}

//filter function by rating (Fredrick)
function byRating(filteredData) {
    return filteredData;
}

//filter function by keyword search (Fredrick)
function byKeyword(filteredData) {
    return filteredData;
}

/*
This function, filterData, is used to filter an array of challenges based on various criteria: type, rating, tag, and keyword. 
It takes an array, challenges, as an argument. 
First, it assigns the original challenges array to a new variable, filteredData. 
Then, it sequentially applies each filter function to the filteredData array:
Each filter function modifies the filteredData array in place, so the order of the filters matters. 
Finally, it calls the renderFilteredCards function with the fully filtered data. This function is responsible for updating the UI to display only the challenges that meet all the selected criteria.
*/
function filterData(challenges) {
    let filteredData = challenges;
    filteredData = byType(filteredData);
    filteredData = byRating(filteredData);
    filteredData = byTag(filteredData);
    filteredData = byKeyword(filteredData);
    renderFilteredCards(filteredData);
}

function renderFilteredCards(filteredData) {
    const container = [...document.querySelector(".ourChallenges").children];
    const zeroChallenges = document.querySelector(".zeroChallenges");
    container.forEach((child) => {
        if (filteredData.map((challenge) => challenge.id).includes(Number(child.id))) {
            child.style.display = "";
        } else {
            child.style.display = "none";
        }
    });
    zeroChallenges.style.display = filteredData.length === 0 ? "block" : "none";
}
