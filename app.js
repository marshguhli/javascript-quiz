
  /* Načtení herního divu/pole a spanu z H2 v HTML*/
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score")


  /* Zapsání const s žánry otázek (KDE,KDY,..), 
  (ke každému žánru jsou 3 otázky), odpovědi a úroveň složitosti otázky. 
  */
const jeopardyCategories = [
  {
    genre: "KDO",
    questions: [
      {
        question: "Kdo hraje záporáka v Červené Karkůlce?",
        answers: ["Čaroděj", "Vlk"],
        correct: "Vlk",
        level: "easy",
      },
      {
        question: "Kdo byl Václav Klaus?",
        answers: ["Skladatel", "Prezident"],
        correct: "Prezident",
        level: "medium",
      },
      {
        question: "Kdo v roce 1810 vynalezl plechovku na konzervování potravin?",
        answers: ["Daniel Wolf", "Petr Durand"],
        correct: "Petr Durand",
        level: "hard",
      },
    ],
  },
  {
    genre: "KDE",
    questions: [
      {
        question: "Kde žije lev?",
        answers: ["v Africe", "na Sibiři"],
        correct: "v Africe",
        level: "easy",
      },
      {
        question: "Kde se natáčelo Slunce, seno?",
        answers: ["Hošticích u Volyně", "Strakonice"],
        correct: "Hošticích u Volyně",
        level: "medium",
      },
      {
        question: "Kde se narodil Karel Hynek Mácha?",
        answers: ["v Praze, na Újezdě v domě U Bílého koně", "v Praze, na Újezdě v domě U Bílého orla"],
        correct: "v Praze, na Újezdě v domě U Bílého orla",
        level: "hard",
      },
    ],
  },
  {
    genre: "KDY",
    questions: [
      {
        question: "Kdy začíná babí léto?",
        answers: ["koncem října nebo začátkem listopadu", "na konci září nebo v říjnu"],
        correct: "na konci září nebo v říjnu",
        level: "easy",
      },
      {
        question: "Kdy začala 2. sv. válka?",
        answers: ["1939", "1940"],
        correct: "1939",
        level: "medium",
      },
      {
        question: "Kdy byly vynalezeny optické čočky?",
        answers: ["1910", "1887"],
        correct: "1887",
        level: "hard",
      },
    ],
  },
  {
    genre: "CO",
    questions: [
      {
        question: "Co patří k čeledi medvědovitých?",
        answers: ["panda", "koala"],
        correct: "panda",
        level: "easy",
      },
      {
        question: "Co je libra?",
        answers: ["měna ve Velké Británii", "měna v Norsku"],
        correct: "měna ve Velké Británii",
        level: "medium",
      },
      {
        question: "Co vynalezl vědec Otto Wichterle?",
        answers: ["punčochy", "kšandy"],
        correct: "punčochy",
        level: "hard",
      },
    ],
  },
  {
    genre: "KOLIK",
    questions: [
      {
        question: "Kolik má rok dní?",
        answers: ["365", "358"],
        correct: "365",
        level: "easy",
      },
      {
        question: "Kolik Kč je 1 Euro?",
        answers: ["pod 20 Kč", "pod 25 Kč"],
        correct: "pod 25 Kč",
        level: "medium",
      },
      {
        question: "Kolik států ma Amerika?",
        answers: ["48", "50"],
        correct: "50",
        level: "hard",
      },
    ],
  },
];

let score = 0

/*Funkce - Vytvoří se div s názvem column 
a třídou ,,genre-column" a v každém z nich je umístěn poté ,,genre'', 
nebo-li žánr (KDE, KDY,..) s třídou/class ,,genre-title''. 
"*/
function addCategory(category) {
  
  /* column div*/
  const column = document.createElement("div");
  column.classList.add("genre-column");

  /* Div v divu*/
  const genreTitle = document.createElement("div");
  genreTitle.classList.add("genre-title");
  genreTitle.innerHTML = category.genre;

  /* Přidání genre-title do genre-column*/
  column.appendChild(genreTitle);
  game.append(column);

  /* Přidání Divu s třídou/class 'card' s tím, že s cyklem for načteme 
  do každého divu 'card' otázku, odpovědi, správnou odpověď, body*/
  category.questions.forEach(question => {
    const card = document.createElement('div')
    card.classList.add('card')
    column.append(card)

    /* Přiřazení bodů podle obtážnosti otázky ('level'*/
    if(question.level === 'easy') {
      card.innerHTML = 100
    }
    if(question.level === 'medium') {
      card.innerHTML = 200
    }
    if(question.level === 'hard') {
      card.innerHTML = 350
    }

    /* Nastavení hodnoty na zadaném prvku*/
    card.setAttribute('data-question', question.question)
    card.setAttribute('data-answer-1', question.answers[0])
    card.setAttribute('data-answer-2', question.answers[1])
    card.setAttribute('data-correct',question.correct)
    card.setAttribute('data-value', card.getInnerHTML())
 /* Po kliknutí na div se spustí funkce flipCard */
    card.addEventListener('click', flipCard)

  })

}

