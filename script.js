'use strict';
//Selecting Elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let displayWinner = document.querySelector('.displayWinner');

const diceEl = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, playingGame;

function initialState(){
    currentScore = 0;
    activePlayer = 0;
    playingGame = true;
    scores = [0,0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    displayWinner.classList.add('hidden');
}

initialState();

let diceRoll;
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore=0;
        activePlayer = activePlayer===0?1:0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click',function(){
    if (playingGame) {
    diceRoll = (Math.trunc(Math.random()*6))+1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`
    if(diceRoll!==1){
        currentScore += diceRoll;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore; //Change later 
    }
    else{
        switchPlayer();
    }
}
});
//event handler function for hold button
btnHold.addEventListener('click',function(){
    if (playingGame){
    //add currentscore to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent=0;

    //check whether the total score>100 and finish game
    if(scores[activePlayer]>=20){
        playingGame = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        diceEl.classList.add('hidden');
        displayWinner.classList.remove('hidden');
    }
    //or switch player
    else{
    switchPlayer();
    }
}
})
btnNew.addEventListener('click', initialState);








