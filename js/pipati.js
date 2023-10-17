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

let botones = []
let ataquesJuagdor = []
let ataqueEnemigo


// document.addEventListener("DOMContentLoaded", () =>{
//     console.log("botones: " + botones)

// })

function iniciarJuego(){
   botones = document.querySelectorAll(".BAtaque")
}

btnSeleccion.addEventListener("click", seleccionarAtaque)
sectionReiniciar.addEventListener("click", reiniciarJuego)

btnPiedra.addEventListener("click", () =>{
    ataquesJuagdor.push("Piedra")
    btnPiedra.disabled = true
    console.log(ataquesJuagdor)
})
btnPapel.addEventListener("click", () =>{
    ataquesJuagdor.push("Papel")
    btnPapel.disabled = true
    console.log(ataquesJuagdor)
})
btnTijera.addEventListener("click", () =>{
    ataquesJuagdor.push("Tijera")
    btnTijera.disabled = true
    console.log(ataquesJuagdor)
})

function identifyAttacks(){
    console.log(botones)
}

function reiniciarJuego(){
    location.reload()
}

function seleccionarAtaque(){
    if (btnPiedra.checked){
        ataqueJuagdor = "Piedra"
    }else if (btnPapel.checked){
        ataqueJuagdor = "Papel"
    }else if (btnTijera.checked){
        ataqueJuagdor = "Tijera"
    }else{
        alert("No has elegido ataque")
        return
    }
    console.log(ataqueJuagdor)
    sectionResultado.style.display = "flex"
    sectionAtaque.style.display = "none"
    ataqueAleatorioEnemigo()
    combate()
}

function ataqueAleatorioEnemigo(){
    const ataqueAleatorio = aleatoriedad(1,3)
    if (ataqueAleatorio === 1){
        ataqueEnemigo = "Piedra"
    }else if (ataqueAleatorio === 2){
        ataqueEnemigo = "Papel"
    }else if (ataqueAleatorio === 3){
        ataqueEnemigo = "Tijera"
    }
    console.log(ataqueEnemigo)

}

function combate(){
    if (ataqueJuagdor === ataqueEnemigo){
        showResult("Empate")
    }else if (ataqueJuagdor === "Papel" && ataqueEnemigo === "Piedra"){
        showResult("Ganaste :)")
    }else if (ataqueJuagdor === "Piedra" && ataqueEnemigo === "Tijera"){
        showResult("Ganaste :)")
    }else if (ataqueJuagdor === "Tijera" && ataqueEnemigo === "Papel"){
        showResult("Ganaste :)")
    }else {
        showResult("Perdiste :v")
    }

    showAttacks()
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
    nombreAtaqueEnemigo.innerHTML = ataqueEnemigo
    nombreAtaqueJugador.innerHTML = ataqueJuagdor
    imgAtaqueJugador.src = showImgAttack(ataqueJuagdor)
    imgAtaqueEnemigo.src = showImgAttack(ataqueEnemigo)
}

function showResult(mensaje){
    console.log(mensaje)
    mostrarResultado.innerHTML = mensaje

}


function aleatoriedad(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}