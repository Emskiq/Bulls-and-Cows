//computer variables
let specialNumbers = [];
let compSecretNum = [];
let possibleNumbers = [];
let possibleNumbers2 = [];
let compTryCount = -1;
let gNumber = [];
let tBulls;
let tCows;
let item = 0;
let compResults = "";

//player variables
let playerResults = "";

function generateSpecialNumbers() {
    for (i = 1023; i <= 9876; i++) {
        let tempBr = 0;
        let thisNum = i.toString(10).replace(/\D/g, "0").split("").map(Number);
        for (let j = 0; j < 4; j++) {
            for (let k = j + 1; k <= 4; k++) {
                if (thisNum[j] == thisNum[k]) tempBr++;
            }
        }
        if (tempBr == 0) {
            specialNumbers.push(i);
        }
    }
}

function generateComputerNumber() {
    let temp = 0;
    let i = 1;
    let j = 0;
    compSecretNum[0] = Math.floor(Math.random() * 9) + 1;
    while (j <= 0) {
        temp = Math.floor(Math.random() * 10);
        if (compSecretNum.indexOf(temp) < 0) {
            compSecretNum[i] = temp;
            i++;
            if (i == 4) break;
        } else j = 0;
    }
}

function computerTry() {
    if (compTryCount == -1) {
        generateSpecialNumbers();
        item = specialNumbers[Math.floor(Math.random() * specialNumbers.length)];
        document.getElementById("guesses").innerHTML = item;

        var x = document.getElementById("initialText");
        x.style.display = " none";
        var z = document.getElementById("compRes");
        z.style.display = "block";

        compTryCount++;
    }
    else if (compTryCount == 0) {
        tBulls = Number(document.getElementById("bikove").value);
        tCows = Number(document.getElementById("kravi").value);
        generateCompResults();
        gNumber = item.toString(10).replace(/\D/g, "0").split("").map(Number);

        for (let i = 0; i < 4326; i++) {
            let tempArr = specialNumbers[i].toString(10).replace(/\D/g, "0").split("").map(Number);
            let bikove = 0;
            let kravi = 0;

            for (let j = 0; j < 4; j++) {
                if (tempArr.indexOf(gNumber[j]) == gNumber.indexOf(gNumber[j])) {
                    bikove++;
                }
                else if (tempArr.indexOf(gNumber[j]) >= 0) {
                    kravi++;
                }
            }

            if (bikove == tBulls && kravi == tCows) {
                possibleNumbers.push(specialNumbers[i]);
            }
        }
        compTryCount ++;

        document.getElementById("resOutput").innerHTML = possibleNumbers;
        item = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
        document.getElementById("guesses").innerHTML = item;
    }
    else if (computerTry == 1) {
        tBulls = Number(document.getElementById("bikove").value);
        tCows = Number(document.getElementById("kravi").value);
        generateCompResults();

        gNumber = item.toString(10).replace(/\D/g, "0").split("").map(Number);

        for (let i = 0; i < possibleNumbers.length; i++) {
            let tempArr = possibleNumbers[i].toString(10).replace(/\D/g, "0").split("").map(Number);
            let bikove = 0;
            let kravi = 0;
            for (let j = 0; j < 4; j++) {
                if (gNumber.indexOf(gNumber[j]) == tempArr.indexOf(gNumber[j])) {
                    bikove++;
                } else if (tempArr.indexOf(gNumber[j]) >= 0) {
                    kravi++;
                }
            }
            if (bikove == tBulls && kravi == tCows) {
                possibleNumbers2.push(possibleNumbers[i]);
            }
        }

        possibleNumbers = possibleNumbers2;
        document.getElementById("resOutput").innerHTML = possibleNumbers;
        item = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
        document.getElementById("guesses").innerHTML = item;
        compTryCount ++;
    }
    else {
        tBulls = Number(document.getElementById("bikove").value);
        tCows = Number(document.getElementById("kravi").value);
        generateCompResults();

        gNumber = item.toString(10).replace(/\D/g, "0").split("").map(Number);

        possibleNumbers2 = [];

        for (let i = 0; i < possibleNumbers.length; i++) {
            let tempArr = possibleNumbers[i].toString(10).replace(/\D/g, "0").split("").map(Number);
            let kravi = 0;
            let bikove = 0;

            for (let j = 0; j < 4; j++) {
                if (tempArr.indexOf(tempArr[j]) == gNumber.indexOf(tempArr[j])) {
                    bikove++;
                } 
                else if (gNumber.indexOf(tempArr[j]) >= 0) {
                    kravi++;
                }
            }

            if (bikove == tBulls && kravi == tCows) {
                possibleNumbers2.push(possibleNumbers[i]);
            }
        }
        possibleNumbers = possibleNumbers2;

        if (possibleNumbers.length <= 0) {
            document.getElementById("guesses").innerHTML = "Are you sure about the results you gave me?";
        } 
        else {
            document.getElementById("resOutput").innerHTML = possibleNumbers;
            item = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
            document.getElementById("guesses").innerHTML = item;
        }
    }
}


function generateCompResults() {
    if (tCows == 1 && tBulls == 1) {
        compResults += "<br>" + item.toString() + " - " + tCows + " cow and " + tBulls + " bull";
    }
    else if (tCows == 1 && tBulls != 1) {
        compResults += "<br>" + item.toString() + " - " + tCows + " cow and " + tBulls + " bulls";
    }
    else if (tCows != 1 && tBulls == 1) {
        compResults += "<br>" + item.toString() + " - " + tCows + " cows and " + tBulls + " bull";
    }
    else if (tCows == 0 && tBulls == 0) {
        compResults += "<br>" + item.toString() + " - " + "nothing";
    }
    else if (tBulls == 4) {
        compResults += "<br>" + item.toString() + " is the secret number!";
    }
    else {
        compResults += "<br>" + item.toString() + " - " + tCows + " cows and " + tBulls + " bulls";
    }

    document.getElementById("compGuesses").innerHTML = compResults;
}


function submitGuess() {
    let playerGuess = Number(document.getElementById("FPguess").value);
    let validationOutput = isValidNumber(playerGuess);

    if (validationOutput === "") {
        playerGuess = playerGuess.toString(10).replace(/\D/g, '0').split('').map(Number);

        playerResults += findBullsAndCows(playerGuess, compSecretNum);
        document.getElementById("playerResults").innerHTML = playerResults;
        compTurn();
    }
    else {
        document.getElementById("validationGuess").innerHTML = validationOutput;
    }
}

function compTurn() {
    var x = document.getElementById("myGuess");
    var y = document.getElementById("computerPl");
    var z = document.getElementById("guesses");
    y.style.display = "block";
    x.style.display = "none";
    z.style.display = "block";
    
    if(compTryCount == -1) {
        computerTry();
    }
}

function playerTurn() {
    var x = document.getElementById("myGuess");
    var y = document.getElementById("computerPl");
    var z = document.getElementById("guesses");
    y.style.display = "none";
    x.style.display = "block";
    z.style.display = "none";

    computerTry();
}

function arrToNum(arr) {
    let number;
    number = arr[0] * 1000 + arr[1] * 100 + arr[2] * 10 + arr[3];
    return number;
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

    let prettierGuessNumber = arrToNum(guessNumber); 
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