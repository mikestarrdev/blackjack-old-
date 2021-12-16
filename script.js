'use strict';

// displays class .card from html
const playerCard1El = document.getElementById('player-1');
const playerCard2El = document.getElementById('player-2');
const playerCard3El = document.getElementById('player-3');
const playerCard4El = document.getElementById('player-4');
const playerCard5El = document.getElementById('player-5');
const playerCard6El = document.getElementById('player-6');

const dealerCard1El = document.getElementById('dealer-1');
const dealerCard2El = document.getElementById('dealer-2');
// fix this
let dealerCard2Front;
const dealerCard3El = document.getElementById('dealer-3');
const dealerCard4El = document.getElementById('dealer-4');
const dealerCard5El = document.getElementById('dealer-5');
const dealerCard6El = document.getElementById('dealer-6');

const hitBtnEl = document.querySelector('.btn--hit');
const standBtnEl = document.querySelector('.btn--stand');

const playerTotalScoreEl = document.querySelector('#score--player');
const dealerTotalScoreEl = document.querySelector('#score--dealer');

// add +1 to currentCardIdPlayer to incrementally modify playerCard${currentCardId} objects
let currentCardIdPlayer = 0;
let currentCardIdDealer = 0;
// arrays containing sum of cards
// Clear arrays when game resets

// cards arrays hold cards for each game
let cardsPlayer = [];
let cardsDealer = [];
// total score arrays hold scores until page is reloaded
let totalScorePlayer = 0;
let totalScoreDealer = 0;
let scoreCounterPlayer = 0;
let scoreCounterDealer = 0;
let winner;
let acesInput;
let isAce;

// cardDeck contains data for cards
const cardDeck = {
  1: [10, 'cards/10_of_clubs.png'],
  2: [10, 'cards/10_of_diamonds.png'],
  3: [10, 'cards/10_of_hearts.png'],
  4: [10, 'cards/10_of_spades.png'],
  5: [2, 'cards/2_of_clubs.png'],
  6: [2, 'cards/2_of_diamonds.png'],
  7: [2, 'cards/2_of_hearts.png'],
  8: [2, 'cards/2_of_spades.png'],
  9: [3, 'cards/3_of_clubs.png'],
  10: [3, 'cards/3_of_diamonds.png'],
  11: [3, 'cards/3_of_hearts.png'],
  12: [3, 'cards/3_of_spades.png'],
  13: [4, 'cards/4_of_clubs.png'],
  14: [4, 'cards/4_of_diamonds.png'],
  15: [4, 'cards/4_of_hearts.png'],
  16: [4, 'cards/4_of_spades.png'],
  17: [5, 'cards/5_of_clubs.png'],
  18: [5, 'cards/5_of_diamonds.png'],
  19: [5, 'cards/5_of_hearts.png'],
  20: [5, 'cards/5_of_spades.png'],
  21: [6, 'cards/6_of_clubs.png'],
  22: [6, 'cards/6_of_diamonds.png'],
  23: [6, 'cards/6_of_hearts.png'],
  24: [6, 'cards/6_of_spades.png'],
  25: [7, 'cards/7_of_clubs.png'],
  26: [7, 'cards/7_of_diamonds.png'],
  27: [7, 'cards/7_of_hearts.png'],
  28: [7, 'cards/7_of_spades.png'],
  29: [8, 'cards/8_of_clubs.png'],
  30: [8, 'cards/8_of_diamonds.png'],
  31: [8, 'cards/8_of_hearts.png'],
  32: [8, 'cards/8_of_spades.png'],
  33: [9, 'cards/9_of_clubs.png'],
  34: [9, 'cards/9_of_diamonds.png'],
  35: [9, 'cards/9_of_hearts.png'],
  36: [9, 'cards/9_of_spades.png'],
  37: ['ace', 'cards/ace_of_clubs.png'],
  38: ['ace', 'cards/ace_of_diamonds.png'],
  39: ['ace', 'cards/ace_of_hearts.png'],
  40: ['ace', 'cards/ace_of_spades.png'],
  41: [10, 'cards/jack_of_clubs.png'],
  42: [10, 'cards/jack_of_diamonds.png'],
  43: [10, 'cards/jack_of_hearts.png'],
  44: [10, 'cards/jack_of_spades.png'],
  45: [10, 'cards/king_of_clubs.png'],
  46: [10, 'cards/king_of_diamonds.png'],
  47: [10, 'cards/king_of_hearts.png'],
  48: [10, 'cards/king_of_spades.png'],
  49: [10, 'cards/queen_of_clubs.png'],
  50: [10, 'cards/queen_of_diamonds.png'],
  51: [10, 'cards/queen_of_hearts.png'],
  52: [10, 'cards/queen_of_spades.png'],
};
// cardInfo = unique ID linked to cardValue and cardPng
let cardInfo;
// cardValue is 1 - 11;
let cardValue;
// cardPng is file name
let cardPng;

