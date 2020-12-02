// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const cards = document.querySelectorAll('.card');
const restartButton = document.querySelector('.restart');
let countCards = document.querySelectorAll('.card').length;
let counterMoves = 0;

const shuffleNextCard = function shuffleNextCardIcon(iconsArray){
  const nextCard = document.getElementById('next-card');
  nextCard.innerHTML = "<i class='" + shuffle(iconsArray[0]) + "'></i>";
}

const resetScore = function resetTheScore(){
  let startGameScore = document.getElementById("score");
  counterMoves = 0
  score.innerText = counterMoves;
}

const addToYourScore = function addMovesToYourScore (){
  counterMoves++
  const clickCount = document.getElementById('score');
  clickCount.innerText = counterMoves;
}

const restartTheGame = function eventRestartTheGame(event){
  startTheGame()

  for (let index = 0; index < cards.length; index++){
    cards[index].classList.remove ('matched');
    cards[index].classList.remove ('show');
    cards[index].removeAttribute ('ismatched');
  }
}

const startTheGame = function startTheMainLogicOfTheGame () {
  /*
    Function to be called when the game is started/restarted

    1st - Build an array of icons based on the elements of the HTML
    2nd - Create a copy of this array, since we'll remove the items to avoid
          duplicated cards
    3rd - Shuffle and set the value of the "next-card" field
    4th - Reset the score of the game
    5th - Shuffles and distributes the cards
  */
  arrayOfIcons = [];
  for (let index = 0; index < cards.length; index++) {
    arrayOfIcons.push(cards[index].firstElementChild.className);
  }  
  const newArrayOfIcons = shuffle(arrayOfIcons.slice());
  shuffleNextCard(newArrayOfIcons)
  resetScore()

  for (let index = 0; index < cards.length; index++){
    let icon = shuffle(newArrayOfIcons)[0];
    cards[index].innerHTML = "<i class='" + icon + "'></i>"

    // get the position of the icon in the array
    let iconIndexInArray = newArrayOfIcons.indexOf(icon)
    //remove the icon from the array
    newArrayOfIcons.splice(iconIndexInArray, 1);
  }
}

const playerClick = function eventPlayerClick(event){
  let isMatched = event.target.getAttribute("isMatched")
  let isBlocked = event.target.parentElement.getAttribute("isBlocked")
  let nextCard = document.getElementById('next-card');

  if(event.target.tagName == "LI" && isMatched == null && isBlocked == null ){
    //blocking the clicks in other cards
    event.target.parentElement.setAttribute("isBlocked", "True")
    addToYourScore()

    if (nextCard.innerHTML == event.target.innerHTML){
      let machedIcon = event.target.firstChild.className
      // get the position of the icon in the array
      let iconIndexInArray = arrayOfIcons.indexOf(machedIcon)
      //remove the icon from the array so we don`t get duplicates.
      arrayOfIcons.splice(iconIndexInArray, 1);
      
      // counts the number of leftover cards
      countCards--;

      // creating attribute to let us know that card was matched
      event.target.setAttribute("isMatched", "True")
      event.target.classList.toggle ('matched');

      // check if the game is over, if not generate the next card
      if (countCards == 0) {
        alert('You won! you took ' + counterMoves + ' moves to win!');
      } else {    
        shuffleNextCard(arrayOfIcons)
      }

      // unblocking clicks on the card element
      event.target.parentElement.removeAttribute("isBlocked")        

    } else {
        event.target.classList.toggle ('show');        
        setTimeout(function(){ 
          event.target.classList.toggle ('show');

        // unblocking clicks on the card element
        event.target.parentElement.removeAttribute("isBlocked")
        }, 700);
    }
  }
}

// event listeners
startTheGame();
document.addEventListener('click', playerClick);
restartButton.addEventListener("click", restartTheGame)