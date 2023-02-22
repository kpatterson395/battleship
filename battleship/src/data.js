export let initialGrid = [
    { name: 'carrier', pieces: [], length: 5, completed: false, damage: 0 },
    { name: 'battleship', pieces: [], length: 4, completed: false, damage: 0 },
    { name: 'cruiser', pieces: [], length: 3, completed: false, damage: 0 },
    { name: 'submarine', pieces: [], length: 3, completed: false, damage: 0 },
    { name: 'destroyer', pieces: [], length: 2, completed: false, damage: 0 }
]

export const letters = Array.from("ABCDEFGHIJ")

export let initialOptions = { center: '', verticalUp: [], verticalDown: [], horizontalLeft: [], horizontalRight: [], selectOptionMode: false }
