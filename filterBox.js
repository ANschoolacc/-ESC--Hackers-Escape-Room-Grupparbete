import { challengesArray as challenges } from './fetchChallenges.js';

//Getting DOM elements to be used globally
const onlineCheckbox = document.querySelector('.filter__onlineCheckbox');
const onSiteCheckbox = document.querySelector('.filter__onSiteCheckbox');
const tagButtons = document.querySelectorAll('.filter__tagButton');

//Event listeners for the filter options
onlineCheckbox.addEventListener('change', () => filterData(challenges));
onSiteCheckbox.addEventListener('change', () => filterData(challenges));
tagButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('filter__tagButton--selected');
        filterData(challenges);
    });
});

function byType(filteredData) {
    if (onlineCheckbox.checked && onSiteCheckbox.checked) {
        filteredData = challenges;
    } else if (onlineCheckbox.checked && !onSiteCheckbox.checked) {
        filteredData = challenges.filter(challenge => challenge.type !== 'onsite');
    } else if (onSiteCheckbox.checked && !onlineCheckbox.checked) {
        filteredData = challenges.filter(challenge => challenge.type !== 'online');
    } else {
        filteredData = [];
    }
    return filteredData;
}

function byTag(filteredData) {
    const selectedButtons = [];
    tagButtons.forEach(button => {
        if (button.classList.contains('filter__tagButton--selected')) {
        selectedButtons.push(button);
        }
    });

    if (selectedButtons.length === 0) {
        return filteredData;
    }

    const selectedTags = selectedButtons.map(button => button.innerHTML.toLowerCase());
    filteredData = filteredData.filter(challenge => 
        selectedTags.every(tag => challenge.labels.includes(tag))
    );

    console.log(selectedButtons);
    console.log(selectedTags);

    return filteredData;
}

//filter function by rating (Fredrick)
function byRating(filteredData) { 
    return filteredData
}

//filter function by keyword search (Fredrick)
function byKeyword(filteredData) {
    return filteredData
}

//function that calls all the other filter functions that is run everytime the user clicks on any filter option
function filterData(challenges) {
    let filteredData = challenges;
    filteredData = byType(filteredData);
    filteredData = byRating(filteredData);
    filteredData = byTag(filteredData);
    filteredData = byKeyword(filteredData);
    renderFilteredCards(filteredData)
}

function renderFilteredCards(filteredData) {
    const container = [...document.querySelector('.ourChallenges').children]
    const ids = []
    filteredData.forEach(challenge => {
        ids.push(challenge.id)
    })
    container.forEach(child => {
        if (!ids.includes(Number(child.id))) {
            child.style.display = 'none'
        } else {
            child.style.display = ''
        }
    })
}
