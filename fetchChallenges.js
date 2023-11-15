const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
const data = await res.json();
export const challengesArray = [];
const labelsArray = [];

data.challenges.forEach(challenge => {
    challengesArray.push({ ...challenge, online: challenge.type === 'online' ? true : false })
    challenge.labels.forEach(label => {
        if (!labelsArray.includes(label)) {
            labelsArray.push(label)
        }
    })
})

renderChallenges()

function renderChallenges() {
    const challengeTemplate = document.getElementById('card-template')
    challengesArray.forEach(challenge => {
        const template = challengeTemplate.content.cloneNode(true)
        const container = document.querySelector('.ourChallenges')
        const card = template.querySelector('article');
        const image = template.querySelector('.sidescroll__img');
        const h2 = template.querySelector('h2');
        const rating = template.querySelector('.sidescroll__rating');
        const participans = template.querySelector('.sidescroll__participants');
        const description = template.querySelector('.sidescroll__text');
        const button = template.querySelector('.sidescroll__btn')
        button.textContent = challenge.online ? 'Take challenge online' : 'Book this room'
        card.id = challenge.id
        image.src = `${challenge.image}?image=${Math.floor(Math.random() * 16)}`;     
        h2.textContent = challenge.title + ' ' + challenge.type;
        participans.textContent = `${challenge.minParticipants}-${challenge.maxParticipants} participants`
        description.textContent = challenge.description;
        createStars(rating.firstElementChild, challenge.rating)
        container.appendChild(template)
    })
}

function createStars(parent, rating) {
    for (let i = 0; i < 5; i++) {
        const iTag = document.createElement('i');
        iTag.classList.add('fa-star');
        if (checkHalfStar(rating, i)) {
            iTag.classList = 'fa-solid fa-star-half-stroke'
            parent.appendChild(iTag);
            continue
        }
        i < rating ? iTag.classList.add('fa-solid') : iTag.classList.add('fa-regular')
        parent.appendChild(iTag);
    }
}

function checkHalfStar(rating, i) {
    return (rating.toString().includes('.') && (i + 0.5 === rating))
}

function renderLabels() {
    if (labelsArray.length === 0) return
    labelsArray.forEach(label => {
        const li = document.createElement('li')
        li.textContent = label.charAt(0).toUpperCase() + label.slice(1);
        li.addEventListener('click', () => {
            li.classList.toggle('selected');
            if (currentFilters.tags.includes(label)) {
                currentFilters.tags.splice(currentFilters.tags.indexOf(label), 1)
            } else {
                currentFilters.tags.push(label)
            }
            filterChallenges();
            setSearchParams('tags');
        })
        tagsContainer.appendChild(li)
    })
}