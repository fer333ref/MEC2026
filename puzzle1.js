
const intendedOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let currentOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//yet to implement
async function nextScreen() {
    await wait(10000);
    console.log("Todo")
}

/*adjacent checks if a piece between to a and b can slide*/
const adjacent = (a, b) =>
    (a == 6 && b == 9) || (a == 9 && b == 6) ||
    (a < 9 && b < 9 && (Math.abs(a - b) == 3 ||
        ((Math.abs(a - b) == 1)
            && (Math.floor(a / 3) == Math.floor(b / 3)))));

// moves block if adjacent slidable
function move(n) {
    const b = currentOrder.indexOf(10);
    if (!adjacent(n, b)) return;
    [currentOrder[n], currentOrder[b]] = [currentOrder[b], currentOrder[n]]; //swapidiswap
    AGAIN();
}

// function that places the pieces into their positions
async function AGAIN() {
    currentOrder.forEach((i, n) => {
        const piece = document.getElementById("p" + i);
        if (n == 9) {
            piece.style.left = "0%"
            piece.style.top = "100%"
        }
        else {
            piece.style.left = (n % 3) * 33.333333 + "%";
            piece.style.top = Math.floor(n / 3) * 33.333333 + "%";
        }
        if (intendedOrder == currentOrder) {
            console.log(true);
            nextScreen(); //pause for 10 seconds to let them take it in
        } else {
            console.log(false)
        }
    });
}

for (let i = 1; i <= 9; i++)
    document.getElementById("p" + i).onclick = () => move(currentOrder.indexOf(i));


for (let i = 0; i < 200; i++) move(Math.floor(Math.random() * 10));
AGAIN();

console.log(currentOrder)