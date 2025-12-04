const icons = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝'];

let cardArray = [...icons, ...icons].sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById('game-board');

cardArray.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    gameBoard.appendChild(card);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;

gameBoard.addEventListener('click', event => {
    const clickedCard = event.target;

    if (!clickedCard.classList.contains('card')) return;
    if (lockBoard) return;
    if (clickedCard === firstCard) return;

    flipCard(clickedCard);

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        checkMatch();
    }
});

function flipCard(card) {
    card.classList.add('flipped');
    card.textContent = card.dataset.icon;
}

function checkMatch() {
    lockBoard = true;

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        matchCards();
    } else {
        unflipCards();
    }
}

function matchCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetTurn();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = "";
        secondCard.textContent = "";
        resetTurn();
    }, 900);
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}