export let initialGrid = [
    { name: 'carrier', pieces: ['A1', 'B1', 'C1', 'D1', 'E1'], length: 5, completed: false, damage: 0 },
    { name: 'battleship', pieces: ['G0', 'G1', 'G2', 'G3'], length: 4, completed: false, damage: 0 },
    { name: 'cruiser', pieces: ['I4', 'H4', 'G4'], length: 3, completed: false, damage: 0 },
    { name: 'submarine', pieces: ['A3', 'A4', 'A5'], length: 3, completed: false, damage: 0 },
    { name: 'destroyer', pieces: ['E9', 'F9'], length: 2, completed: false, damage: 0 }
]

export const letters = Array.from("ABCDEFGHIJ")

export let initialOptions = { center: '', verticalUp: [], verticalDown: [], horizontalLeft: [], horizontalRight: [], selectOptionMode: false }
