const secretNumber = 42;

function guessNumber(number, onCorrect, onMiss) {
    setTimeout(() => {
        if (number === secretNumber) {
            onCorrect()
        } else {
            onMiss();
        }
    }, 3000);
}

console.log("Guessing number");

guessNumber(42,
    () => console.log("I guessed correctly :)"),
    () => console.log("I missed :(")
);

console.log("Awaiting results ...");
