let Pl1SecretNumber = [];
let player1Ready = false;
let pl1Results = "";

let Pl2SecretNumber = [];
let player2Ready = false;
let pl2Results = "";

//First player

function generatePlayer1Number() {
    let pl1Num = generateRandomNumber();
    temp = pl1Num[0]*1000 + pl1Num[1]*100 + pl1Num[2]*10 + pl1Num[3];
    document.getElementById("Pl1SecretNumber").value = temp;
}

function submitPl1Num() {
    let inputNumber = Number(document.getElementById("Pl1SecretNumber").value);
    validationOutput = isValidNumber(inputNumber);

    let temp = 0;
    if (validationOutput === "") {
        enterGuessModePl1();

        Pl1SecretNumber = inputNumber.toString(10).replace(/\D/g, '0').split('').map(Number);   
        player1Ready = true;
    }
    else {
        document.getElementById("validationOutputPl1").innerHTML = validationOutput;
    }
}

function enterGuessModePl1() {
    var x = document.getElementById("firstHalf");
    var y = document.getElementById("guessModePl1");
    x.style.display = "none";
    y.style.display = "block";
}

function submitPl1Guess() {
    if(player2Ready) {
        let inputGuess = document.getElementById("Pl1Guess").value;
        let validationOutput = isValidNumber(inputGuess);

        if (validationOutput === "") {
            let arrayGuess = inputGuess.toString(10).replace(/\D/g, '0').split('').map(Number);
            pl1Results += findBullsAndCows(arrayGuess, Pl2SecretNumber);

            document.getElementById("pl1Results").innerHTML = pl1Results;
        }
        else {
            document.getElementById("validationGuessPl1").innerHTML = validationOutput;
        }
    }
    else {
        document.getElementById("validationGuessPl1").innerHTML = "Wait for Player 2 to enter a secret number!";
    }
}

//Second player

function generatePlayer2Number() {
    let pl2Num = generateRandomNumber();
    temp = pl2Num[0]*1000 + pl2Num[1]*100 + pl2Num[2]*10 + pl2Num[3];
    document.getElementById("Pl2SecretNumber").value = temp;
}

function submitPl2Num() {
    let inputNumber = Number(document.getElementById("Pl2SecretNumber").value);
    validationOutput = isValidNumber(inputNumber);

    if (validationOutput === "") {
        enterGuessModePl2();

        Pl2SecretNumber = inputNumber.toString(10).replace(/\D/g, '0').split('').map(Number);   
        player2Ready = true;
    }
    else {
        document.getElementById("validationOutputPl2").innerHTML = validationOutput;
    }
}

function enterGuessModePl2() {
    var x = document.getElementById("secondHalf");
    var y = document.getElementById("igrata2");
    x.style.display = "none";
    y.style.display = "block";
}

function submitPl2Guess() {
    if(player1Ready) {
        let inputGuess = document.getElementById("Pl2Guess").value;
        let validationOutput = isValidNumber(inputGuess);

        if (validationOutput === "") {
            let arrayGuess = inputGuess.toString(10).replace(/\D/g, '0').split('').map(Number);
            pl2Results += findBullsAndCows(arrayGuess, Pl1SecretNumber);

            document.getElementById("pl2Results").innerHTML = pl2Results;
        }
        else {
            document.getElementById("validationGuessPl2").innerHTML = validationOutput;
        }
    }
    else {
        document.getElementById("validationGuessPl2").innerHTML = "Wait for Player 1 to enter a secret number!";
    }
}

//Utility functions

function generateRandomNumber() {
    let randomNumbers = new Array(4);
    let temp = 0
    let i = 1;
    let j = 0;

    randomNumbers[0] = Math.floor(Math.random() * 9) + 1;
    while (j <= 0) {
        temp = Math.floor(Math.random() * 10);
        if (randomNumbers.indexOf(temp) < 0) {
            randomNumbers[i] = temp;
            i++;
            if (i == 4) break;
        }
        else j = 0;
    }

    ifGenerated = 1;
    return randomNumbers;
}

function isValidNumber(number) {
    let output = ""

    if (number == 0) {
        output = "Enter 4 digit number";
        return output;
    }
    if (number / 1000 < 1) {
        output = "Enter 4 digit number";
        return output;
    }
    if (number / 1000 >= 10) {
        output = "Enter 4 digit number";
        return output;
    }

    let arrMyNumber = number.toString(10).replace(/\D/g, '0').split('').map(Number);
    let tempCounter = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j <= 4; j++) {
            if (arrMyNumber[i] == arrMyNumber[j]) tempCounter++;
        }
    }
    if (tempCounter > 0) {
        output = "Enter 4 different number";
    }

    return output;
}

function findBullsAndCows(guessNumber, checkNumber) {
    let result = "";
    let cows = 0;
    let bulls = 0;

    for (let j = 0; j < 4; j++) {
        if (checkNumber.indexOf(guessNumber[j]) >= 0) {
            cows++;
            if (guessNumber.indexOf(guessNumber[j]) == checkNumber.indexOf(guessNumber[j])) {
                cows--;
                bulls++;
            }
        }
    }

    let prettierGuessNumber = guessNumber[0] * 1000 + guessNumber[1] * 100
                                + guessNumber[2] * 10 + guessNumber[3]; 
    if (cows == 1 && bulls == 1) {
        result = "<br>" + prettierGuessNumber.toString() + " - " + cows + " cow and " + bulls + " bull";
    }
    else if (cows == 1 && bulls != 1) {
        result = "<br>" + prettierGuessNumber.toString() + " - " + cows + " cow and " + bulls + " bulls";
    }
    else if (cows != 1 && bulls == 1) {
        result = "<br>" + prettierGuessNumber.toString() + " - " + cows + " cows and " + bulls + " bull";
    }
    else if (cows == 0 && bulls == 0) {
        result = "<br>" + prettierGuessNumber.toString() + " - " + "nothing";
    }
    else if (bulls == 4) {
        result = "<br>" + prettierGuessNumber.toString() + " is the secret number!";
    }
    else {
        result = "<br>" + prettierGuessNumber.toString() + " - " + cows + " cows and " + bulls + " bulls";
    }
    
    return result;
}