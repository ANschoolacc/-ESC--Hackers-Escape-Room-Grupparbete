//Getting DOM elements to be used globally
const onlineCheckbox = document.querySelector('.filter__onlineCheckbox');
const onSiteCheckbox = document.querySelector('.filter__onSiteCheckbox');
const tagButtons = document.querySelectorAll('.filter__tagButton');

//Event listeners for the filter options
onlineCheckbox.addEventListener('change', filterData);
onSiteCheckbox.addEventListener('change', filterData);
tagButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('filter__tagButton--selected');
        filterData();
    });
});

//filter function by type (Alex)
function byType() {
}

//filter function by tag (Alex)
function byTag() {
}

//filter function by rating (Fredrick)
function byRating() { 
}

//filter function by keyword search (Fredrick)
function byKeyword() {
}

//function that calls all the other filter functions that is run everytime the user clicks on any filter option (Alex)
function filterData() {
    let filteredData = arrayn; //need to change this to the array that contains all the cards
    filteredData = byType(filteredData);
    filteredData = byRating(filteredData);
    filteredData = byTag(filteredData);
    filteredData = byKeyword(filteredData);
    return filteredData;
}

//filteredData needs to be used do create the cards that are displayed on the page (Max and Albin)

/*Need to create a function that resets the filter options to default, showing all the cards(Alex and Fredrick)
(All checkboxes checked, all buttons unselected rating set to 1/5 to 5/5 stars and input field empty)
This function should be connected to the close button of the filterbox.
*/
