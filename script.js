// Chances of lose / Bid and balance system / Add winrate / Custom timer

// Start game in different mods buttons
const startBtn = document.getElementsByClassName("game__start-btn")[0];
const startBtn2 = document.getElementsByClassName("game__start-btn2")[0];
const startBtn3 = document.getElementsByClassName("game__start-btn3")[0];
const startBtn4 = document.getElementsByClassName("game__start-btn4")[0];
// General blocks
const gameMenu = document.getElementsByClassName("game__menu")[0];
const gameContent = document.getElementsByClassName("game__content")[0];
// Timer
const timerText = document.getElementsByClassName("game__timer-text")[0];
// Cards
const playerCardWrapper = document.getElementsByClassName("game__player-card-wrapper")[0];
const dealerCardWrapper = document.getElementsByClassName("game__dealer-card-wrapper")[0];
const gameDeck = document.getElementsByClassName("game__deck")[0];
const playerCard1 = document.getElementsByClassName("game__player-card1")[0];
const playerCard2 = document.getElementsByClassName("game__player-card2")[0];
const playerCard3 = document.getElementsByClassName("game__player-card3")[0];
const playerCard4 = document.getElementsByClassName("game__player-card4")[0];
const playerCard5 = document.getElementsByClassName("game__player-card5")[0];
const playerCard6 = document.getElementsByClassName("game__player-card6")[0];
const playerCard7 = document.getElementsByClassName("game__player-card7")[0];
const playerCard8 = document.getElementsByClassName("game__player-card8")[0];
const playerCard9 = document.getElementsByClassName("game__player-card9")[0];
const playerCard10 = document.getElementsByClassName("game__player-card10")[0];
const dealerCard1 = document.getElementsByClassName("game__dealer-card1")[0];
const dealerCard2 = document.getElementsByClassName("game__dealer-card2")[0];
const dealerCard3 = document.getElementsByClassName("game__dealer-card3")[0];
const dealerCard4 = document.getElementsByClassName("game__dealer-card4")[0];
const dealerCard5 = document.getElementsByClassName("game__dealer-card5")[0];
// Scores
const dealerGameScore = document.getElementsByClassName("game__dealer-score")[0];
const playerGameScore = document.getElementsByClassName("game__player-score")[0];
const playerGameScore2 = document.getElementsByClassName("game__player-score2")[0];
// Split hand control
const currentHandPointer = document.getElementsByClassName("pointer")[0];
const changeHandBtn = document.getElementsByClassName("next-hand")[0];
// Player pick options
const showPopUp = document.getElementsByClassName("pause")[0];
const standBtn = document.getElementsByClassName("game__hold")[0];
const hitBtn = document.getElementsByClassName("game__more")[0];
const doubleBtn = document.getElementsByClassName("game__double")[0];
const splitBtn = document.getElementsByClassName("game__split")[0];
// Popup controls
const popUp = document.getElementById("popup");
const popUpResult = document.getElementsByClassName("popup__result")[0];
const againBtn = document.getElementsByClassName("popup__try-again")[0];
const luckyBtn = document.getElementsByClassName("popup__lucky")[0];
const menuBtn = document.getElementsByClassName("popup__menu")[0];
// Game modes
startBtn.onclick = startGame;
startBtn2.onclick = startGame;
startBtn3.onclick = () => getBJ();
startBtn4.onclick = () => getSplit();
showPopUp.onclick = () => popUp.classList.remove("hidden");
// Win chance
const chance = document.getElementsByClassName("game__chance")[0];
//
standBtn.onclick = () => {
  if (!isSplit) {
    playerPick(1);
    splitBtn.style.backgroundImage = "none";
    splitBtn.classList.add("unavailable");
  }
  if (isSecondHand) {
    playerPick(1);
    currentHandPointer.classList.add("invisible");
    splitBtn.style.backgroundImage = "none";
    splitBtn.classList.add("unavailable");
  } else if (isSplit) {
    changeHand();
    isSecondHand = true;
    splitBtn.style.backgroundImage = "none";
    splitBtn.classList.add("unavailable");
  }

}
hitBtn.onclick = () => {
  if (!isSecondHand) {
    playerPick(2);
    splitBtn.style.backgroundImage = "none";
    splitBtn.classList.add("unavailable");
  }
  if (isSecondHand) {
    splitHit();
    splitBtn.style.backgroundImage = "none";
    splitBtn.classList.add("unavailable");
  }
}
doubleBtn.onclick = () => {
  if (!isSecondHand) {
    if (playerCard3.classList[1] == "invisible") {
      playerPick(3);
      splitBtn.style.backgroundImage = "none";
      splitBtn.classList.add("unavailable");
    }
  } else {
    splitDouble();
    doubleBtn.classList.add("unavailable");
    splitBtn.style.backgroundImage = "none";
    splitBtn.classList.add("unavailable");
  }
}
splitBtn.onclick = () => {
  playerPick(4);
  splitBtn.style.backgroundImage = "none";
  splitBtn.classList.add("unavailable");
}

// popup btns click
againBtn.onclick = resetGame;
luckyBtn.onclick = luckyStartGame;
menuBtn.onclick = goToMenu;

function startGame() {
  gameMenu.classList.add("hidden");
  gameContent.classList.remove("hidden");
  genDeck();
  startTimer();
  givePlayerCards();
  giveDealerCards();
  chance.style.top = `${hitBtn.offsetTop / window.innerHeight * 100 - 3}%`;
  chance.style.left = `${hitBtn.offsetLeft / window.innerWidth * 100}%`;
}

