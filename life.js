let grassArr = []
let grassEaterArr = []
let predatorArr = []

function setup() {
    createCanvas(1000, 1000);
    background('white');
    frameRate(10)

    let chance = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2]
        // генерируем свою матрицу
    matrix = []
    for (let y = 0; y < 90; y++) {
        let abob = []
        for (let x = 0; x < 90; x++) {
            // if ((y % 2 == 0 && x % 2 == 0) || (y % 2 == 1 && x % 2 == 1)) {
            abob.push(random(chance))
        }
        matrix.push(abob)
    }
    console.log(matrix)

    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                // тут будут травоядные
                let gr = new GrassEater(x, y);
                grassEaterArr.push(gr);
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y);
                predatorArr.push(gr);
            }
        }
    }

}

function draw() {
    // noStroke()
    fill(0, 255, 0);
    // ellipse(random(0, 500), random(0, 500), random(10, 50));
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green')
            } else if (matrix[y][x] == 2) {
                fill('black')
            } else if (matrix[y][x] == 3) {
                fill('red')
            } else {
                fill('white')
            }
            rect(x * 10, y * 10, 10, 10)

        }
    }

    for (let i in grassArr) {
        grassArr[i].mul();
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in predatorArr) {
        predatorArr[i].eat();
    }

}
class LivingCreature {
    constructor(x, y) {
        this.x = x
        this.y = y


        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}
class Grass extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]

    }


    mul() {
        this.multiply++;
        let newCell = random(this.chooseCell(0))
            // console.log(newCell, this.multiply)
        if (this.multiply >= 4 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1])
            grassArr.push(newGrass)
            matrix[newCell[1]][newCell[0]] = 1
            this.multiply = 0
        }
    }
}


class GrassEater extends LivingCreature {
    constructor(x, y) {
       super(x, y)
        this.energy = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }


    mul() {
        let newCell = random(this.chooseCell(0))
        if (this.energy >= 5 && newCell) {
            let newGrassEater = new GrassEater(newCell[0], newCell[1])
            grassEaterArr.push(newGrassEater)
            matrix[newCell[1]][newCell[0]] = 2
            this.energy = 0
        }
    }

    eat() {
        let newCell = random(this.chooseCell(1))
        if (newCell) {
            let pomidor = grassArr.findIndex((k) => k.x == newCell[0] && k.y == newCell[1]);
            grassArr.splice(pomidor, 1)
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[this.y][this.x] = 2
            this.getNewCoordinates()
            this.energy++
                this.mul()

        } else {
            // двигаться и умереть
            this.energy--;
            if (this.energy <= -5) {
                //смерть 
                this.die()
            } else {
                //движение 
                this.move()
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        let pomidor = grassEaterArr.findIndex((k) => k.x == this.x && k.y == this.y);
        grassEaterArr.splice(pomidor, 1)
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    move() {
        let newCell = random(this.chooseCell(0))
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[this.y][this.x] = 2
            this.getNewCoordinates()
        }
    }
}

class Predator extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]

        this.energy = 2

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }


    mul() {
        let newCell = random(this.chooseCell(0))
        if (this.energy >= 3 && newCell) {
            let newPredator = new Predator(newCell[0], newCell[1])
            predatorArr.push(newPredator)
            matrix[newCell[1]][newCell[0]] = 3
            this.energy = 2
        }
    }

    eat() {
        let newCell = random(this.chooseCell(2))
        if (newCell) {
            let predatorEat = grassEaterArr.findIndex((k) => k.x == newCell[0] && k.y == newCell[1]);
            grassEaterArr.splice(predatorEat, 1)
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[this.y][this.x] = 3
            this.getNewCoordinates()
            this.energy += 2
            this.mul()

        } else {
            // двигаться и умереть
            this.energy--;
            if (this.energy <= -40) {
                //смерть 
                this.die()
            } else {
                //движение 
                this.move()
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        let predator = predatorArr.findIndex((k) => k.x == this.x && k.y == this.y);
        predatorArr.splice(predator, 1)
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    move() {
        let newCell = random(this.chooseCell(0))
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[this.y][this.x] = 3
            this.getNewCoordinates()
        }
    }
}