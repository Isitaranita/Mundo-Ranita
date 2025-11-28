const words = ["HOUSE", "PONY", "CAR", "CAT", "BEACH", "WORLD", "WOOD",
    "PAIR", "PENCIL", "FROG", "LOVE", "PAPER", "SNAKE", "GLASS"];

let HP = 5;
let ranIndexChoose = "";
let wordChosen = [];
let gameActive = false;

// Mostrar vidas iniciales
function lifeUpdate(){
    document.getElementById("lifeCount").textContent = "♥".repeat(HP) + " (" + HP + ")";
}

function startGame() {
    // Elegir palabra aleatoria
    let randomChoose = Math.floor(Math.random() * words.length);
    ranIndexChoose = words[randomChoose];
    console.log("Chosen word", ranIndexChoose);

    // Reiniciar HP
    HP = 5;
    lifeUpdate()

    // Reiniciar espacios
    wordChosen = Array(ranIndexChoose.length).fill("_");
    document.getElementById("spaces").textContent = wordChosen.join(" ");

    // Reiniciar ahorcado
    updateAhorcado();

    // Reiniciar ranita
    const ranita = document.getElementById("ranita");
    ranita.src = "media/ranitaEnLlamas.png";
    ranita.style.animation = "none";
    ranita.style.transform = "scale(1) translate(0,0)";
    void ranita.offsetWidth;

    // Activar juego
    gameActive = true;

    // Habilitar teclado
    enableKeyboard();

    // Cambiar texto del botón
    document.getElementById("play").textContent = "Play again";

    // Elegir una letra aleatoria de la palabra
    let randomLetterIndex = Math.floor(Math.random() * ranIndexChoose.length);
    let randomLetter = ranIndexChoose[randomLetterIndex];
    console.log("Letra elegida al azar:", randomLetter);
    disableLetter(randomLetter)
    wordVer(randomLetter, true); // true = es elección automática
}

// ======== CONTROL TECLADO ========
function disableKeyboard() {
    document.querySelectorAll("#teclado div").forEach(div => {
        div.style.pointerEvents = "none";
        div.style.backgroundColor = "#999";
    });
}

function enableKeyboard() {
    document.querySelectorAll("#teclado div").forEach(div => {
        div.style.pointerEvents = "auto";
        div.style.backgroundColor = "#46c748";
    });
}

// ======== ACTUALIZAR AHORCADO ========
function updateAhorcado() {
    const ahorcado = document.getElementById("ahorcado");
    let index = 5 - HP;
    if (index < 0) index = 0;
    if (index > 5) index = 5;
    ahorcado.src = `media/ahorcado${index}.png`;
}

// ======== ANIMACIONES RANITA ========
function animateRanitaAtk(currentHP) {
    const ranita = document.getElementById("ranita");
    ranita.style.animation = "none";
    void ranita.offsetWidth;
    ranita.style.animation = "ranitaAtaque 0.5s forwards";

    setTimeout(() => {
        updateAhorcado();
    }, 500);

    ranita.addEventListener("animationend", () => {
        ranita.style.animation = "";
    }, { once: true });
}

function animateRanitaHappy() {
    const ranita = document.getElementById("ranita");
    ranita.style.animation = "none";
    void ranita.offsetWidth;
    ranita.style.animation = "ranitaFeliz 0.25s linear 3";
    ranita.addEventListener("animationend", () => ranita.style.animation = "", { once: true });
}

function animateRanitaReHappy() {
    const ranita = document.getElementById("ranita");
    ranita.style.animation = "none";
    void ranita.offsetWidth;
    ranita.style.animation = "ranitaReFeliz 0.1s linear 50";
    ranita.addEventListener("animationend", () => ranita.style.animation = "", { once: true });
}

function animateRanitaSayayin() {
    const ranita = document.getElementById("ranita");
    ranita.style.animation = "none";
    void ranita.offsetWidth;
    ranita.style.animation = "ranitaSayayin 2.5s forwards";
    setTimeout(() => {
        ranita.src = "media/ranitaenllamassobreranitaenllamasllamaaranitaenllamassobreranitaenllamas.jpg";
        ranita.style.transform = "scale(1) translate(0,0)";
    }, 1500);

    // Mostrar alerta y deshabilitar teclado solo una vez al terminar la animación
    ranita.addEventListener("animationend", () => {
        ranita.src = "media/ranitaenllamassobreranitaenllamasllamaaranitaenllamassobreranitaenllamas.jpg";
        ranita.style.transform = "scale(1) translate(0,0)";
        disableKeyboard();
        gameActive = false;
    }, { once: true });
}

function wordVer(id, automatic = false) {
    if (!gameActive) return; 

    let found = false;

    for (let i = 0; i < ranIndexChoose.length; i++) {
        if (ranIndexChoose[i] === id) {
            wordChosen[i] = id;
            found = true;
        }
    }

    if (found) {
        document.getElementById("spaces").textContent = wordChosen.join(" ");
        if (!automatic) animateRanitaHappy();

        if (!wordChosen.includes("_")) {
            document.getElementById("confirmar").textContent = "You win! Froggie is happy now. ✨";
            animateRanitaReHappy();
            disableKeyboard();
            gameActive = false;
        }
    } else {
        if (!automatic) animateRanitaAtk(HP);
        HP--;
        lifeUpdate()
        if (HP <= 0) {
            document.getElementById("confirmar").textContent = "You lose! The word was " + ranIndexChoose + ". 💔"
            animateRanitaSayayin();
            disableKeyboard();
            gameActive = false;
        }
    }

    if (!automatic) disableLetter(id);
}

function disableLetter(id) {
    let keyDiv = document.getElementById(id);
    keyDiv.style.backgroundColor = "#999";
    keyDiv.style.pointerEvents = "none";
}

window.onload = () => {
    lifeUpdate()
    disableKeyboard();
    updateAhorcado()

    const ranita = document.getElementById("ranita");
    ranita.src = "media/ranitaEnLlamas.png";
    ranita.style.animation = "none";
    ranita.style.transform = "scale(1) translate(0,0)";
};