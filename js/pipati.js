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


let playerId = null
let enemyId
let inputBatman 
let inputGoku 
let inputVegeta 
let inputJoker 
let inputGogeta 
let id

let enemyPlayers = []
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
let objectOfEnemy
let jugadorEnemigo
let lienzo = map.getContext("2d")
let imgBackground = new Image()
imgBackground.src = './assets/mapa4.jpg'
const anchoMaxismoMapa = 700
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20 

if (anchoDelMapa > anchoMaxismoMapa){
    anchoDelMapa = anchoMaxismoMapa - 20
}



alturaQueBuscamos = anchoDelMapa * 600 / 800 
map.width = anchoDelMapa
map.height = alturaQueBuscamos

class Character{
    constructor(name, photo, mapaFoto, id = null){
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
   joinTheGame()
}


function joinTheGame(){
    fetch('http://localhost:8080/join')
    .then(function(res){
        if(res.ok){
            res. text()
            .then(function(id){
                console.log(id)
                playerId = id
            })
        }
    })
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
    setDataPlayer()
}


function setDataPlayer(){
    fetch(`http://localhost:8080/player/${playerId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            character: characterChecked
        })
    })
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
    sendPosition(objectOfPlayer.x, objectOfPlayer.y)
    enemyPlayers.forEach(function(player){
        player.drawCharacter()
        detectCollision(player)
    })
}


function sendPosition(x, y){
    fetch(`http://localhost:8080/player/${playerId}/position`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({enemy}){
                enemyPlayers = enemy.map(function(enemigo){
                    jugadorEnemigo = null
                    const nameEnemy = enemigo.character.name
                    if(nameEnemy === "Minato"){
                        jugadorEnemigo = new Character("Minato", "./assets/minatop.png", "./assets/fminato.png", enemigo.id)
                    }else if(nameEnemy === 'Goku'){
                        jugadorEnemigo = new Character("Goku", "./assets/gokup.png", "./assets/fgoku.png", enemigo.id)
                    }else if(nameEnemy === 'Obito'){
                        jugadorEnemigo = new Character("Obito", "./assets/obitop.png", "./assets/fobito.png", enemigo.id)
                    }else if(nameEnemy === 'Naruto'){
                        jugadorEnemigo = new Character("Naruto", "./assets/narutop.png", "./assets/fnaruto.png", enemigo.id)
                    }else if(nameEnemy === 'Madara'){
                        jugadorEnemigo = new Character("Madara", "./assets/madara.png", "./assets/fmadara.png", enemigo.id)
                    }
                    jugadorEnemigo.x = enemigo.x
                    jugadorEnemigo.y = enemigo.y
                    return jugadorEnemigo
                })
            })
        }
    })
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


function detectCollision(enemigo){
    const upEnemy = enemigo.y
    const downEnemy = enemigo.y + enemigo.alto
    const leftEnemy = enemigo.x
    const rightEnemy = enemigo.x + enemigo.ancho

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
    enemyId = enemigo.id 
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
        sendAttacks()
    }
}


function sendAttacks(){
    fetch(`http://localhost:8080/player/${playerId}/attacks`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            attacks: ataquesJuagdor
        })
    })
    intervalo = setInterval(getAttacks, 50)
}


function getAttacks(){
    fetch(`http://localhost:8080/player/${enemyId}/attacks`)
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({attack}){
                if (attack.length === 3){
                    ataquesEnemigo = attack
                    combate()
                }
            })
        }
    })
}


function combate(){
    clearInterval(intervalo)
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
    const imgWin = document.getElementById("img-win")
    if (vidasEnemigo === vidasJugador){
        showResult("Empate")
        imgWin.src = "./assets/tie.png"
    }else if (vidasJugador > vidasEnemigo){
        showResult("Ganaste")
        imgWin.src = objectOfPlayer.photo
    }else if(vidasJugador < vidasEnemigo){
        showResult("Perdiste")
        imgWin.src = jugadorEnemigo.photo
    }
    showLives()
}


function showLives(){
    playerLives.innerHTML = `${objectOfPlayer.name}: ${vidasJugador}`
    enemyLives.innerHTML = `${jugadorEnemigo.name}: ${vidasEnemigo}`
    tie.innerHTML = empates
    showAttacks()
}


function showAttacks(){   
    showImgAttack(ataquesJuagdor, 'jugador')
    showImgAttack(ataquesEnemigo, 'enemigo')
}


function showImgAttack(ataques, character){
    ataques.forEach(attack => {
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