import { challenges } from './fetchChallenges.js';

//Getting DOM elements to be used globally
const onlineCheckbox = document.querySelector('.filter__onlineCheckbox');
const onSiteCheckbox = document.querySelector('.filter__onSiteCheckbox');
const tagButtons = document.querySelectorAll('.filter__tagButton');

//Getting search params from URL
const searchParams = new URL(document.location).searchParams;
onlineCheckbox.checked = searchParams.get('online') !== 'false';
onSiteCheckbox.checked = searchParams.get('onsite') !== 'false'; 


//Event listeners for the filter options
onlineCheckbox.addEventListener('change', () => {
    setSearchParams(`online, ${onlineCheckbox.checked}`)
    filterData(challenges)
});
onSiteCheckbox.addEventListener('change', () => {
    filterData(challenges)
    setSearchParams(`onsite, ${onSiteCheckbox.checked}`)});
tagButtons.forEach(button => {
    searchParams.forEach((value, key) => {
        if (key === 'tags') {
            if (value.includes(button.innerHTML.toLowerCase())) {
                button.classList.add('filter__tagButton--selected');
            }
        }
    })
    button.addEventListener('click', () => {
        button.classList.toggle('filter__tagButton--selected');
        filterData(challenges);
        setSearchParams(`tags, ${[...document.querySelectorAll('.filter__tagButton--selected')].map(button => button.innerHTML.toLowerCase())}`)
    });
});

//Filter challenges on page load if search params exist
if(searchParams.size > 0) {
    filterData(challenges);
}

function setSearchParams(str) {
    const searchParams = new URLSearchParams(window.location.search)
    const [key, value] = str.split(', ')
    searchParams.set(key, value)
    const entries = [...searchParams.entries()]
    entries.forEach(([key, value]) => {
        if ((!value || value === 'true')) {
            searchParams.delete(key);
        }
      }); 
    const newRelativePath = searchParams.toString().length > 0 ? window.location.pathname + '?' + searchParams.toString() : window.location.pathname
    history.pushState(null, '', newRelativePath); 
}

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
    container.forEach(child => {
        if (filteredData.map(challenge => challenge.id).includes(Number(child.id))) {
            child.style.display = ''
        } else {
            child.style.display = 'none'
        }
    })
}