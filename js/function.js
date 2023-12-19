
function myComplicatedFunction() {
    const myConst = 'Suma';
    let sum = 0;

    function myInnerFunction(number) {
        sum = sum + number;
    }

    myInnerFunction(2);
    myInnerFunction(3);
    myInnerFunction(5);

    return `${myConst} = ${sum}`
}

const result = myComplicatedFunction();
console.log(result);



function testIt(testName, testFunction) {

    console.log(`Test: ${testName}`);

    testFunction();

    console.log('Test is done, reporting');
}


testIt('My test', () => {
    console.log('... my test ...');
});