function resetGame() {
  deGenDeck();
  resetTimer();
  hideCards();
  isSplit = false;
  canContinue = true;
  isSecondHand = false;
  moreCardNum = 3;
  moreCardNum2 = 2;
  currentHandPointer.classList.add("hidden");
  pScores = [];
  pScores2 = [];
  dScores = [];
  popUp.classList.add("hidden");
  for (let i = 0; i < pScores.length; i++) {
    pScores[i] = 0;
  }
  for (let i = 0; i < pScores2.length; i++) {
    pScores2[i] = 0;
  }
  for (let i = 0; i < dScores.length; i++) {
    dScores[i] = 0;
  }
  setTimeout(() => {
    calcScore();
    playerGameScore.classList.add("invisible");
    playerGameScore2.classList.add("invisible");
    dealerGameScore.classList.add("invisible");
    playerGameScore.style.background = "#1D361B";
    playerGameScore2.style.background = "#1D361B";
    dealerGameScore.style.background = "#1D361B";
    splitBtn.classList.remove("unavailable");
    doubleBtn.classList.remove("unavailable");
    splitBtn.style.backgroundImage = "none";
    startGame();
  }, 100);
}
function luckyStartGame() {
  let n = Math.floor(Math.random() * 2); // 0 or 1
  if (n) {
    // lucky
    deGenDeck();
    resetTimer();
    hideCards();
    currentHandPointer.classList.add("hidden");
    isSplit = false;
    canContinue = true;
    isSecondHand = false;
    moreCardNum = 3;
    moreCardNum2 = 2;
    popUp.classList.add("hidden");
    for (let i = -1; i < pScores.length; i++) {
      pScores.shift();
    }
    for (let i = -1; i < pScores2.length; i++) {
      pScores2.shift();
    }
    for (let i = -1; i < dScores.length; i++) {
      dScores.shift();
    }
    calcScore();
    playerGameScore.classList.add("invisible");
    playerGameScore2.classList.add("invisible");
    dealerGameScore.classList.add("invisible");
    playerGameScore.style.background = "#1D361B";
    playerGameScore2.style.background = "#1D361B";
    dealerGameScore.style.background = "#1D361B";
    splitBtn.classList.remove("unavailable");
    doubleBtn.classList.remove("unavailable");
    splitBtn.style.backgroundImage = "none";
    getSplit();
    chance.style.top = `${hitBtn.offsetTop / window.innerHeight * 100}%`;
    chance.style.left = `${hitBtn.offsetLeft / window.innerWidth * 100}%`;
  } else {
    resetGame();
  }
}
function goToMenu() {
  window.location.reload();
}


function deGenDeck() {
  gameDeck.textContent = "";
}
function resetTimer() {
  sec = 60;
  for (let i = 0; i < timers.length; i++) {
    clearTimeout(timers[i]);
  }
  startTimer();
}
function hideCards() {
  for (let i = 0; i < 10; i++) {
    let card = playerCardWrapper.children[i];
    card.classList.add("invisible");
    card.setAttribute("src", "assets/cards/back.png");
  }
  for (let i = 0; i < 5; i++) {
    let card = dealerCardWrapper.children[i];
    card.classList.add("invisible");
    card.setAttribute("src", "assets/cards/back.png");
  }
}



function genDeck() {
  for (let i = 0; i < 52; i++) {
    let elem = document.createElement("img");
    elem.setAttribute("src", "assets/cards/back.png");
    elem.setAttribute("style", `margin-top: -${i / 2}px; margin-left: ${i / 2}px;`);
    elem.classList.add("game__deck-card");
    gameDeck.append(elem);
  }
}

sec = 60;

let timers = []
function startTimer() {
  for (let i = 0; i < 61; i++) {
    let timerIndex = setTimeout(substractSecond, i * 1000);
    timers.push(timerIndex);
  }
}
function substractSecond() {
  timerText.innerText = sec + "s left";
  sec--;
}


