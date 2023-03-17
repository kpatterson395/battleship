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
import GameOverModal from './GameOverModal'
import Error from './Error'


const randomShipPicker = () => {

    let alreadyPicked = []
    //is possible to have piece where no direction works??
    let newGrid = initialGrid.map((ship) => {
        let genPieces = []
        let hit = ''
        do {
            hit = generateRandomHit(alreadyPicked.reduce((acc, curr) => [...acc, ...curr.pieces], []))
            let directionFunction = generateRandomDirection()
            genPieces = directionFunction({ row: hit[0], col: parseInt(hit[1]) }, ship.length, alreadyPicked)
        } while (genPieces.length === 0)
        alreadyPicked.push({ pieces: [...genPieces, hit] })
        return { ...ship, pieces: [...genPieces, hit] }
    })
    return newGrid
}


const GameBoard = () => {

    const [playerBoardState, setPlayerBoardState] = useState({ battleships: [], hits: [] })
    const [opponentBoardState, setOpponentBoardState] = useState({ battleships: [], hits: [] })
    const [sunkOppCount, setSunkOppCount] = useState([])
    const [sunkPlayerCount, setSunkPlayerCount] = useState([])
    const [errorMessage, setErrorMessage] = useState({ message: '', appear: false })

    useEffect(() => {
        if (sunkOppCount.length) {
            setErrorMessage({ message: `You've sunk their ${sunkOppCount[sunkOppCount.length - 1]}!`, appear: true })
        }
    }, [sunkOppCount])

    useEffect(() => {
        if (sunkPlayerCount.length) {
            setErrorMessage({ message: `Your ${sunkPlayerCount[sunkPlayerCount.length - 1]} has been sunk!`, appear: true })

        }
    }, [sunkPlayerCount])

    useEffect(() => {
        if (errorMessage.appear) {
            setTimeout(function () {
                setErrorMessage(prevState => ({ ...prevState, appear: false }))
            }, 1000);
            setTimeout(function () {
                setErrorMessage(prevState => ({ ...prevState, message: '' }))
            }, 2000);
        }
    }, [errorMessage])

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

    const handleError = (message) => setErrorMessage({ message, appear: true })

    return (
        <div className='GameBoard'>
            <Error message={errorMessage.message} display={errorMessage.appear ? 'show' : ''} />
            {
                (sunkPlayerCount.length === 5 || sunkOppCount.length === 5) &&

                <GameOverModal sunkPlayerCount={sunkPlayerCount} reset={reset} />
            }
            {!playerBoardState.battleships.length && (
                <SelectBoard setSelection={setPlayerSelection} handleError={(message) => handleError(message)} />
            )}
            <div>
                <Opponent board={opponentBoardState} addSelected={addSelectedOpponent} handleError={(message) => handleError(message)} />
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