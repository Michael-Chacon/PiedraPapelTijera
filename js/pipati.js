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

let ataquesJuagdor = []
let ataquesEnemigo = []


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
    console.log(ataquesJuagdor)
    validateNumberAttacks()
})


btnPapel.addEventListener("click", () =>{
    ataquesJuagdor.push("Papel")
    btnPapel.disabled = true
    btnPapel.style.background = "#6D5D6E"
    console.log(ataquesJuagdor)
    validateNumberAttacks()
})


btnTijera.addEventListener("click", () =>{
    ataquesJuagdor.push("Tijera")
    btnTijera.disabled = true
    btnTijera.style.background = "#6D5D6E"
    console.log(ataquesJuagdor)
    validateNumberAttacks()
})


function validateNumberAttacks(){
    if (ataquesJuagdor.length === 3){
        sectionResultado.style.display = "flex"
        sectionAtaque.style.display = "none"
        ataqueAleatorioEnemigo()
        // console.log(ataquesJuagdor.length)
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