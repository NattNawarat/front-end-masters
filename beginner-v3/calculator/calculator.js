let state = {
    numCache: 0,
    operation: "",
}
function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

const setScreen = (numString) => {
    const screen = document.querySelector(".screen")
    screen.innerText = numString
}

const getScreen = () => {
    const screen = document.querySelector(".screen")
    return screen.innerText
}

const addDigit = (digit) => {
    const numString = getScreen()
    if (numString === "0") {
        setScreen(digit)
    } else {
        setScreen(numString + digit)
    }
}

const clearState = () => {
    state = {
        numCache: 0,
        operation: "",
    }
}

const clear = () => {
    setScreen("0")
    clearState()
}

const handleButtonClick = (buttonInput) => {
    if (isNumeric(buttonInput)) {
        addDigit(buttonInput)
    } else {
        if (buttonInput === "C") {
            clear()
        }
        else if (buttonInput === "←") {
            const numString = getScreen()
            if (numString.length !== 1) {
                setScreen(numString.substring(0, numString.length - 1))
            } else {
                setScreen(0)
            }
        }
        else if (buttonInput !== "=") {
            // set state
            const numString = getScreen()
            state.numCache = Number(numString)
            state.operation = buttonInput
            setScreen("0")
        }
        else {
            //calculate 
            const numString = getScreen()
            const numScreen = Number(numString)
            if (state.operation === "+") {
                const displayNum = String(state.numCache + numScreen)
                setScreen(displayNum)
                clearState()
            }
            if (state.operation === "-") {
                const displayNum = String(state.numCache - numScreen)
                setScreen(displayNum)
                clearState()
            }
            if (state.operation === "×") {
                const displayNum = String(state.numCache * numScreen)
                setScreen(displayNum)
                clearState()
            }
            if (state.operation === "÷") {
                const displayNum = String((state.numCache / numScreen).toFixed(0))
                setScreen(displayNum)
                clearState()
            }
        }
    }
}

document
    .querySelector(".cal-btns")
    .addEventListener("click", function (event) {
        handleButtonClick(event.target.innerText)
    });
