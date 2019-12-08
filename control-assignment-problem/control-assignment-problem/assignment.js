const randomNumber2 = Math.random(); // produces random number between 0 (including) and 1 (excluding)
let condition = true;
let numbers = [];
while(condition) {
    const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
    numbers.push(randomNumber)
    if ((randomNumber > 0.7) && (randomNumber2 > 0.7)) {
        alert('Both greater than 0.7');
        condition = false;
    }

    if ((randomNumber < 0.2) || (randomNumber2 < 0.2)) {
        alert('One Less than 0.2');
        condition = false;
    }
}

for (let i = numbers.length; i > 0; i--) {
    console.log(numbers[i]);
}

for (const num of numbers) {
    console.log(num);
}