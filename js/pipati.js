const selectCharackters = document.getElementById("select-character")
const sectionCahracter = document.getElementById("section-character")
const btnSelectCharackters = document.getElementById("btn-select-character")

const sectionAtaque = document.getElementById("section-ataque")
const btnPiedra = document.getElementById("piedra")
const btnPapel = document.getElementById("papel")
const btnTijera = document.getElementById("tijera")

const sectionResultado = document.getElementById("section-resultado")
const mostrarResultado = document.getElementById("resultado")
const sectionReiniciar = document.getElementById("reiniciar")
const playerLives = document.getElementById("vidas-jugador")
const enemyLives = document.getElementById("vidas-enemigo")
const tie = document.getElementById("empates")
const infoEnemigo = document.getElementById("info-enemigo")
const infoJugador = document.getElementById("info-jugador")

const showMap = document.getElementById("show-map")
const map = document.getElementById("map")



let inputBatman 
let inputGoku 
let inputVegeta 
let inputJoker 
let inputGogeta 
let id

let ataquesJuagdor = []
let ataquesEnemigo = []
let vidasJugador = 0
let vidasEnemigo = 0
let empates = 0
let characters = []
let EnemyCharacters = []
let allCharacters
let characterChecked

let intervalo
let objectOfPlayer
let enemy
let objectOfEnemys = []
let lienzo = map.getContext("2d")
let imgBackground = new Image()
imgBackground.src = './assets/mapa4.jpg'
const anchoMaxismoMapa = 750
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20 

if (anchoDelMapa > anchoMaxismoMapa){
    anchoDelMapa = anchoMaxismoMapa - 20
}



alturaQueBuscamos = anchoDelMapa * 600 / 800 
map.width = anchoDelMapa
map.height = alturaQueBuscamos

class Character{
    constructor(name, photo, mapaFoto){
        this.name = name
        this.photo = photo
        this.mapaFoto = new Image()
        this.mapaFoto.src = mapaFoto
        this.id = id
        this.ataques = []
        this.ancho = 80
        this.alto = 100
        this.x = aleatoriedad(0, map.width - this.ancho)
        this.y = aleatoriedad(0, map.height - this.alto)
        this.speedX = 0
        this.speedY = 0
    }

