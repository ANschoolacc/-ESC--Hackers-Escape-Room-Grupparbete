const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
const data = await res.json();
export const challenges = data.challenges;
if(window.location.pathname.includes('ourChallenges')) {
    const container = document.querySelector('.ourChallenges')
    renderChallenges(container)
}

export function renderChallenges(container, threeHighest) {
    let challengesToRender
    if(threeHighest) {
        challengesToRender = challenges.sort((a, b) => b.rating - a.rating).slice(0, 3);
    } else {
        challengesToRender = challenges
    }
    const challengeTemplate = document.getElementById('card-template')
    challengesToRender.forEach(challenge => {
        const template = challengeTemplate.content.cloneNode(true)
        const card = template.querySelector('article');
        const image = template.querySelector('.sidescroll__img');
        const icon = template.querySelector('.sidescroll__icon');
        const h2 = template.querySelector('h2');
        const rating = template.querySelector('.sidescroll__rating');
        const participans = template.querySelector('.sidescroll__participants');
        const description = template.querySelector('.sidescroll__text');
        const button = template.querySelector('.sidescroll__btn')
        button.textContent = challenge.type === 'online' ? 'Take challenge online' : 'Book this room'
        icon.classList.add(challenge.type === 'online' ? 'fa-house' : 'fa-laptop');
        card.id = challenge.id
        image.src = challenge.image // `${challenge.image}?image=${Math.floor(Math.random() * 16)}` to make image random
        h2.textContent = challenge.title;
        participans.textContent = challenge.minParticipants === challenge.maxParticipants ? `${challenge.minParticipants} participants` : `${challenge.minParticipants}-${challenge.maxParticipants} participants`
        description.textContent = challenge.description;
        createStars(rating.firstElementChild, challenge.rating)
        container.appendChild(template)
    })
}

function createStars(parent, rating) {
    for (let i = 0; i < 5; i++) {
        const iTag = document.createElement('i');
        iTag.classList.add('fa-star', 'star');
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