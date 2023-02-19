const letters = Array.from("ABCDEFGHIJ")



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