    drawCharacter(){
        lienzo.drawImage(
            this.mapaFoto, 
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let minato = new Character("Minato", "./assets/minatop.png", "./assets/fminato.png")
let goku = new Character("Goku", "./assets/gokup.png", "./assets/fgoku.png")
let obito = new Character("Obito", "./assets/obitop.png", "./assets/fobito.png")
let naruto = new Character("Naruto", "./assets/narutop.png", "./assets/fnaruto.png")
let madara = new Character("Madara", "./assets/madara.png", "./assets/fmadara.png")

characters.push(minato, goku, obito, naruto, madara)


function iniciarJuego(){
    showMap.style.display = "none"
    sectionAtaque.style.display = "none"
    
   characters.forEach(character => {
    allCharacters = `
    <input type="radio" name="mascota" id=${character.name}>
    <label for=${character.name} class="contenido-tarjeta-personajes characters">
        <img src=${character.photo} alt=${character.name}>
        <p id="name-character">${character.name}</p>
    </label>
    `
    selectCharackters.innerHTML += allCharacters
   })
    inputBatman = document.getElementById("Minato")
    inputGoku = document.getElementById("Goku")
    inputVegeta = document.getElementById("Naruto")
    inputJoker = document.getElementById("Madara")
    inputGogeta = document.getElementById("Obito")
   btnSelectCharackters.addEventListener("click", selectCharacter)
}


function selectCharacter(){
    if(inputBatman.checked){
        characterChecked = inputBatman.id
    }else if (inputGoku.checked){
        characterChecked = inputGoku.id
    }else if (inputJoker.checked){
        characterChecked = inputJoker.id
    }else if (inputVegeta.checked){
        characterChecked = inputVegeta.id
    }else if (inputGogeta.checked){
        characterChecked = inputGogeta.id
    }

    sectionCahracter.style.display = "none"
    showMap.style.display = "flex"
    startMap()
    objectOfEnemys = characters.filter(items => items != objectOfPlayer)
    getEnemy()
}


function startMap(){
    objectOfPlayer = getDataPlayer()
    intervalo = setInterval(drawMap, 50)
    window.addEventListener('keydown', detectKey)
    window.addEventListener('keyup', stopMovement)
}


function detectKey(event){
    switch(event.key){
        case "ArrowUp":
            moveUp()
            break
        case "ArrowDown":
            moveDown()
            break
        case "ArrowLeft":
            moveLeft()
            break
        case "ArrowRight":
            moveRight()
            break
    }
}


function getDataPlayer(){
    for (let i = 0; i < characters.length; i++){
        if(characterChecked === characters[i].name){
            return characters[i]
        }
    }
}


function drawMap(){
    objectOfPlayer.x += objectOfPlayer.speedX
    objectOfPlayer.y += objectOfPlayer.speedY


    lienzo.clearRect(0, 0, map.width, map.height)
    lienzo.drawImage(
        imgBackground,
        0,
        0,
        map.width,
        map.height
    )

    objectOfPlayer.drawCharacter()
    enemy.drawCharacter()
    detectCollision()
}


function getEnemy(){
   const indexEnemy =  aleatoriedad(0, objectOfEnemys.length - 1)
    enemy = objectOfEnemys[indexEnemy]
}


function moveUp(){
    objectOfPlayer.speedY = -5
}
function moveDown(){
    objectOfPlayer.speedY = 5
}
function moveLeft(){
    objectOfPlayer.speedX = -5
}
function moveRight(){
    objectOfPlayer.speedX = 5
}


function stopMovement(){
    objectOfPlayer.speedX = 0
    objectOfPlayer.speedY = 0
}

function detectCollision(){
    const upEnemy = enemy.y
    const downEnemy = enemy.y + enemy.alto
    const leftEnemy = enemy.x
    const rightEnemy = enemy.x + enemy.ancho

    const upPlayer = objectOfPlayer.y
    const downPlayer = objectOfPlayer.y + objectOfPlayer.alto
    const leftPlayer = objectOfPlayer.x
    const rightPlayer = objectOfPlayer.x + objectOfPlayer.ancho

    if (upPlayer > downEnemy || downPlayer < upEnemy || leftPlayer > rightEnemy || rightPlayer < leftEnemy){
        return
    }
    clearInterval(intervalo)
    stopMovement()
    showMap.style.display = "none"
    sectionAtaque.style.display = "flex"

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
    for (let i = 0; i <= ataquesJuagdor.length - 1; i++) {
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
   
    validateLives()
}


function showResult(mensaje){
    mostrarResultado.innerHTML = mensaje
}


function validateLives(){
    if (vidasEnemigo === vidasJugador){
        showResult("Empate -_-")
    }else if (vidasJugador > vidasEnemigo){
        showResult("Ganaste :)")
    }else if(vidasJugador < vidasEnemigo){
        showResult("Perdiste :v")
    }
    showLives()
}


function showLives(){
    playerLives.innerHTML = vidasJugador
    enemyLives.innerHTML = vidasEnemigo
    tie.innerHTML = empates
    showAttacks()
}


function showAttacks(){    
    showImgAttack(ataquesJuagdor, 'jugador')
    showImgAttack(ataquesEnemigo, 'enemigo')
}


function showImgAttack(attacks, character){
    attacks.forEach(attack => {
        let goal = null
        if (attack === "Piedra"){
            goal = `<img src="./assets/piedra.png" alt="ataque-enemigo" id="img-ataque-enemigo">
            <small class="nombre-ataque">Piedra</small>`
        }else if (attack === 'Papel'){
            goal = `<img src="./assets/papel.png" alt="ataque-enemigo" id="img-ataque-enemigo">
            <small class="nombre-ataque">Papel</small>`
        }else if (attack === 'Tijera'){
            goal = `<img src="./assets/tijera.png" alt="ataque-enemigo" id="img-ataque-enemigo">
            <small class="nombre-ataque">Tijera</small>`
        }
        if (character === 'jugador') {
            infoJugador.innerHTML += goal
        }else if (character === 'enemigo'){
            infoEnemigo.innerHTML += goal
        }
    })
}


function aleatoriedad(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


sectionReiniciar.addEventListener("click", reiniciarJuego)


function reiniciarJuego(){
    location.reload()
}


window.addEventListener("load", iniciarJuego)