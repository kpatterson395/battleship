import React, { useEffect, useState } from 'react'
import Player from './Player'
import Opponent from './Opponent'
import { generateRandomHit, isShip, add } from './helpers'
import SelectBoard from './SelectBoard'
// pieces: 2, 3, 3, 4, 5

// will need to have initial screen to choose pieces
// decison logic for "random" guesses


const initialBoard = {
    battleships: [
        // { name: 'carrier', start: { row: 'A', col: 1 }, vertical: 0, length: 5, completed: false, damage: 0 },
        // { name: 'battleship', start: { row: 'B', col: 3 }, vertical: 1, length: 4, completed: false, damage: 0 },
        // { name: 'cruiser', start: { row: 'E', col: 6 }, vertical: 1, length: 3, completed: false, damage: 0 },
        // { name: 'submarine', start: { row: 'H', col: 0 }, vertical: 1, length: 3, completed: false, damage: 0 },
        // { name: 'destroyer', start: { row: 'I', col: 4 }, vertical: 0, length: 2, completed: false, damage: 0 }
    ],
    hits: []
}


// A: [1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
// B: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// C: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// D: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// E: [1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
// F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// G: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// H: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// I: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
// J: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0]

const GameBoard = () => {

    const [playerBoardState, setPlayerBoardState] = useState(initialBoard)
    const [opponentBoardState, setOpponentBoardState] = useState(initialBoard)
    const [sunkOppCount, setSunkOppCount] = useState([])
    const [sunkPlayerCount, setSunkPlayerCount] = useState([])

    useEffect(() => {
        if (sunkOppCount.length) {
            setTimeout(() => alert(`You've sunk their ${sunkOppCount[sunkOppCount.length - 1]}!`), 100)
        }
    }, [sunkOppCount])

    useEffect(() => {
        if (sunkPlayerCount.length) {
            setTimeout(() => alert(`Your ${sunkPlayerCount[sunkPlayerCount.length - 1]} has been sunk!`), 100)
        }
    }, [sunkPlayerCount])

    const addSelectedOpponent = (selected) => {
        setOpponentBoardState(({ battleships, hits }) => {
            const ship = isShip(selected, battleships)
            let newShips = add(battleships, ship, setSunkOppCount)
            return { battleships: newShips, hits: [...hits, selected] }
        })
        const newHit = generateRandomHit(playerBoardState.hits)
        setPlayerBoardState(({ battleships, hits }) => {
            const ship = isShip(newHit, battleships)
            let newShips = add(battleships, ship, setSunkPlayerCount)
            return { battleships: newShips, hits: [...hits, newHit] }
        })
    }

    const reset = () => {
        setPlayerBoardState(initialBoard)
        setOpponentBoardState(initialBoard)
        setSunkOppCount([])
        setSunkPlayerCount([])
    }




    return (

        <div className='GameBoard'>
            {
                (sunkPlayerCount.length === 5 || sunkOppCount.length === 5) &&
                <div className='gameover-modal'>
                    <h4>Gameover!</h4>
                    <button onClick={reset}>Reset Game</button>
                </div>
            }
            {!playerBoardState.battleships.length && (
                <SelectBoard />
            )}
            <div>
                <Opponent board={opponentBoardState} addSelected={addSelectedOpponent} />
                <p>{`${sunkOppCount.length} battleships sunk`} </p>
            </div>
            <div>
                <Player board={playerBoardState} />

                <p>{`${sunkPlayerCount.length} battleships sunk`} </p>
            </div>
        </div>
    );
}

export default GameBoard;