/* Kategorie otázek se sekcí KDE/KDY/... 
a je prohnáno funkcí cyklu a elementy div jsou načteny na stránce.
 */
jeopardyCategories.forEach((category) => addCategory(category));

/* Funkce, kde po kliknutí na div nastane změna a zobrazí se otázka, 2 tlačítka, atd..*/
function flipCard() {
/*,,Vyprázdnění'' HTML textu*/
  this.innerHTML=""
/* změna velikosti písma a mezery mezi tlačítky a otázkou*/
  this.style.fontSize="15px"
  this.style.lineHeight= "30px"
/* Vytvoření divu a jeho class, přidání hodnoty(text otázky) k divu. 
  Vytvoření 2 tlačítek*/
  const textDisplay = document.createElement('div')
  textDisplay.classList.add('card-text')
  textDisplay.innerHTML= this.getAttribute('data-question')
  const firstButton= document.createElement('button')
  const secondButton= document.createElement('button')
/* Přiřazení Class k tlačítkům*/
  firstButton.classList.add('first-button')
  secondButton.classList.add('second-button')
/* Přiřazení hodnot otázek k tlačítkům*/
  firstButton.innerHTML= this.getAttribute('data-answer-1')
  secondButton.innerHTML= this.getAttribute('data-answer-2')
/* Přiřazení eventListener k tlačítkům, po kliknutí se spustí funkce getResult*/
  firstButton.addEventListener('click', getResult)
  secondButton.addEventListener('click', getResult)

  this.append(textDisplay, firstButton, secondButton)

  /* Jestliže byla karta (card) již kliknuta, nemůže být poté kliknuta znovu. 
  První jsme vzali div card a poté vymazali pro každou z nich event*/
  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach(card => card.removeEventListener('click', flipCard))

}
/* Získání výsledku*/
function getResult() {
  /* Přidání eventListeneru, protože jinak lze odpovědět jen na jednu otázku a zbytek už ne*/
  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach(card => card.addEventListener ('click', flipCard))
/*rodič/nadřazený element tlačítkům/odpovědím*/
  const cardOfButton = this.parentElement  
  console.log('cardOfButton', cardOfButton)
/* Jestliže je klidnuto na data-correct class tak se vykoná funkce.
Jestliže data-correct se rovná html správné odpovědi, tak se provede if, jinak se provede else.
Získáváme hodnotu data-value, což je hodnota s Bodama (score), která se poté vypíše.
*/
  if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
    /*Získání z cardOfButton(rodič otázky/odpovědi/value) data-of-value (hodnotu bodů).
    Prohnat to parseInt, aby bylo zaručeno, že jde o číslo. data-of-value se poté přičte ke score/body
    a ukáže se v H2 na stránce.*/
    score = score + parseInt(cardOfButton.getAttribute('data-value'))
    scoreDisplay.innerHTML= score
    /*Přidání class/třidy k cardOfButton*/
    cardOfButton.classList.add('correct-answer')
    /*změna z otázka/odpověď na udělení bodů podle odpovědi*/
    setTimeout(() => {
      /*while se zbavuje lastChild až zbyde jen jeden a je z něj firstChild a ten se také odstraní*/
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)

      }/*Zobrazí body za otázku*/
      cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')

    }, 100)/*100ms */
    /* Jestliže je klidnuto na wrong-answer class tak se vykoná funkce*/
  } else {
    cardOfButton.classList.add('wrong-answer')
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)

      }
      cardOfButton.innerHTML = 0
    }, 100)

  }
  cardOfButton.removeEventListener('click', flipCard)
}