// function creates a card for player
const generateNewCard = () => {
  // console.log(`generateNewCard() started`);
  cardValue = 0;
  //randon number function
  const cardNum = Math.trunc(Math.random() * (52 - 0) + 1);
  cardInfo = cardDeck[cardNum];
  cardValue = cardInfo[0];
  cardPng = cardInfo[1];
  // console.log(`cardInfo: ${cardInfo}`);
  return cardInfo;
};

// generateNewCard();

// calculates the sum of an arrays
const sumHand = scoreArray => {
  // console.log(`sumHand() started`);
  let sum = 0;
  for (let i = 0; i < scoreArray.length; i++) {
    sum += Number(scoreArray[i]);
  }
  return sum;
};

const enableHitBtn = () => {
  hitBtnEl.classList.remove('hidden');
};

// disables hit button
const disableHitBtn = () => {
  hitBtnEl.classList.add('hidden');
};

const standHitBtn = () => {
  standBtnEl.classList.remove('hidden');
};

// disables hit button
const disableStandBtn = () => {
  standBtnEl.classList.add('hidden');
};

// use this to calculate total score
const calculateTotalScore = () => {};

// function flips over dealer's card after game ends
const flipDealerCards = () => {
  for (let i = 1; i <= cardsDealer.length; i++) {
    switch (i) {
      case 2:
        dealerCard2El.classList.remove('hidden');
        dealerCard2El.src = dealerCard2Front;
        break;
      case 3:
        dealerCard3El.classList.remove('hidden');
        break;
      case 4:
        dealerCard4El.classList.remove('hidden');
        break;
      case 5:
        dealerCard5El.classList.remove('hidden');
        break;
      case 6:
        dealerCard6El.classList.remove('hidden');
        break;
    }
  }
};

// call function when winner is declared
const winnerDeclared = () => {
  // console.log(`winnerDeclared() started`);
  if (winner === 'player') {
    flipDealerCards();
    alert('You win this round! Congratulations! 🎉');
    totalScorePlayer++;
    playerTotalScoreEl.textContent = totalScorePlayer;
    disableStandBtn();
  } // if user dealt blackjack, increase score by 2
  else if (winner === 'player-blackjack') {
    flipDealerCards();
    alert(`Blackjack! You win this round! Congratulations! 🎉`);
    totalScorePlayer += 2;
    playerTotalScoreEl.textContent = totalScorePlayer;
  } else if (winner === 'dealer') {
    flipDealerCards();
    alert('Dealer wins, you lose... Better luck next round! ♠️');
    totalScoreDealer++;
    dealerTotalScoreEl.textContent = totalScoreDealer;
    disableStandBtn();
  } else if (winner === 'draw') {
    flipDealerCards();
    alert(`It's a draw! No winner! 🤝`);
    disableStandBtn();
  }
};

