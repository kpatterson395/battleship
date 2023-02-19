import { v4 as uuidv4 } from 'uuid';

const SelectBoard = () => {
    const letters = Array.from("ABCDEFGHIJ")
    const handleSelect = (piece) => {
        console.log(piece)
    }

    return (
        <div className='select-modal'>
            <h2>select board</h2>
            <div className="select-board">
                <ul>
                    <li>carrier - 5</li>
                    <li>battleship - 4</li>
                    <li>cruiser - 3</li>
                    <li>submarine - 3</li>
                    <li>destroyer - 2</li>
                </ul>
                <div>
                    {
                        letters.map((row) => {
                            return (
                                <div key={uuidv4()}>
                                    {
                                        letters.map((letter, i) => {
                                            return (
                                                <div key={uuidv4()} onClick={() => handleSelect(`${row}${i}`)} className='GamePiece mini' square={`${row}${i}`}>

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
        </div>
    );
}

export default SelectBoard;