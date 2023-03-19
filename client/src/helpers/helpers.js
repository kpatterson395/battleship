const letters = Array.from("ABCDEFGHIJ")

export const color = (hit, ship, opponent) => {
    if (hit && ship) {
        //red
        return '#f21b7c'
    } else if (hit) {
        //gray
        return '#757273'
    } else if (ship && !opponent) {
        //blue
        return '#6bb5fa'
    } else {
        return 'white'
    }
}

export function isShip(piece, battleships) {

    let hitShip = ''
    battleships.forEach((battleship) => {
        if (battleship.pieces.includes(piece)) {
            hitShip = battleship.name
        }

    })
    return hitShip
}

export function generateRandomHit(hits) {
    let randHit = ''
    do {
        randHit = letters[Math.floor(Math.random() * 10)] + (Math.floor(Math.random() * 10))
    } while (hits.includes(randHit))
    return randHit
}

export function generateRandomDirection() {
    let directions = [generateHorizontalRight, generateHorizontalLeft, generateVerticalUp, generateVerticalDown]
    return directions[Math.floor(Math.random() * 4)]
}
export const alreadySelected = (piece, ships) => {
    let includes = false
    ships.forEach((ship) => {
        if (ship.pieces.includes(piece)) {
            includes = true
        }
    })
    return includes
}

export const add = (battleships, ship, setSunk) => {
    let newShips = battleships.map((bship) => {
        if (bship.name === ship) {
            if (bship.damage + 1 === bship.length) {
                setSunk((prevState) => [...prevState, ship])
            }
            return { ...bship, damage: bship.damage + 1, completed: bship.damage + 1 === bship.length }
        }

        else return bship
    })
    return newShips
}

export const generateHorizontalRight = (start, length, selectedShipGrid) => {
    let horizontalRight = []

    if ((start.col + length - 1) <= 9) {
        for (let i = 1; i < length; i++) {
            let newCol = start.col + i
            horizontalRight.push(start.row + newCol)
        }
    }

    if (horizontalRight.some((piece) => alreadySelected(piece, selectedShipGrid))) {
        horizontalRight = []
    }
    return horizontalRight
}

export const generateHorizontalLeft = (start, length, selectedShipGrid) => {
    let horizontalLeft = []

    if ((start.col - length + 1) >= 0) {
        for (let i = start.col - 1; i > start.col - (length); i--) {
            horizontalLeft.push(start.row + i)
        }
    }
    if (horizontalLeft.some((piece) => alreadySelected(piece, selectedShipGrid))) {
        horizontalLeft = []
    }
    return horizontalLeft
}

export const generateVerticalUp = (start, length, selectedShipGrid) => {
    let starting = letters.indexOf(start.row)
    let verticalUp = []
    if ((starting + length - 1) <= 9) {
        for (let i = starting + 1; i < length + starting; i++) {
            verticalUp.push(letters[i] + start.col)
        }
    }
    if (verticalUp.some((piece) => alreadySelected(piece, selectedShipGrid))) {
        verticalUp = []
    }
    return verticalUp
}

export const generateVerticalDown = (start, length, selectedShipGrid) => {
    let starting = letters.indexOf(start.row)
    let verticalDown = []
    if ((starting - length + 1) >= 0) {
        for (let i = starting - 1; i > starting - length; i--) {
            verticalDown.push(letters[i] + start.col)
        }
    }
    if (verticalDown.some((piece) => alreadySelected(piece, selectedShipGrid))) {
        verticalDown = []
    }
    return verticalDown
}