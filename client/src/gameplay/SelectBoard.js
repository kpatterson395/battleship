import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { alreadySelected, isShip, generateHorizontalLeft, generateHorizontalRight, generateVerticalDown, generateVerticalUp } from '../helpers/helpers';
import { initialGrid, letters, initialOptions } from '../helpers/data';
import GamePiece from './GamePiece';

//make sure you can't select where another ship is

const SelectBoard = ({ setSelection, handleError }) => {

    const [currentShip, setCurrentShip] = useState('')
    const [selectedShipGrid, setSelectedShipGrid] = useState(initialGrid)
    const [options, setOptions] = useState(initialOptions)
    const [shipsLocked, setShipsLocked] = useState([])


    const inOptions = (piece) => {
        const { verticalUp, verticalDown, horizontalLeft, horizontalRight } = options
        if (verticalUp.includes(piece)) {
            return verticalUp
        } else if (verticalDown.includes(piece)) {
            return verticalDown
        } else if (horizontalLeft.includes(piece)) {
            return horizontalLeft
        } else if (horizontalRight.includes(piece)) {
            return horizontalRight
        } else {
            return null
        }
    }

    const highlight = (start) => {
        let length = selectedShipGrid.find((ship) => ship.name === currentShip).length
        let centerPiece = `${start.row}${start.col}`
        let horizontalRight = generateHorizontalRight(start, length, selectedShipGrid)
        let horizontalLeft = generateHorizontalLeft(start, length, selectedShipGrid)
        let verticalUp = generateVerticalUp(start, length, selectedShipGrid)
        let verticalDown = generateVerticalDown(start, length, selectedShipGrid)

        setOptions({ horizontalLeft, horizontalRight, verticalDown, verticalUp, selectOptionMode: true, center: centerPiece })
    }

    const handleSelectedGrid = (row, col) => {
        //if selecting options for ship, highlight all possible options
        if (alreadySelected(`${row}${col}`, selectedShipGrid)) {
            handleError('That spot is taken! Choose again')
        }
        else if (!options.selectOptionMode) {
            highlight({ row, col })

        } else {
            //else if you are selected one of the 4 options, lock in ship position
            let piece = `${row}${col}`
            if (!inOptions(piece)) {
                // setOptions(initialOptions)
                highlight({ row, col })
            }
            else if (inOptions(piece)) {
                setSelectedShipGrid((prevState) => {
                    let newState = prevState.map(ship => {
                        if (ship.name === currentShip) {
                            return { ...ship, pieces: [...inOptions(piece), options.center] }
                        } else return ship
                    })
                    return newState
                })
                setOptions({ center: '', verticalUp: [], verticalDown: [], horizontalLeft: [], horizontalRight: [], selectOptionMode: false })
                setShipsLocked(prevState => [...prevState, currentShip])
                setCurrentShip('')

            }
        }

    }

    const changeSelectedShip = (selected) => {
        if (shipsLocked.includes(selected)) {
            setShipsLocked(prevState => {
                return prevState.filter(ship => ship !== selected)
            })
            setSelectedShipGrid(prevState => {
                return prevState.map((ship) => {
                    if (ship.name === selected) {
                        return { ...ship, pieces: [] }
                    }
                    else return ship
                })
            })
        }
        setCurrentShip(selected)
    }

    const shipColor = (piece) => {
        if (isShip(piece, selectedShipGrid)) { //dont want this function if currentship
            return 'rgba(200, 0, 8, 1)'
        }
        if (inOptions(piece)) {
            return 'rgba(200, 0, 8, 0.5)'
        }
        else if (piece === options.center) {
            return 'rgba(200, 0, 8, 0.9)'
        }
        else {
            return 'white'
        }
    }

    const listColor = (ship) => {
        if (ship === currentShip) {
            return 'selected'
        } else if (shipsLocked.includes(ship)) {
            return 'locked'
        } else return 'unselected'
    }

    const submitSelection = () => {
        setSelection(selectedShipGrid)
    }

    return (
        <div className="modal-container">

            <div className='select-modal'>

                <h2>Make your board</h2>
                <div>
                    <div className="select-board">
                        <div className='ship-list'>
                            <h4>Choose a ship:</h4>
                            <ul>
                                <li onClick={() => changeSelectedShip('carrier')} className={listColor('carrier')}>Carrier - 5</li>
                                <li onClick={() => changeSelectedShip('battleship')} className={listColor('battleship')}>Battleship - 4</li>
                                <li onClick={() => changeSelectedShip('cruiser')} className={listColor('cruiser')}>Cruiser - 3</li>
                                <li onClick={() => changeSelectedShip('submarine')} className={listColor('submarine')}>Submarine - 3</li>
                                <li onClick={() => changeSelectedShip('destroyer')} className={listColor('destroyer')}>Destroyer - 2</li>
                            </ul>
                        </div>

                        <div className='ship-place'>
                            <h4>Choose a position:</h4>
                            {
                                letters.map((row) => {
                                    return (
                                        <div key={uuidv4()} className="row">
                                            {
                                                letters.map((letter, i) => {
                                                    return (
                                                        <GamePiece
                                                            key={uuidv4()}
                                                            handleClick={() => currentShip && handleSelectedGrid(row, i)}
                                                            mini="mini"
                                                            bgColor={shipColor(`${row}${i}`)}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>

                                    )

                                })
                            }

                        </div>
                    </div>


                </div>
                <div className='select-buttons'>
                    <button disabled={!options.selectOptionMode} onClick={() => setOptions(initialOptions)}>
                        Cancel Selection
                    </button>
                    <button disabled={!selectedShipGrid.every((ship) => ship.pieces.length === ship.length)} onClick={submitSelection}>
                        Start Game
                    </button>
                </div>

            </div>
        </div>
    );
}

export default SelectBoard;