// logic for winner is only used for player
const winnerLogic = () => {
  // console.log(`player stands. WinnerLogic() started`);
  let playerScore = sumHand(cardsPlayer);
  let dealerScore = sumHand(cardsDealer);

  playerScore;
  dealerScore;

  // player blackjack logic
  if (cardsPlayer.length === 2 && playerScore === 21) {
    winner = 'player-blackjack';
    winnerDeclared();
  } // if dealer has blackjack and user doesn't
  else if (cardsDealer.length === 2 && dealerScore === 21) {
    if (!cardsPlayer.length === 2 && !playerScore === 21) {
      winner = 'player-blackjack';
      winnerDeclared();
    }
  } else if (dealerScore === 21 && playerScore !== 21) {
    winner = 'dealer';
    winnerDeclared();
  } else if (playerScore === 21 && dealerScore !== 21) {
    winner = 'player';
    winnerDeclared();
  } else if (dealerScore > 21 && playerScore <= 21) {
    winner = 'player';
    winnerDeclared();
  } else if (playerScore > 21 && dealerScore <= 21) {
    winner = 'dealer';
    winnerDeclared();
  } else if (dealerScore === 21 && playerScore === 21) {
    winner = 'player';
    winnerDeclared();
  } else if (dealerScore < 21 && playerScore > 21) {
    winner = 'dealer';
    winnerDeclared();
  } else if (playerScore > dealerScore) {
    if (playerScore <= 21) {
      winner = 'player';
      winnerDeclared();
    } else {
      winner = 'dealer';
      winnerDeclared();
    }
  } else if (dealerScore > playerScore && dealerScore <= 21) {
    winner = 'dealer';
    winnerDeclared();
  } else if (dealerScore === playerScore && playerScore != 21) {
    winner = 'draw';
    // console.log(`draw declared`);
    winnerDeclared();
  }
  return winner;
};

// function pushes 1 card to player. If cardsPlayer array already has card, function runs again until card is new
const pushCardToPlayer = () => {
  // console.log(`pushCardToPlayer() started`);
  generateNewCard();
  // console.log(`cardInfo: ${cardInfo}`);
  // if statement evaluates duplicates
  if (cardsPlayer.includes(cardPng) || cardsDealer.includes(cardPng)) {
    // re-run function if duplicate card dealt
    // console.log(`card is dupe. Restarting pushCardToPlayer()`);
    pushCardToPlayer();
  } else {
    // console.log(`pushing card to cardsPlayer array`);
    cardsPlayer.push(cardValue);
    console.log(`player cardValue: [${cardValue}]`);
    currentCardIdPlayer++;
    switch (currentCardIdPlayer) {
      case 1:
        playerCard1El.src = cardPng;
        playerCard1El.classList.remove('hidden');
        break;
      case 2:
        playerCard2El.src = cardPng;
        playerCard2El.classList.remove('hidden');
        break;
      case 3:
        playerCard3El.src = cardPng;
        playerCard3El.classList.remove('hidden');
        break;
      case 4:
        playerCard4El.src = cardPng;
        playerCard4El.classList.remove('hidden');
        break;
      case 5:
        playerCard5El.src = cardPng;
        playerCard5El.classList.remove('hidden');
        break;
      case 6:
        playerCard6El.src = cardPng;
        playerCard6El.classList.remove('hidden');
        break;
    }
  }
};

const dealerCardReveal = () => {
  currentCardIdDealer++;
  switch (currentCardIdDealer) {
    case 1:
      dealerCard1El.src = cardPng;
      dealerCard1El.classList.remove('hidden');
      break;
    case 2:
      dealerCard2El.src = 'cards/back.png';
      dealerCard2Front = cardPng;
      break;
    case 3:
      dealerCard3El.src = cardPng;
      break;
    case 4:
      dealerCard4El.src = cardPng;
      break;
    case 5:
      dealerCard5El.src = cardPng;
      break;
    case 6:
      dealerCard6El.src = cardPng;
      break;
  }
};
// function deals 1 new card to dealer. If cardsDealer array already has card, function runs again until card is new. If card is ace, it gets set to 1 or 11
const pushCardToDealer = () => {
  // console.log(`pushCardToDealer() started`);
  generateNewCard();
  // cardsDealer.push(cardValue);
  // evaluates if card has been dealt already
  if (cardsPlayer.includes(cardPng) || cardsDealer.includes(cardPng)) {
    // if card has been dealt, run function again
    pushCardToDealer();
  } else if (cardValue === 'ace') {
    if (sumHand(cardsDealer) <= 10) {
      dealerCardReveal();
      cardValue = 11;
      //change last value in cardsDealer array so cardValue = 11 instead of ace
      // cardsDealer[cardsDealer.length - 1] = cardValue;
      // console.log(`pushing ace (value 11) to dealer`);
      cardsDealer.push(cardValue);
    } else if (sumHand(cardsDealer) >= 11) {
      dealerCardReveal();
      cardValue = 1;
      // console.log(`pushing ace (value 1) to dealer`);
      cardsDealer.push(cardValue);
    }
  } else {
    // console.log(`pushing card to dealer`);
    cardsDealer.push(cardValue);
    dealerCardReveal();
    // console.log(`dealer cardValue: [${cardValue}]`);
  }
};

