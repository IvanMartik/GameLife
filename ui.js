
let season = "summer"
let create = "grassEater"

function changeSeasonWinter() {
    season = "winter"
}
function changeSeasonSummer() {
    season = "summer"
}

function changeSeasonAutumn() {
    season = "autumn"
}

function changeSeasonSpring() {
    season = "spring"
}

function changeGrassEater() {
    create = "grassEater"
    console.log(create)
}
function changeCreateGrass() {
    create = "grass"
    console.log(create)
}
function changeBoom() {
    create = "boom"
    console.log(boom)
}



let winter = document.getElementById("winter")
winter.addEventListener("click", changeSeasonWinter)

let summer = document.getElementById("summer")
summer.addEventListener("click", changeSeasonSummer)

let autumn = document.getElementById("autumn")
autumn.addEventListener("click", changeSeasonAutumn)

let spring = document.getElementById("spring")
spring.addEventListener("click", changeSeasonSpring)

let createGrassEater = document.getElementById("grasseater")
createGrassEater.addEventListener("click", changeGrassEater)

let createGrass = document.getElementById("grass")
createGrass.addEventListener("click", changeCreateGrass)

let createBoom = document.getElementById("boom")
createBoom.addEventListener("click", changeBoom)

