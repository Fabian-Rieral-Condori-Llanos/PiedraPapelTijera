// Piedra papel o tijera

const score = document.getElementById('score')
const title = document.getElementById('title')
const piedra = document.getElementById('piedra')
const piedraImg = document.getElementById('piedra-img')
const papel = document.getElementById('papel')
const papelImg = document.getElementById('papel-img')
const tijera = document.getElementById('tijera')
const tijeraImg = document.getElementById('tijera-img')
const play = document.querySelector('.button-play')
const win = document.getElementById('win')
const gameOver = document.getElementById('game-over')
const tie = document.getElementById('tie')
const containerPlayAgain = document.querySelector('.container-play-again')
const containerResult = document.querySelector('.container-result')
const resultUser = document.getElementById('result-user')
const resultPc = document.getElementById('result-pc')

let points = 0
let user
let options = [piedra, papel, tijera]

const optionsRandom = options => {
    let indexRandom = Math.floor(Math.random() * options.length)
    return options[indexRandom]
}

let pc = optionsRandom(options)


// Reglas del juego

const clickElection = (op1, op2, op3) => {
    op1.style = 'background-color: var(--primary-color); border: 2px solid var(--color-text);'
    op2.style = 'background-color: var(--secondary-color); border: none;'
    op3.style = 'background-color: var(--secondary-color); border: none;'
}

piedra.addEventListener('click', e => {
    const click = e.target
    if (click == piedra || click == piedraImg) {
        user = piedra
    }
    clickElection(piedra, papel, tijera)
})
papel.addEventListener('click', e => {
    const click = e.target
    if (click == papel || click == papelImg) {
        user = papel
    }
    clickElection(papel, tijera, piedra)
})
tijera.addEventListener('click', e => {
    const click = e.target
    if (click == tijera || click == tijeraImg) {
        user = tijera
    }
    clickElection(tijera, papel, piedra)
})

// funcion jugar

let pointsStorages = localStorage.getItem(points)

const stylePlay = result => {
    title.style = 'opacity: 0;'
    containerResult.style = 'display: flex;'
    resultUser.innerHTML = user.id
    resultPc.innerHTML = pc.id
    containerPlayAgain.style = 'display: flex;'
    result.style = 'display: flex;'
}
const pointsWin = () => {
    points++
    pointsStorages++
    score.innerHTML = pointsStorages
}

const pointsGameOver = () => {
    --points
    --pointsStorages
    score.innerHTML = pointsStorages
}

play.addEventListener('click', e => {
    const click = e.target
    points = pointsStorages
    if (click === play && user === piedra || user === papel || user === tijera) {
        if (user === piedra && pc === tijera) {
            stylePlay(win)
            pointsWin()
        } else if (user === papel && pc == tijera) {
            stylePlay(gameOver)
            pointsGameOver()
        } else if (user === papel && pc === piedra) {
            stylePlay(win)
            pointsWin
        } else if (user === tijera && pc == piedra) {
            stylePlay(gameOver)
            pointsGameOver()
        } else if (user === piedra && pc === papel) {
            stylePlay(gameOver)
            pointsGameOver()
        } else if (user === tijera && pc === papel) {
            stylePlay(win)
            pointsWin()
        } else {
            stylePlay(tie)
        }
        localStorage.setItem('points', points)
    }
})
score.innerHTML = pointsStorages


// funcion jugar otra vez

const newOptionRandom = options => {
    let indexRandom = Math.floor(Math.random() * options.length)
    return options[indexRandom]
}

const PlayAgain = () => {
    pc = newOptionRandom(options)
    user
    title.style = 'opacity: 1;'
    papel.style = 'background-color: var(--secondary-color); border: none;'
    piedra.style = 'background-color: var(--secondary-color); border: none;'
    tijera.style = 'background-color: var(--secondary-color); border: none;'
    containerResult.style = 'display: none;'
    win.style = 'display: none;'
    gameOver.style = 'display: none;'
    tie.style = 'display: none;'
    containerPlayAgain.style = 'display: none;'
}

// Modo oscuro

const body = document.getElementById('body')
const theme = document.getElementById('theme')
theme.addEventListener('click', e => {
    body.classList.toggle('dark')
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'true')
        document.documentElement.setAttribute('data-theme', true)
    } else if (!body.classList.contains('dark')) {
        localStorage.setItem('theme', 'false')
        document.documentElement.setAttribute('data-theme', false)
    }
})
if (localStorage.getItem('theme') === 'true') {
    body.classList.add('dark')
    document.documentElement.setAttribute('data-theme', true)
} else if (localStorage.getItem('theme') === 'false') {
    body.classList.remove('dark')
    document.documentElement.setAttribute('data-theme', false)
}