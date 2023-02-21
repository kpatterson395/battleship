import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isShip } from './helpers';

const initialGrid = [
    { name: 'carrier', pieces: [], length: 5, completed: false, damage: 0 },
    { name: 'battleship', pieces: [], length: 4, completed: false, damage: 0 },
    { name: 'cruiser', pieces: [], length: 3, completed: false, damage: 0 },
    { name: 'submarine', pieces: [], length: 3, completed: false, damage: 0 },
    { name: 'destroyer', pieces: [], length: 2, completed: false, damage: 0 }
]


//make sure you can't select where another ship is

// vertical and horizontal can be -1 for other direction
const SelectBoard = ({ setSelection }) => {
    const letters = Array.from("ABCDEFGHIJ")
    const initialOptions = { center: '', verticalUp: [], verticalDown: [], horizontalLeft: [], horizontalRight: [], selectOptionMode: false }

    const [currentShip, setCurrentShip] = useState('')
    const [selectedShipGrid, setSelectedShipGrid] = useState(initialGrid)
    const [options, setOptions] = useState(initialOptions)
    const [shipsLocked, setShipsLocked] = useState([])

    const inOptions = (piece) => {
        if (options.verticalUp.includes(piece)) {
            return options.verticalUp
        } else if (options.verticalDown.includes(piece)) {
            return options.verticalDown
        } else if (options.horizontalLeft.includes(piece)) {
            return options.horizontalLeft
        } else if (options.horizontalRight.includes(piece)) {
            return options.horizontalRight
        } else {
            return null
        }

    }

    const alreadySelected = (piece) => {
        let includes = false
        selectedShipGrid.forEach((ship) => {
            if (ship.pieces.includes(piece)) {
                includes = true
            }
        })
        return includes
    }


    const highlight = (start) => {
        let length = selectedShipGrid.find((ship) => ship.name === currentShip).length
        let centerPiece = `${start.row}${start.col}`
        let options = { ...initialOptions, selectOptionMode: true, center: centerPiece }
        if ((start.col + length - 1) <= 9) {
            for (let i = 1; i < length; i++) {
                let newCol = start.col + i
                options.horizontalRight.push(start.row + newCol)
            }
            if (options.horizontalRight.some((piece) => alreadySelected(piece))) {
                options.horizontalRight = []
            }
        }
        if ((start.col - length + 1) >= 0) {
            for (let i = start.col - 1; i > start.col - (length); i--) {
                options.horizontalLeft.push(start.row + i)
            }
            if (options.horizontalLeft.some((piece) => alreadySelected(piece))) {
                options.horizontalLeft = []
            }
        }
        let starting = letters.indexOf(start.row)
        if ((starting + length - 1) <= 9) {
            for (let i = starting + 1; i < length + starting; i++) {
                options.verticalUp.push(letters[i] + start.col)
            }
            if (options.verticalUp.some((piece) => alreadySelected(piece))) {
                options.verticalUp = []
            }
        }
        if ((starting - length + 1) >= 0) {
            for (let i = starting - 1; i > starting - length; i--) {
                options.verticalDown.push(letters[i] + start.col)
            }
            if (options.verticalDown.some((piece) => alreadySelected(piece))) {
                options.verticalDown = []
            }
        }
        setOptions(options)
    }

    const handleSelectedGrid = (row, col) => {
        //if selecting options for ship, highlight all possible options
        if (alreadySelected(`${row}${col}`)) {
            alert('That spot is taken! Choose again')
        }
        else if (!options.selectOptionMode) {
            highlight({ row, col })
        } else {
            //else if you are selected one of the 4 options, lock in ship position
            let piece = `${row}${col}`
            if (inOptions(piece)) {
                setSelectedShipGrid((prevState) => {
                    let newState = prevState.map(ship => {
                        if (ship.name === currentShip) {
                            return { ...ship, pieces: [...inOptions(piece), options.center] }
                        } else return ship
                    })
                    return newState
                })
                setOptions(initialOptions)
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
        if (inOptions(piece) || piece == options.center) {
            return 'rgba(200, 0, 8, 0.5)'
        } else {
            return 'white'
        }
    }

    const listColor = (ship) => {
        if (ship === currentShip) {
            return 'selected'
        } else if (shipsLocked.includes(ship)) {
            return 'locked'
        } else return ''
    }

    const submitSelection = () => {
        if (selectedShipGrid.every((ship) => ship.pieces.length === ship.length)) {
            setSelection(selectedShipGrid)
        } else {
            alert('Please add all ships before locking in')
        }
    }

    return (
        <div className='select-modal'>
            <h2>select board</h2>
            <div className="select-board">
                <ul>
                    <li onClick={() => changeSelectedShip('carrier')} className={listColor('carrier')}>carrier - 5</li>
                    <li onClick={() => changeSelectedShip('battleship')} className={listColor('battleship')}>battleship - 4</li>
                    <li onClick={() => changeSelectedShip('cruiser')} className={listColor('cruiser')}>cruiser - 3</li>
                    <li onClick={() => changeSelectedShip('submarine')} className={listColor('submarine')}>submarine - 3</li>
                    <li onClick={() => changeSelectedShip('destroyer')} className={listColor('destroyer')}>destroyer - 2</li>
                </ul>
                <div>
                    {
                        letters.map((row) => {
                            return (
                                <div key={uuidv4()}>
                                    {
                                        letters.map((letter, i) => {
                                            return (
                                                <div
                                                    key={uuidv4()}
                                                    onClick={() => currentShip && handleSelectedGrid(row, i)}
                                                    className={`GamePiece mini`}
                                                    style={{ backgroundColor: shipColor(`${row}${i}`) }}
                                                >
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            )

                        })
                    }
                </div>
            </div>
            <button disabled={!options.selectOptionMode} onClick={() => setOptions(initialOptions)}>
                Cancel Selection
            </button>
            <button disabled={!selectedShipGrid.every((ship) => ship.pieces.length === ship.length)} onClick={submitSelection}>
                Lock in selection
            </button>
        </div >
    );
}

export default SelectBoard;