async function givePlayerCards() {
  for (let i = 0; i < 2; i++) {
    gameDeck.lastChild.classList.add("move-player-card");
    gameDeck.lastChild.style.zIndex = "3";
    let cardNum;
    if (i == 0) {
      gameDeck.lastChild.style.transform = `translate(${playerCard1.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard1.offsetTop - gameDeck.lastChild.offsetTop}px)`;
      cardNum = playerCard1;
    } else {
      gameDeck.lastChild.style.transform = `translate(${playerCard2.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard2.offsetTop - gameDeck.lastChild.offsetTop}px)`;
      cardNum = playerCard2;
    }
    setTimeout(() => {
      gameDeck.lastChild.remove();
      cardNum.classList.remove("invisible");
      cardNum.style.transform = "rotateY(90deg)";
    }, 700);
    setTimeout(() => {
      cardNum.setAttribute("src", `assets/cards/${newCard}.png`);
      playerCard6.setAttribute("src", `assets/cards/${newCard}.png`);
      cardNum.style.transform = "rotateY(0deg)";
    }, 1000);
    let newCard = genCard(1);

    setTimeout(() => {
      playerGameScore.classList.remove("invisible");
      playerGameScore.style.top = `${Math.round((playerCard2.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
      playerGameScore.style.left = `${Math.round((playerCard2.offsetLeft / window.innerWidth) * 100) + (8 * (window.innerHeight / window.innerWidth))}vw`;
    }, 4000);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
async function giveDealerCards() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  for (let i = 0; i < 2; i++) {
    gameDeck.lastChild.classList.add("move-dealer-card");
    gameDeck.lastChild.style.zIndex = "3";
    let cardNum;
    if (i == 0) {
      gameDeck.lastChild.style.transform = `translate(${dealerCard1.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${dealerCard1.offsetTop - gameDeck.lastChild.offsetTop}px)`;
      cardNum = dealerCard1;
    } else {
      gameDeck.lastChild.style.transform = `translate(${dealerCard2.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${dealerCard2.offsetTop - gameDeck.lastChild.offsetTop}px)`;
      cardNum = dealerCard2;
    }
    setTimeout(() => gameDeck.lastChild.remove(), 700);
    setTimeout(() => cardNum.classList.remove("invisible"), 700);
    if (i == 0) {
      let newCard = genCard(2);
      setTimeout(() => cardNum.style.transform = "rotateY(90deg)", 700);
      setTimeout(() => {
        cardNum.style.transform = "rotateY(0deg)";
        cardNum.setAttribute("src", `assets/cards/${newCard}.png`);
        cardNum.style.transform = "rotate(180deg, 180deg)";
        cardNum.style.transition = ".3s all";
      }, 1000);
    } else {
      cardNum.style.transition = ".3s all";
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  dealerGameScore.classList.remove("invisible");
  dealerGameScore.style.top = `${Math.round((dealerCard2.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
  dealerGameScore.style.left = `${Math.round((dealerCard2.offsetLeft / window.innerWidth) * 100) + (8 * (window.innerHeight / window.innerWidth))}vw`;
  calcScore(2);
}

let pScores = [];
let pScores2 = [];
let dScores = [];

function genCard(whom) {
  switch (whom) {
    case 1:
      //player
      let num = Math.floor(2 + (Math.random() * 13)); // 2 to 14
      let num2 = Math.floor(1 + (Math.random() * 4)); // 1 to 4
      let type;
      switch (num2) {
        case 1:
          type = "b";
          break;
        case 2:
          type = "c";
          break;
        case 3:
          type = "t";
          break;
        case 4:
          type = "p";
          break;
      }
      let result = num + "" + type;

      if (num == 14) {
        pScores.unshift(11);
      } else if (num > 9) {
        pScores.unshift(10);
      } else {
        pScores.unshift(num);
      }
      if (pScores[1] == 11) {
        pScores[1] = 1;
      } else if (pScores[2] == 11) {
        pScores[2] = 1;
      } else if (pScores[3] == 11) {
        pScores[3] = 1;
      } else if (pScores[4] == 11) {
        pScores[4] = 1;
      }
      // check for BJ
      if (pScores[0] == 11 && pScores[1] == 10) {
        playerGameScore.style.background = "pink";
      }
      if (pScores[0] == 10 && pScores[1] == 1) {
        pScores[1] = 11;
        playerGameScore.style.background = "pink";
        calcScore();
      }
      if (pScores[0] == pScores[1] || pScores[0] == 11 && pScores[1] == 1) {
        if (!isSplit) {
          splitBtn.style.backgroundImage = `url("assets/lightning.gif")`;
          splitBtn.classList.remove("unavailable");
        }
      }
      return result;
    case 2:
      //dealer
      let num3 = Math.floor(2 + (Math.random() * 13)); // 2 to 14
      let num4 = Math.floor(1 + (Math.random() * 4)); // 1 to 4
      let type2;
      switch (num4) {
        case 1:
          type2 = "b";
          break;
        case 2:
          type2 = "c";
          break;
        case 3:
          type2 = "t";
          break;
        case 4:
          type2 = "p";
          break;
      }
      let result2 = num3 + "" + type2;

      if (num3 == 14) {
        dScores.unshift(11);
      } else if (num3 > 9) {
        dScores.unshift(10);
      } else {
        dScores.unshift(num3);
      }
      if (dScores[1] == 11) {
        dScores[1] = 1;
      } else if (dScores[2] == 11) {
        dScores[2] = 1;
      } else if (dScores[3] == 11) {
        dScores[3] = 1;
      } else if (dScores[4] == 11) {
        dScores[4] = 1;
      }
      // check for BJ
      if (dScores[0] == 11 && dScores[1] == 10) {
        dealerGameScore.style.background = "pink";
      }
      if (dScores[0] == 10 && dScores[1] == 1) {
        dScores[1] = 11;
        dealerGameScore.style.background = "pink";
        calcScore();
      }
      return result2;
    case 3:
      // split hand
      let num5 = Math.floor(2 + (Math.random() * 13)); // 2 to 14
      let num6 = Math.floor(1 + (Math.random() * 4)); // 1 to 4
      let type3;
      switch (num6) {
        case 1:
          type3 = "b";
          break;
        case 2:
          type3 = "c";
          break;
        case 3:
          type3 = "t";
          break;
        case 4:
          type3 = "p";
          break;
      }
      let result3 = num5 + "" + type3;

      if (num5 == 14) {
        pScores2.unshift(11);
      } else if (num5 > 9) {
        pScores2.unshift(10);
      } else {
        pScores2.unshift(num5);
      }
      if (pScores2[1] == 11) {
        pScores2[1] = 1;
      } else if (pScores2[2] == 11) {
        pScores2[2] = 1;
      } else if (pScores2[3] == 11) {
        pScores2[3] = 1;
      } else if (pScores2[4] == 11) {
        pScores2[4] = 1;
      }
      calcScore();
      // check for BJ
      if (pScores2[0] == 11 && pScores2[1] == 10) {
        playerGameScore2.style.background = "pink";
      }
      if (pScores2[0] == 10 && pScores2[1] == 1) {
        pScores2[1] = 11;
        playerGameScore2.style.background = "pink";
        calcScore();
      }
      return result3;
  }
}
function calcScore() {
  let pScore = 0;
  let pScore2 = 0;
  let dScore = 0;
  for (let i = 0; i < pScores.length; i++) {
    pScore += pScores[i];
    playerGameScore.innerText = pScore;
  }
  for (let i = 0; i < pScores2.length; i++) {
    pScore2 += pScores2[i];
    playerGameScore2.innerText = pScore2;
  }
  for (let i = 0; i < dScores.length; i++) {
    dScore += dScores[i];
    dealerGameScore.innerText = dScore;
  }
  if (Number(playerGameScore.innerText) > 21) {
    playerGameScore.style.background = "rgb(172, 21, 21)";
  }
  if (Number(playerGameScore2.innerText) > 21) {
    playerGameScore2.style.background = "rgb(172, 21, 21)";
  }
  if (Number(dealerGameScore.innerText) > 21) {
    dealerGameScore.style.background = "rgb(172, 21, 21)";
  }
}

let moreCardNum = 3;
let isSplit = false;
let canContinue = true;

function playerPick(btnNum) {
  switch (btnNum) {
    case 1:
      // Stand
      if (!isSplit) {
        dealerCard2.style.transform = `rotateY(90deg)`;
        setTimeout(() => {
          dealerCard2.setAttribute("src", `assets/cards/${genCard(2)}.png`);
          calcScore();
          setTimeout(() => Number(dealerGameScore.innerText) >= 17 ? defineWinner() : 0, 1000);
        }, 300);
        setTimeout(() => dealerCard2.style.transform = `rotateY(0deg)`, 300);
        setTimeout(() => {
          if (Number(playerGameScore.innerText) <= 21) {
            if (Number(dealerGameScore.innerText) < 17 && Number(playerGameScore.innerText) >= Number(dealerGameScore.innerText)) {
              gameDeck.lastChild.style.zIndex = "3";
              gameDeck.lastChild.classList.add("move-dealer-card");
              gameDeck.lastChild.style.transform = `translate(${dealerCard3.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${dealerCard3.offsetTop - gameDeck.lastChild.offsetTop}px)`;
              setTimeout(() => {
                dealerCard3.classList.remove("invisible");
                dealerCard3.style.transform = "rotateY(90deg)";
                gameDeck.lastChild.remove();

                dealerGameScore.style.top = `${Math.round((dealerCard3.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
                dealerGameScore.style.left = `${Math.round((dealerCard3.offsetLeft / window.innerWidth) * 100) + (8.6 * (window.innerHeight / window.innerWidth))}vw`;
              }, 900);
              setTimeout(() => {
                let newCard = genCard(2);
                calcScore();
                dealerCard3.setAttribute("src", `assets/cards/${newCard}.png`);
                dealerCard3.style.transform = "rotateY(0deg)";
                setTimeout(() => Number(dealerGameScore.innerText) >= 17 ? defineWinner() : 0, 1000);
              }, 1200);
            } else {
              defineWinner();
            }
          } else {
            defineWinner();
          }
        }, 600);
        setTimeout(() => {
          if (Number(dealerGameScore.innerText) < 17 && Number(playerGameScore.innerText) >= Number(dealerGameScore.innerText)) {
            gameDeck.lastChild.style.zIndex = "3";
            gameDeck.lastChild.classList.add("move-dealer-card");
            gameDeck.lastChild.style.transform = `translate(${dealerCard4.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${dealerCard4.offsetTop - gameDeck.lastChild.offsetTop}px)`;
            setTimeout(() => {
              dealerCard4.classList.remove("invisible");
              dealerCard4.style.transform = "rotateY(90deg)";
              gameDeck.lastChild.remove();

              dealerGameScore.style.top = `${Math.round((dealerCard4.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
              dealerGameScore.style.left = `${Math.round((dealerCard4.offsetLeft / window.innerWidth) * 100) + (9.6 * (window.innerHeight / window.innerWidth))}vw`;
            }, 900);
            setTimeout(() => {
              let newCard = genCard(2);
              calcScore();
              dealerCard4.setAttribute("src", `assets/cards/${newCard}.png`);
              dealerCard4.style.transform = "rotateY(0deg)";
              setTimeout(() => Number(dealerGameScore.innerText) >= 17 ? defineWinner() : 0, 1000);
            }, 1200);
          } else {
            defineWinner();
          }
        }, 2100);
        setTimeout(() => {
          if (Number(dealerGameScore.innerText) < 17 && Number(playerGameScore.innerText) >= Number(dealerGameScore.innerText)) {
            gameDeck.lastChild.style.zIndex = "3";
            gameDeck.lastChild.classList.add("move-dealer-card");
            gameDeck.lastChild.style.transform = `translate(${dealerCard5.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${dealerCard5.offsetTop - gameDeck.lastChild.offsetTop}px)`;
            setTimeout(() => {
              dealerCard5.classList.remove("invisible");
              dealerCard5.style.transform = "rotateY(90deg)";
              gameDeck.lastChild.remove();

              dealerGameScore.style.top = `${Math.round((dealerCard5.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
              dealerGameScore.style.left = `${Math.round((dealerCard5.offsetLeft / window.innerWidth) * 100) + (9.1 * (window.innerHeight / window.innerWidth))}vw`;
            }, 900);
            setTimeout(() => {
              let newCard = genCard(2);
              calcScore();
              dealerCard5.setAttribute("src", `assets/cards/${newCard}.png`);
              dealerCard5.style.transform = "rotateY(0deg)";
              setTimeout(() => Number(dealerGameScore.innerText) >= 17 ? defineWinner() : 0, 1000);
            }, 1200);
          } else {
            defineWinner();
          }
        }, 3600);
        // stand during split
      } else if (isSplit) {
        dealerCard2.style.transform = `rotateY(90deg)`;
        setTimeout(() => {
          dealerCard2.setAttribute("src", `assets/cards/${genCard(2)}.png`);
          calcScore();
          setTimeout(() => Number(dealerGameScore.innerText) >= 17 ? defineWinner() : 0, 1000);
        }, 300);
        setTimeout(() => dealerCard2.style.transform = `rotateY(0deg)`, 300);
        setTimeout(() => {
          if (Number(playerGameScore.innerText) <= 21 || Number(playerGameScore2.innerText <= 21)) {
            if ((Number(dealerGameScore.innerText) < 17 && Number(dealerGameScore.innerText) < Number(playerGameScore.innerText) || Number(dealerGameScore.innerText) < 17 && Number(dealerGameScore.innerText) < Number(playerGameScore2.innerText)) && (Number(playerGameScore.innerText) < 21 && Number(playerGameScore2.innerText) < 21)) {
              gameDeck.lastChild.style.zIndex = "3";
              gameDeck.lastChild.classList.add("move-dealer-card");
              gameDeck.lastChild.style.transform = `translate(${dealerCard3.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${dealerCard3.offsetTop - gameDeck.lastChild.offsetTop}px)`;
              setTimeout(() => {
                dealerCard3.classList.remove("invisible");
                dealerCard3.style.transform = "rotateY(90deg)";
                gameDeck.lastChild.remove();

                dealerGameScore.style.top = `${Math.round((dealerCard3.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
                dealerGameScore.style.left = `${Math.round((dealerCard3.offsetLeft / window.innerWidth) * 100) + (8.6 * (window.innerHeight / window.innerWidth))}vw`;
              }, 900);
              setTimeout(() => {
                let newCard = genCard(2);
                calcScore();
                dealerCard3.setAttribute("src", `assets/cards/${newCard}.png`);
                dealerCard3.style.transform = "rotateY(0deg)";
                setTimeout(() => Number(dealerGameScore.innerText) >= 17 ? defineWinner() : 0, 1000);
              }, 1200);
            } else {
              defineWinner();
            }
          } else {
            defineWinner();
          }
        }, 600);
        setTimeout(() => {
          if (Number(playerGameScore.innerText) <= 21 || Number(playerGameScore2.innerText <= 21)) {
            if ((Number(dealerGameScore.innerText) < 17 && Number(dealerGameScore.innerText) < Number(playerGameScore.innerText) || Number(dealerGameScore.innerText) < 17 && Number(dealerGameScore.innerText) < Number(playerGameScore2.innerText)) && (Number(playerGameScore.innerText) < 21 && Number(playerGameScore2.innerText) < 21)) {
              gameDeck.lastChild.style.zIndex = "3";
              gameDeck.lastChild.classList.add("move-dealer-card");
              gameDeck.lastChild.style.transform = `translate(${dealerCard4.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${dealerCard4.offsetTop - gameDeck.lastChild.offsetTop}px)`;
              setTimeout(() => {
                dealerCard4.classList.remove("invisible");
                dealerCard4.style.transform = "rotateY(90deg)";
                gameDeck.lastChild.remove();

                dealerGameScore.style.top = `${Math.round((dealerCard4.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
                dealerGameScore.style.left = `${Math.round((dealerCard4.offsetLeft / window.innerWidth) * 100) + (9.6 * (window.innerHeight / window.innerWidth))}vw`;
              }, 900);
              setTimeout(() => {
                let newCard = genCard(2);
                calcScore();
                dealerCard4.setAttribute("src", `assets/cards/${newCard}.png`);
                dealerCard4.style.transform = "rotateY(0deg)";
                setTimeout(() => Number(dealerGameScore.innerText) >= 17 ? defineWinner() : 0, 1000);
              }, 1200);
            } else {
              defineWinner();
            }
          } else {
            defineWinner();
          }
        }, 2100);
        setTimeout(() => {
          if (Number(playerGameScore.innerText) <= 21 || Number(playerGameScore2.innerText <= 21)) {
            if ((Number(dealerGameScore.innerText) < 17 && Number(dealerGameScore.innerText) < Number(playerGameScore.innerText) || Number(dealerGameScore.innerText) < 17 && Number(dealerGameScore.innerText) < Number(playerGameScore2.innerText)) && (Number(playerGameScore.innerText) < 21 && Number(playerGameScore2.innerText) < 21)) {
              gameDeck.lastChild.style.zIndex = "3";
              gameDeck.lastChild.classList.add("move-dealer-card");
              gameDeck.lastChild.style.transform = `translate(${dealerCard5.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${dealerCard5.offsetTop - gameDeck.lastChild.offsetTop}px)`;
              setTimeout(() => {
                dealerCard5.classList.remove("invisible");
                dealerCard5.style.transform = "rotateY(90deg)";
                gameDeck.lastChild.remove();

                dealerGameScore.style.top = `${Math.round((dealerCard5.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
                dealerGameScore.style.left = `${Math.round((dealerCard5.offsetLeft / window.innerWidth) * 100) + (9.1 * (window.innerHeight / window.innerWidth))}vw`;
              }, 900);
              setTimeout(() => {
                let newCard = genCard(2);
                calcScore();
                dealerCard5.setAttribute("src", `assets/cards/${newCard}.png`);
                dealerCard5.style.transform = "rotateY(0deg)";
                setTimeout(() => Number(dealerGameScore.innerText) >= 17 ? defineWinner() : 0, 1000);
              }, 1200);
            } else {
              defineWinner();
            }
          } else {
            defineWinner();
          }
        }, 3600);
      }

      break;
    case 2:
      // Hit
      gameDeck.lastChild.style.zIndex = "3";
      if (moreCardNum == 6) {
        alert("You cannot get one more card (5 == max)");
        return 0;
      }
      let newCard = genCard(1);
      if (isSplit) {
        if (!canContinue) {
          gameDeck.lastChild.classList.add("move-player-card");
          gameDeck.lastChild.style.transform = `translate(${playerCard2.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard2.offsetTop - gameDeck.lastChild.offsetTop}px)`;
          setTimeout(() => {
            gameDeck.lastChild.remove();
            playerCard2.classList.remove("invisible");
            playerCard2.style.transform = "rotateY(90deg)";
          }, 700);
          setTimeout(() => {
            playerCard2.setAttribute("src", `assets/cards/${newCard}.png`);
            playerCard2.style.transform = "rotateY(0deg)";
            playerGameScore.style.top = `${Math.round((playerCard2.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
            playerGameScore.style.left = `${Math.round((playerCard2.offsetLeft / window.innerWidth) * 100) + (8 * (window.innerHeight / window.innerWidth))}vw`;
          }, 1000);
        }
        setTimeout(() => canContinue = true, 1000);
      }
      if (canContinue) {
        if (moreCardNum == 3) {
          gameDeck.lastChild.classList.add("move-player-card");
          gameDeck.lastChild.style.transform = `translate(${playerCard3.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard3.offsetTop - gameDeck.lastChild.offsetTop}px)`;
          setTimeout(() => {
            gameDeck.lastChild.remove();
            playerCard3.classList.remove("invisible");
            playerCard3.style.transform = "rotateY(90deg)";
          }, 700);
          setTimeout(() => {
            playerCard3.setAttribute("src", `assets/cards/${newCard}.png`);
            playerCard3.style.transform = "rotateY(0deg)";
            playerGameScore.style.top = `${Math.round((playerCard3.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
            playerGameScore.style.left = `${Math.round((playerCard3.offsetLeft / window.innerWidth) * 100) + (9 * (window.innerHeight / window.innerWidth))}vw`;
            if (Number(playerGameScore.innerText) > 21 && isSplit) {
              changeHand();
            } else if (Number(playerGameScore.innerText) > 21) {
              dealerCard2.style.transform = `rotateY(90deg)`;
              setTimeout(() => {
                dealerCard2.setAttribute("src", `assets/cards/${genCard(2)}.png`);
                calcScore();
              }, 300);
              setTimeout(() => dealerCard2.style.transform = `rotateY(0deg)`, 300);
              setTimeout(() => defineWinner(), 1300);
            }
          }, 1000);
          moreCardNum++;
        } else if (moreCardNum == 4) {

          gameDeck.lastChild.classList.add("move-player-card");
          gameDeck.lastChild.style.transform = `translate(${playerCard4.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard4.offsetTop - gameDeck.lastChild.offsetTop}px)`;
          setTimeout(() => {
            gameDeck.lastChild.remove();
            playerCard4.classList.remove("invisible");
            playerCard4.style.transform = "rotateY(90deg)";
          }, 700);
          setTimeout(() => {
            playerCard4.setAttribute("src", `assets/cards/${newCard}.png`);
            playerCard4.style.transform = "rotateY(0deg)";
            playerGameScore.style.top = `${Math.round((playerCard4.offsetTop / window.innerHeight) * 100) - (2.2 * (window.innerHeight / window.innerWidth))}vh`;
            playerGameScore.style.left = `${Math.round((playerCard4.offsetLeft / window.innerWidth) * 100) + (9.4 * (window.innerHeight / window.innerWidth))}vw`;
            if (Number(playerGameScore.innerText) > 21 && isSplit) {
              changeHand();
            } else if (Number(playerGameScore.innerText) > 21) {
              dealerCard2.style.transform = `rotateY(90deg)`;
              setTimeout(() => {
                dealerCard2.setAttribute("src", `assets/cards/${genCard(2)}.png`);
                calcScore();
              }, 300);
              setTimeout(() => dealerCard2.style.transform = `rotateY(0deg)`, 300);
              setTimeout(() => defineWinner(), 1300);
            }
          }, 1000);
          moreCardNum++;

        } else if (moreCardNum == 5) {

          gameDeck.lastChild.classList.add("move-player-card");
          gameDeck.lastChild.style.transform = `translate(${playerCard5.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard5.offsetTop - gameDeck.lastChild.offsetTop}px)`;
          setTimeout(() => {
            gameDeck.lastChild.remove();
            playerCard5.classList.remove("invisible");
            playerCard5.style.transform = "rotateY(90deg)";
          }, 700);
          setTimeout(() => {
            playerCard5.setAttribute("src", `assets/cards/${newCard}.png`);
            playerCard5.style.transform = "rotateY(0deg)";
            playerGameScore.style.top = `${Math.round((playerCard5.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
            playerGameScore.style.left = `${Math.round((playerCard5.offsetLeft / window.innerWidth) * 100) + (9 * (window.innerHeight / window.innerWidth))}vw`;
            if (Number(playerGameScore.innerText) > 21 && isSplit) {
              changeHand();
            } else if (Number(playerGameScore.innerText) > 21) {
              dealerCard2.style.transform = `rotateY(90deg)`;
              setTimeout(() => {
                dealerCard2.setAttribute("src", `assets/cards/${genCard(2)}.png`);
                calcScore();
              }, 300);
              setTimeout(() => dealerCard2.style.transform = `rotateY(0deg)`, 300);
              setTimeout(() => defineWinner(), 1300);
            }
          }, 1000);
          moreCardNum++;

        } else {
          alert("You cannot get one more card (5 == max)");
        }
      }
      calcScore();
      break;
    case 3:
      // Double
      if (isSplit && !isSecondHand || !isSplit) {
        if (playerCard2.classList[1] != "invisible") {
          gameDeck.lastChild.classList.add("move-player-card");
          gameDeck.lastChild.style.zIndex = "3";
          gameDeck.lastChild.style.transform = `translate(${playerCard3.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard3.offsetTop - gameDeck.lastChild.offsetTop}px)`;
          setTimeout(() => {
            gameDeck.lastChild.remove();
            playerCard3.classList.remove("invisible");
            playerCard3.style.transform = "rotateY(90deg)";
          }, 700);
          setTimeout(() => {
            let newCard = genCard(1);
            calcScore();
            playerCard3.setAttribute("src", `assets/cards/${newCard}.png`);
            playerCard3.style.transform = "rotateY(0deg)";
            playerGameScore.style.top = `${Math.round((playerCard3.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
            playerGameScore.style.left = `${Math.round((playerCard3.offsetLeft / window.innerWidth) * 100) + (9 * (window.innerHeight / window.innerWidth))}vw`;
            isSplit ? changeHand() : playerPick(1);
          }, 1000);
        }
        if (isSecondHand) {
          playerPick(1);
        }
      }
      break;
    case 4:
      // Split
      if (pScores[0] == pScores[1] || pScores[0] == 11 && pScores[1] == 1) {
        isSplit = true;
        canContinue = false;
        splitBtn.classList.add("unavailable");
        playerCard2.classList.add("invisible");
        setTimeout(() => {
          playerCard6.classList.remove("invisible");
          playerCard6.style.top = `75%`;
          playerCard6.style.left = `60%`;
          playerGameScore.style.top = `${Math.round((playerCard1.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
          playerGameScore.style.left = `${Math.round((playerCard1.offsetLeft / window.innerWidth) * 100) + (9 * (window.innerHeight / window.innerWidth))}vw`;
          pScores2.unshift(pScores[1]);
          pScores.splice(1);
        }, 280);
        setTimeout(() => {
          playerGameScore2.classList.remove("invisible");
          playerGameScore2.style.top = `${Math.round((playerCard6.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
          playerGameScore2.style.left = `${Math.round((playerCard6.offsetLeft / window.innerWidth) * 100) + (8.6 * (window.innerHeight / window.innerWidth))}vw`;
          calcScore();
        }, 700);
        setTimeout(() => {
          currentHandPointer.classList.remove("invisible");
          changeHandBtn.classList.remove("invisible");
          playerCard2.setAttribute("src", "assets/cards/back.png");
        }, 1200);
      }
      break;
  }
}

function getBJ() {
  gameMenu.classList.add("hidden");
  gameContent.classList.remove("hidden");
  genDeck();
  startTimer();
  givePlayerCards();
  giveDealerCards();
  setTimeout(() => {
    playerCard1.setAttribute("src", "assets/cards/14t.png");
    playerCard2.setAttribute("src", "assets/cards/10b.png");
    pScores[0] = 11;
    pScores[1] = 10;
    pScores[2] = 0;
    calcScore();
  }, 2200);
}
function getSplit() {
  gameMenu.classList.add("hidden");
  gameContent.classList.remove("hidden");
  genDeck();
  startTimer();
  givePlayerCards();
  giveDealerCards();
  setTimeout(() => {
    playerCard1.setAttribute("src", "assets/cards/11t.png");
    playerCard2.setAttribute("src", "assets/cards/11b.png");
    playerCard6.setAttribute("src", "assets/cards/11b.png");
    pScores[0] = 10;
    pScores[1] = 10;
    pScores[2] = 0;
    calcScore();
    splitBtn.style.backgroundImage = `url("assets/lightning.gif")`;
    splitBtn.classList.remove("unavailable");
  }, 2200);
}

changeHandBtn.onclick = () => {
  changeHand();
}

let isSecondHand;
let moreCardNum2 = 2;

function changeHand() {
  currentHandPointer.style.left = "62%";
  changeHandBtn.style.left = "59.9%";
  changeHandBtn.classList.add("invisible");
  isSecondHand = true;
}
function splitHit() {
  // Hit
  gameDeck.lastChild.style.zIndex = "3";
  if (moreCardNum2 == 6) {
    alert("You cannot get one more card (5 == max)");
    return 0;
  }
  let newCard = genCard(3);
  if (moreCardNum2 == 2) {
    gameDeck.lastChild.classList.add("move-player-card");
    gameDeck.lastChild.style.transform = `translate(${playerCard7.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard7.offsetTop - gameDeck.lastChild.offsetTop}px)`;
    setTimeout(() => {
      gameDeck.lastChild.remove();
      playerCard7.classList.remove("invisible");
      playerCard7.style.transform = "rotateY(90deg)";
    }, 700);
    setTimeout(() => {
      playerCard7.setAttribute("src", `assets/cards/${newCard}.png`);
      playerCard7.style.transform = "rotateY(0deg)";
      playerGameScore2.style.top = `${Math.round((playerCard7.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
      playerGameScore2.style.left = `${Math.round((playerCard7.offsetLeft / window.innerWidth) * 100) + (9.5 * (window.innerHeight / window.innerWidth))}vw`;
    }, 1000);
    moreCardNum2++;
  } else if (moreCardNum2 == 3) {
    gameDeck.lastChild.classList.add("move-player-card");
    gameDeck.lastChild.style.transform = `translate(${playerCard8.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard8.offsetTop - gameDeck.lastChild.offsetTop}px)`;
    setTimeout(() => {
      gameDeck.lastChild.remove();
      playerCard8.classList.remove("invisible");
      playerCard8.style.transform = "rotateY(90deg)";
    }, 700);
    setTimeout(() => {
      playerCard8.setAttribute("src", `assets/cards/${newCard}.png`);
      playerCard8.style.transform = "rotateY(0deg)";
      playerGameScore2.style.top = `${Math.round((playerCard8.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
      playerGameScore2.style.left = `${Math.round((playerCard8.offsetLeft / window.innerWidth) * 100) + (9 * (window.innerHeight / window.innerWidth))}vw`;
      if (Number(playerGameScore2.innerText) > 21) {
        dealerCard2.style.transform = `rotateY(90deg)`;
        setTimeout(() => {
          calcScore();
          playerPick(1);
        }, 300);
      }
    }, 1000);
    moreCardNum2++;
  } else if (moreCardNum2 == 4) {

    gameDeck.lastChild.classList.add("move-player-card");
    gameDeck.lastChild.style.transform = `translate(${playerCard9.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard9.offsetTop - gameDeck.lastChild.offsetTop}px)`;
    setTimeout(() => {
      gameDeck.lastChild.remove();
      playerCard9.classList.remove("invisible");
      playerCard9.style.transform = "rotateY(90deg)";
    }, 700);
    setTimeout(() => {
      playerCard9.setAttribute("src", `assets/cards/${newCard}.png`);
      playerCard9.style.transform = "rotateY(0deg)";
      playerGameScore2.style.top = `${Math.round((playerCard9.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
      playerGameScore2.style.left = `${Math.round((playerCard9.offsetLeft / window.innerWidth) * 100) + (8.7 * (window.innerHeight / window.innerWidth))}vw`;
      if (Number(playerGameScore2.innerText) > 21) {
        dealerCard2.style.transform = `rotateY(90deg)`;
        setTimeout(() => {
          calcScore();
          playerPick(1);
        }, 300);
      }
    }, 1000);
    moreCardNum2++;

  } else if (moreCardNum2 == 5) {

    gameDeck.lastChild.classList.add("move-player-card");
    gameDeck.lastChild.style.transform = `translate(${playerCard10.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard10.offsetTop - gameDeck.lastChild.offsetTop}px)`;
    setTimeout(() => {
      gameDeck.lastChild.remove();
      playerCard10.classList.remove("invisible");
      playerCard10.style.transform = "rotateY(90deg)";
    }, 700);
    setTimeout(() => {
      playerCard10.setAttribute("src", `assets/cards/${newCard}.png`);
      playerCard10.style.transform = "rotateY(0deg)";
      playerGameScore2.style.top = `${Math.round((playerCard10.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
      playerGameScore2.style.left = `${Math.round((playerCard10.offsetLeft / window.innerWidth) * 100) + (9 * (window.innerHeight / window.innerWidth))}vw`;
      if (Number(playerGameScore2.innerText) > 21) {
        dealerCard2.style.transform = `rotateY(90deg)`;
        setTimeout(() => {
          calcScore();
        }, 300);
        setTimeout(() => {
          playerPick(1);
          setTimeout(() => defineWinner(), 2300);
        }, 300);
      }
    }, 1000);
    moreCardNum2++;

  } else {
    alert("You cannot get one more card (5 == max)");
  }
}
function splitDouble() {
  // Double split
  if (playerCard7.classList[1] != "invisible") {
    gameDeck.lastChild.classList.add("move-player-card");
    gameDeck.lastChild.style.zIndex = "3";
    gameDeck.lastChild.style.transform = `translate(${playerCard8.offsetLeft - gameDeck.lastChild.offsetLeft}px, ${playerCard8.offsetTop - gameDeck.lastChild.offsetTop}px)`;
    setTimeout(() => {
      gameDeck.lastChild.remove();
      playerCard8.classList.remove("invisible");
      playerCard8.style.transform = "rotateY(90deg)";
    }, 700);
    setTimeout(() => {
      let newCard = genCard(3);
      calcScore();
      playerCard8.setAttribute("src", `assets/cards/${newCard}.png`);
      playerCard8.style.transform = "rotateY(0deg)";
      playerGameScore2.style.top = `${Math.round((playerCard8.offsetTop / window.innerHeight) * 100) - (2 * (window.innerHeight / window.innerWidth))}vh`;
      playerGameScore2.style.left = `${Math.round((playerCard8.offsetLeft / window.innerWidth) * 100) + (9 * (window.innerHeight / window.innerWidth))}vw`;
      playerPick(1);

    }, 1000);
  }
}
function defineWinner() {
  let p1 = Number(playerGameScore.innerText);
  let p2 = Number(playerGameScore2.innerText);
  let d1 = Number(dealerGameScore.innerText);
  if (!isSplit) {
    // Game results NO split

    // dealer overpick

    if (d1 > 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Player Win!";
    }

    // player overpick

    if (p1 > 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Dealer Win!";
    }

    // player win

    if (d1 > 21 || p1 > d1 && p1 <= 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Player Win!";
    }

    // dealer win

    if (p1 > 21 || d1 > p1 && d1 <= 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Dealer Win!";
    }

    // draw

    if (p1 == d1 && p1 <= 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Draw!";
    }

  } else {
    // Game results WITH split

    // dealer overpick

    if (d1 > 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Player Win!";
    }

    // player1 overpick

    if (p1 > 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Dealer Win!";
    }

    // player2 overpick

    if (p2 > 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Dealer Win!";
    }

    // player1 - win, player2 - lose

    if (p2 > 21 && p1 <= 21 && d1 < 21 && d1 < p1) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Left hand - Win!, Right Hand - Lose!";
    }

    // player1 - lose, player2 - win

    if (p1 > 21 && p2 <= 21 && d1 < 21 && d1 < p2) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Left hand - Lose!, Right Hand - Win!";
    }

    // player1 - win, player2 - lose

    if (d1 <= 21 && p1 <= 21 && p2 <= 21 && p1 > d1 && p2 < d1) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Left hand - Win!, Right Hand - Lose!";
    }

    // player1 - lose, player2 - win

    if (d1 <= 21 && p1 <= 21 && p2 <= 21 && p2 > d1 && p1 < d1) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Left hand - Lose!, Right Hand - Win!";
    }

    // player total win

    if (d1 > 21 || p1 <= 21 && p2 <= 21 && p1 > d1 && p2 > d1) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Player Total Win!";
    }

    // dealer total win

    if (d1 <= 21 && d1 > p1 && d1 > p2 && p1 <= 21 && p2 <= 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Dealer Total Win!";
    }

    // Draw total

    if (p1 == d1 && p2 == d1) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Total Draw!";
    }

    // 1-draw-2-win

    if (p1 == d1 && p2 > d1 && p2 <= 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Left hand - Draw, Right hand - Win!";
    }

    // 1-draw-2-lose

    if (p1 == d1 && p2 < d1 || p1 == d1 && p2 > 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Left hand - Draw, Right hand - Lose!";
    }

    // 1-win-2-draw

    if (p1 > d1 && p1 <= 21 && p2 == d1) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Left hand - Win, Right hand - Draw!";
    }

    // 1-lose-2-draw

    if (p1 < d1 && p2 == d1 && d1 <= 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "Left hand - Lose, Right hand - Draw!";
    }

    // wtf

    if (d1 > 21 && p1 > 21 || d1 > 21 && p2 > 21) {
      popUp.classList.remove("hidden");
      popUpResult.innerText = "idk how to describe this)";
    }
  }
}

