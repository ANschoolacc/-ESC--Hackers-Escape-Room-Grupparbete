const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
const data = await res.json();
export const challenges = data.challenges;
if(window.location.pathname === '/ourChallenges.html') {
    const container = document.querySelector('.ourChallenges')
    renderChallenges(container)
}

export function renderChallenges(container, amount) {
    let challengesToRender
    if(amount) {
        challengesToRender = challenges.splice(0, amount)
    } else {
        challengesToRender = challenges
    }
    const challengeTemplate = document.getElementById('card-template')
    challengesToRender.forEach(challenge => {
        const template = challengeTemplate.content.cloneNode(true)
        const card = template.querySelector('article');
        const image = template.querySelector('.sidescroll__img');
        const h2 = template.querySelector('h2');
        const rating = template.querySelector('.sidescroll__rating');
        const participans = template.querySelector('.sidescroll__participants');
        const description = template.querySelector('.sidescroll__text');
        const button = template.querySelector('.sidescroll__btn')
        button.textContent = challenge.type === 'online' ? 'Take challenge online' : 'Book this room'
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