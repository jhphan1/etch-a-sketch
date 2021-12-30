// Put grid squares inside "container" div
const container = document.querySelector(".container");

// Create default 16x16 grid with black ink
makeGrid(16);
drawBlack();

// Create reset button to clear grid and prompt user for size of next grid
const reset = document.querySelector(".reset");
reset.addEventListener("click", resetGrid);

// Add functions to all buttons
const black = document.querySelector(".black");
black.addEventListener("click", drawBlack);

const rainbow = document.querySelector(".rainbow");
rainbow.addEventListener("click", drawRainbow);

const greyscale = document.querySelector(".greyscale");
greyscale.addEventListener("click", drawGreyscale);

const eraser = document.querySelector(".eraser");
eraser.addEventListener("click", eraserMode);


function makeGrid(N) {
    // Find N squared to create grid with N squares per side
    let squaredN = N * N;

    // Set square width based on 400 / N rounded down to fit grid
    let squareWidth = Math.floor(400 / N);

    for (let i = 0; i < squaredN; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        div.style.width = squareWidth + "px";

        container.appendChild(div);
    }
}


function resetGrid() {
    // Repeat prompt until user input meets all criteria
    let answer;
    do {
        answer = parseInt(prompt("For new grid, how many squares per side do you want? (Max: 100, Min: 1)"));
    }
    while (isNaN(answer) || answer < 1 || answer > 100);

    // Delete current grid
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Create new grid based on user input. Use default black ink.
    makeGrid(answer);
    drawBlack();
}


function drawBlack() {
    // Select all squares
    let squares = document.querySelectorAll(".square");

    // Remove greyscale effect and reset opacity
    squares.forEach(square => square.removeEventListener("mouseover", incrementOpacity));
    squares.forEach(square => square.addEventListener("mouseover", resetOpacity));

    // Add mouseover event listener to each square to trigger black background
    squares.forEach(square => square.addEventListener("mouseover", () => square.style.backgroundColor = "black"));
}


function drawRainbow() {
    // Select all squares
    let squares = document.querySelectorAll(".square");

    // Remove greyscale effect and reset opacity
    squares.forEach(square => square.removeEventListener("mouseover", incrementOpacity));
    squares.forEach(square => square.addEventListener("mouseover", resetOpacity));

    // Add mouseover event listener to each square to trigger random rainbow background
    squares.forEach(square => square.addEventListener("mouseover", () => square.style.backgroundColor = createRandomRGB()));
}

function createRandomRGB() {
    // Generate random values between 0 and 256 for R, G, and B
    let R = Math.floor(Math.random() * (257));
    let G = Math.floor(Math.random() * (257));
    let B = Math.floor(Math.random() * (257));

    return `rgb(${R}, ${G}, ${B})`
}


function drawGreyscale() {
    // Select all squares
    let squares = document.querySelectorAll(".square");

    // Remove resetOpacity event listener
    squares.forEach(square => square.removeEventListener("mouseover", resetOpacity));

    // Add mouseover event listener to each square to trigger transparent black background
    squares.forEach(square => square.addEventListener("mouseover", () => square.style.backgroundColor = "black"));
    squares.forEach(square => square.addEventListener("mouseover", incrementOpacity));
}


function incrementOpacity(event) {
    // Find the opacity of square
    const cssObj = window.getComputedStyle(event.target, null);
    let opacity = cssObj.getPropertyValue("opacity");

    // If opacity = 1, change it to black with 0.1
    if (opacity == 1) {
        newOpacity = 0.1;
        event.target.style.opacity = newOpacity;
    } else {
    // Else, increment opacity
        newOpacity = Number(opacity) + 0.1;
        event.target.style.opacity = newOpacity;
        // Stop when fully opaque
        if (newOpacity == 1) {
            event.target.removeEventListener("mouseover", incrementOpacity);
        }
    }
}


function resetOpacity(event) {
    event.target.style.opacity = 1.0;
}


function eraserMode() {
    // Select all squares
    let squares = document.querySelectorAll(".square");

    // Remove greyscale effect and reset opacity
    squares.forEach(square => square.removeEventListener("mouseover", incrementOpacity));
    squares.forEach(square => square.addEventListener("mouseover", resetOpacity));

    // Add mouseover event listener to each square to trigger white background
    squares.forEach(square => square.addEventListener("mouseover", () => square.style.backgroundColor = "white"));
}