// function initiates new game
const newGame = () => {
  // console.log(`NewGame() started`);
  // clears arrays
  winner = 'none';
  cardsPlayer = [];
  cardsDealer = [];

  currentCardIdPlayer = 0;
  currentCardIdDealer = 0;
  // reset card images
  playerCard1El.src = 'cards/back.png';
  playerCard2El.src = 'cards/back.png';
  playerCard2El.classList.add('hidden');
  playerCard3El.classList.add('hidden');
  playerCard4El.classList.add('hidden');
  playerCard5El.classList.add('hidden');
  playerCard6El.classList.add('hidden');

  dealerCard1El.src = 'cards/back.png';
  dealerCard2El.src = 'cards/back.png';
  dealerCard3El.classList.add('hidden');
  dealerCard4El.classList.add('hidden');
  dealerCard5El.classList.add('hidden');
  dealerCard6El.classList.add('hidden');

  // Deal 2 cards to player and dealer
  pushCardToPlayer();
  pushCardToDealer();
  pushCardToPlayer();
  pushCardToDealer();

  enableHitBtn();
  standHitBtn();

  console.log(`player =  [${cardsPlayer}]`);
  console.log(`dealer =  [${cardsDealer}]`);
};

const hit = () => {
  // console.log(`hit() started`);
  pushCardToPlayer();
};

// function lets user change 'ace' to 11 or 1
const changeAce = () => {
  console.log(`starting changeAce()`);
  // loop over cardsPlayer array
  for (let isAce = 0; isAce < cardsPlayer.length; isAce++) {
    // change if card is 1 or 11
    if (
      cardsPlayer[isAce] === 11 ||
      cardsPlayer[isAce] === 1 ||
      cardsPlayer[isAce] === 'ace'
    ) {
      let usrInput = () => {
        acesInput = prompt(
          "You've been dealt an Ace! Select it's value as 1 or 11"
        );
        if (acesInput == '1' || acesInput == '11') {
          // next line takes user input
          // console.log(`acesInput = ${acesInput}. Replacing`);
          // console.log(`isAce = ${isAce}`);
          cardsPlayer[isAce] = Number(acesInput);
          // console.log(cardsPlayer);
        } else {
          console.log(
            `You must enter 1 or 11 to continue. (re-running changeAce())`
          );
          // re-run function until user enters 1 or 11
          usrInput();
        }
      };
      usrInput();
    }
  }
};

// user chooses to stand when satisfied with cards
const stand = () => {
  // console.log(`stand() started`);
  // changeAce() allows user to reassign value to cards
  changeAce();
  // hide hit buttun until newGame() started
  disableHitBtn();
  // if dealer's hand is < 17, will keep being dealt new cards
  if (sumHand(cardsDealer) <= 16) {
    // console.log(`dealers hand < 16 (${cardsDealer}), dealing new card`);
    pushCardToDealer();
    // if hand is still <= 16, run logic again
    if (sumHand(cardsDealer) <= 16) {
      // console.log(`dealers hand < 16 (${cardsDealer}), dealing new card`);
      pushCardToDealer();
    }
    winnerLogic();
    // dealers hand > 16, run winnerLogic()
  } else if (sumHand(cardsDealer) >= 17) {
    // console.log(`dealers hand >= 17 (${cardsDealer}). Running winnerLogic`);
    winnerLogic();
  }
};
