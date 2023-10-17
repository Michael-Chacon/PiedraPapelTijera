const sectionAtaque = document.getElementById("section-ataque")
const btnPiedra = document.getElementById("piedra")
const btnPapel = document.getElementById("papel")
const btnTijera = document.getElementById("tijera")
const btnSeleccion = document.getElementById("btn-seleccionar")

const sectionResultado = document.getElementById("section-resultado")
const mostrarResultado = document.getElementById("resultado")
const sectionReiniciar = document.getElementById("reiniciar")
const imgAtaqueJugador = document.getElementById("img-ataque-jugador")
const imgAtaqueEnemigo = document.getElementById("img-ataque-enemigo")
const nombreAtaqueJugador = document.getElementById("nombre-ataque-jugador")
const nombreAtaqueEnemigo = document.getElementById("nombre-ataque-enemigo")
const playerLives = document.getElementById("vidas-jugador")
const enemyLives = document.getElementById("vidas-enemigo")
const tie = document.getElementById("empates")

let ataquesJuagdor = []
let ataquesEnemigo = []
let vidasJugador = 0
let vidasEnemigo = 0
let empates = 0


function iniciarJuego(){
   botones = document.querySelectorAll(".BAtaque")
}


sectionReiniciar.addEventListener("click", reiniciarJuego)

function reiniciarJuego(){
    location.reload()
}

btnPiedra.addEventListener("click", () =>{
    ataquesJuagdor.push("Piedra")
    btnPiedra.disabled = true
    btnPiedra.style.background = "#6D5D6E"
    validateNumberAttacks()
})


btnPapel.addEventListener("click", () =>{
    ataquesJuagdor.push("Papel")
    btnPapel.disabled = true
    btnPapel.style.background = "#6D5D6E"
    validateNumberAttacks()
})


btnTijera.addEventListener("click", () =>{
    ataquesJuagdor.push("Tijera")
    btnTijera.disabled = true
    btnTijera.style.background = "#6D5D6E"
    validateNumberAttacks()
})


function validateNumberAttacks(){
    if (ataquesJuagdor.length === 3){
        sectionResultado.style.display = "flex"
        sectionAtaque.style.display = "none"
        ataqueAleatorioEnemigo()
        combate()
    }
}


function ataqueAleatorioEnemigo(){
    for (let i = 1; i <= ataquesJuagdor.length; i++){
        const ataqueAleatorio = aleatoriedad(1,3)
        if (ataqueAleatorio === 1){
            ataquesEnemigo.push("Piedra")
        }else if (ataqueAleatorio === 2){
            ataquesEnemigo.push("Papel")
        }else if (ataqueAleatorio === 3){
            ataquesEnemigo.push("Tijera")
        }
    }
}


function combate(){
    for (let i = 1; i <= ataquesJuagdor.length; i++) {
        if (ataquesJuagdor[i] === ataquesEnemigo[i]){
            empates++
        }else if (ataquesJuagdor[i] === "Papel" && ataquesEnemigo[i] === "Piedra"){
            vidasJugador++
        }else if (ataquesJuagdor[i] === "Piedra" && ataquesEnemigo[i] === "Tijera"){
            vidasJugador++
        }else if (ataquesJuagdor[i] === "Tijera" && ataquesEnemigo[i] === "Papel"){
            vidasJugador++
        }else {
            vidasEnemigo++
        }
    }
    showAttacks()
    console.log(ataquesJuagdor)
    console.log(ataquesEnemigo)
    showLives()
    validateLives()
}

function showLives(){
    playerLives.innerHTML = vidasJugador
    enemyLives.innerHTML = vidasEnemigo
    tie.innerHTML = empates
}

function validateLives(){
    if (vidasEnemigo === vidasJugador){
        showResult("Empate -_-")
    }else if (vidasJugador > vidasEnemigo){
        showResult("Ganaste :)")
    }else if(vidasJugador < vidasEnemigo){
        showResult("Perdiste :v")
    }
    
}


function showImgAttack(attack){
    if (attack === "Piedra"){
        return '/assets/piedra.png'
    }else if (attack === 'Papel'){
        return '/assets/papel.png'
    }else if (attack === 'Tijera'){
        return '/assets/tijera.png'
    }
}


function showAttacks(){
    nombreAtaqueEnemigo.innerHTML = ataquesEnemigo
    nombreAtaqueJugador.innerHTML = ataquesJuagdor
    imgAtaqueJugador.src = showImgAttack(ataquesJuagdor)
    imgAtaqueEnemigo.src = showImgAttack(ataquesEnemigo)
}


function showResult(mensaje){
    console.log(mensaje)
    mostrarResultado.innerHTML = mensaje
}


function aleatoriedad(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}