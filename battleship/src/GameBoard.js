import React, { useEffect, useState } from 'react'
import Player from './Player'
import Opponent from './Opponent'
import {
    generateRandomHit,
    isShip,
    add,
    generateRandomDirection
} from './helpers'

import SelectBoard from './SelectBoard'
import { initialGrid } from './data'
// pieces: 2, 3, 3, 4, 5

// will need to have initial screen to choose pieces
// decison logic for "random" guesses



const randomShipPicker = () => {

    let alreadyPicked = []
    //is possible to have piece where no direction works??
    let newGrid = initialGrid.map((ship) => {
        let genPieces = []
        let hit = generateRandomHit(genPieces)
        do {
            let directionFunction = generateRandomDirection()
            genPieces = directionFunction({ row: hit[0], col: parseInt(hit[1]) }, ship.length, alreadyPicked)
        } while (genPieces.length === 0)
        genPieces.push(hit)
        alreadyPicked.push({ pieces: genPieces })
        return { ...ship, pieces: genPieces }
    })
    return newGrid
}


const GameBoard = () => {

    const [playerBoardState, setPlayerBoardState] = useState({ battleships: [], hits: [] })
    const [opponentBoardState, setOpponentBoardState] = useState({ battleships: [], hits: [] })
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
        setPlayerBoardState({ battleships: [], hits: [] })
        setOpponentBoardState({ battleships: [], hits: [] })
        setSunkOppCount([])
        setSunkPlayerCount([])
    }

    const setPlayerSelection = (selection) => {

        setPlayerBoardState({ battleships: selection, hits: [] })
        setOpponentBoardState({ battleships: randomShipPicker(), hits: [] })
    }


    return (

        <div className='GameBoard'>
            {
                (sunkPlayerCount && sunkPlayerCount.length === 5 || sunkOppCount && sunkOppCount.length === 5) &&
                <div className='gameover-modal'>
                    <h4>Gameover</h4>
                    <h5>
                        {sunkPlayerCount.length === 5 ? 'You lost...' : 'You won!'}
                    </h5>
                    <button onClick={reset}>Reset Game</button>
                </div>
            }
            {!playerBoardState.battleships.length && (
                <SelectBoard setSelection={setPlayerSelection} />
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