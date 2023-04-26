const secretNumber = 42;

async function guessNumber(number) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return number === secretNumber;
}


console.log("Guessing number" );

const isCorrect = await guessNumber(42);

if (isCorrect) {
    console.log("I guessed correctly :)");
} else {
    console.log("I missed :(")
}
