
let season = "summer"

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

let winter = document.getElementById("winter")
winter.addEventListener("click", changeSeasonWinter)

let summer = document.getElementById("summer")
summer.addEventListener("click", changeSeasonSummer)

let autumn = document.getElementById("autumn")
autumn.addEventListener("click", changeSeasonAutumn)

let spring = document.getElementById("spring")
spring.addEventListener("click", changeSeasonSpring)