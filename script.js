const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;


const COLORS = [
  {
    id: 1,
    name: 'javascript',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png'
  },
  {
    id: 2,
    name: 'css3',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png'
  },
  {
    id: 3,
    name: 'html5',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png'
  },
  {
    id: 4,
    name: 'safari',
    img:
      'https://res.cloudinary.com/henryzarza/image/upload/v1601735663/General%20assets/safari_mw13q8.png'
  },
  {
    id: 5,
    name: 'rails',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png'
  },
  {
    id: 6,
    name: 'node',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png'
  },
  {
    id: 7,
    name: 'react',
    img:
      'https://res.cloudinary.com/henryzarza/image/upload/v1601735662/General%20assets/react_m1pmwj.png'
  },
  {
    id: 8,
    name: 'angular',
    img:
      'https://res.cloudinary.com/henryzarza/image/upload/v1601735662/General%20assets/angular_qqblks.png'
  },
  {
    id: 9,
    name: 'vuejs',
    img:
      'https://res.cloudinary.com/henryzarza/image/upload/v1601735662/General%20assets/vue_ctikzd.png'
  },
  {
    id: 10,
    name: 'svelte',
    img:
      'https://res.cloudinary.com/henryzarza/image/upload/v1601735662/General%20assets/svelte_keupr5.png'
  },
  {
    id: 11,
    name: 'chrome',
    img:
      'https://res.cloudinary.com/henryzarza/image/upload/v1601735663/General%20assets/chrome_lr919s.png'
  },
  {
    id: 12,
    name: 'mozilla',
    img:
      'https://res.cloudinary.com/henryzarza/image/upload/v1601735663/General%20assets/mozilla_us5y7o.png'
  }
];

// const COLORS = [
//   "red", "green", "yellow", 
//   "blue", "purple",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("game over!");
}

createDivsForColors(shuffledColors);
