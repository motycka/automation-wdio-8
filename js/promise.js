const secretNumber = 42;

function guessNumber(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number === secretNumber) {
                resolve()
            } else {
                reject();
            }
        }, 3000);
    });
}

console.log("[A] Guessing number");
guessNumber(41)
    .then(() => console.log("[A] I guessed correctly :)"))
    .catch(() => console.log("[A] I missed :("));

// nebo

console.log("[B] Guessing number");
guessNumber(42)
    .then(() => {
        return "[B] I guessed correctly :)"
    })
    .catch(() => {
        return "[B] I missed :("
    })
    .then((result) => console.log(result))

