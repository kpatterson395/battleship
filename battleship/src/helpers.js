const letters = Array.from("ABCDEFGHIJ")

export function populateShip(ship) {
    const { start, vertical, length } = ship
    let shipPieces = []
    shipPieces.push(start.row + start.col)
    if (!vertical) {
        for (let i = 1; i < length; i++) {
            let newColumn = start.col + i
            shipPieces.push(start.row + newColumn)
        }
    }
    else {

        let starting = letters.indexOf(start.row)
        for (let i = starting + 1; i < length + starting; i++) {
            let newRow = letters[i]
            shipPieces.push(newRow + start.col)
        }
    }
    return shipPieces
}

export function isShip(piece, battleships) {

    let hitShip = ''
    battleships.forEach((battleship) => {
        const arr = populateShip(battleship)
        if (arr.includes(piece)) {
            hitShip = battleship.name
        }

    })
    return hitShip
}

export function isShipSunk(battleship, hits) {
    const arr = populateShip(battleship)
    return arr.every(item => hits.includes(item))
}

export function generateRandomHit(hits) {
    let randHit = ''
    do {
        randHit = letters[Math.floor(Math.random() * 10)] + (Math.floor(Math.random() * 10))
    } while (hits.includes(randHit))
    return randHit
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