function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}


const getWord = async () => {
    const wordAPI = "https://words.dev-apis.com/word-of-the-day"
    const promise = await fetch(wordAPI)
    const processedResponse = await promise.json();
    return processedResponse.word.toUpperCase()
}
let word = ""
getWord().then((fetchedWord) => { word = fetchedWord })

const WORD_LENGTH = 5
const MAX_GUESSES = 6
let currGuessLength = 0
let currGuessAttempt = 0
let currGuess = ""
const addLetter = (letter) => {
    if (currGuessLength >= 5) {
        // reach word length limit, do nothing
        return
    }
    const letterId = `#letter-${currGuessLength + currGuessAttempt * 5}`
    currGuess = currGuess + letter
    document.querySelector(letterId).innerText = letter
    currGuessLength += 1
}
const deleteLetter = () => {
    if (currGuessLength === 0) {
        // no letter to be delete, do nothing
        return
    }
    const letterId = `#letter-${currGuessLength + currGuessAttempt * 5 - 1}`
    currGuess = currGuess.slice(0, -1)
    document.querySelector(letterId).innerText = ""
    currGuessLength -= 1
}
const checkAnswer = (guess, guessAttempt) => {
    // check ans change style
    for (let i = 0; i < 5; i++) {
        let addClass = "wrong" // correct,close,wrong
        if (word.indexOf(guess[i]) > -1) {
            addClass = "close"
        }
        if (guess[i] === word[i]) {
            addClass = "correct"
        }
        // change letter style
        const letterId = `#letter-${i + guessAttempt * 5}`
        const element = document.querySelector(letterId)
        element.classList.add(addClass)
    }
}
const submitGuess = () => {
    if (currGuessLength !== 5) {
        // word not complete do nothing
        return
    }
    console.log("submit answer")
    // check answer
    checkAnswer(currGuess,currGuessAttempt)
    // set new state
    currGuessAttempt += 1
    currGuessLength = 0
    currGuess = ""
}
const handleKeydown = (key) => {
    if (isLetter(key)) {
        addLetter(key.toUpperCase())
    } else if (key === "Backspace") {
        deleteLetter()
    } else if (key === "Enter") {
        submitGuess()
    }
}
document.addEventListener(
    "keydown", (event) => {
        handleKeydown(event.key)
    }
)