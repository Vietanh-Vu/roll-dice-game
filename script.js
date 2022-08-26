'use strict'

// select elements

const score0 = document.querySelector('#score--0')
const score1 = document.querySelector('#score--1')
const diceEl = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnNew = document.querySelector('.btn--new')
const btnRule = document.querySelector('.btn--rule')
const players = document.querySelectorAll('.player')
const currentScores = document.querySelectorAll('.current-score')
const modal = document.querySelector('.modal')

// initial values
let activePlayer, currentScore, score, isWin

function init () {
    activePlayer = 0
    currentScore = 0
    score = [0,0]
    isWin = false
    score0.textContent = 0 
    score1.textContent = 0 
    diceEl.classList.add('hidden')
    for (let i of players) {
        i.classList.remove('player--active')
        i.classList.remove('player--winner')
    }
    for (let i of currentScores) {
        i.textContent = 0
    }
    document.querySelector('.player--0').classList.add('player--active')
}

init()

const switchPlayer = function() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0
    currentScore = 0 
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    activePlayer = activePlayer == 0 ? 1 : 0 
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
}

// roll dice 
btnRoll.addEventListener('click', () => {
    if (isWin === false) {
        let dice = Math.floor(Math.random() * 6 + 1)
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`
        
        if (dice !== 1) {
            currentScore += dice 
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore
        } else {
            switchPlayer()
        }
    }
})

// hold button
btnHold.addEventListener('click', () => {
    if (isWin === false) {
        score[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer]
        if (score[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`)
            isWin = true
        } else {
            switchPlayer()
        }
    }
})

//2 way to play new game
btnNew.addEventListener('click', () => {
    init()
})

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        init()
    }
})

// rule button
btnRule.addEventListener('click', () => {
   modal.style.display = 'flex'
})

// 2 way to close modal rule
modal.addEventListener('click', () => {
    modal.style.display = 'none'
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = 'none'
    }
})



