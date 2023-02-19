import GamePiece from './GamePiece'
import { isShip } from "./helpers"
import { v4 as uuidv4 } from 'uuid';

const letters = Array.from("ABCDEFGHIJ")

const Opponent = ({ board, addSelected }) => {

    const handleSelect = (selected, e) => {
        e.stopPropagation()
        if (board.hits.includes(selected)) {
            alert('already selected')
        } else {
            addSelected(selected)
        }
    }

    return (
        <div>
            <h3>Opponent Board</h3>
            <div className='board'>
                {
                    letters.map((row) => {

                        return (
                            <div key={uuidv4()}>
                                {
                                    letters.map((letter, i) => {
                                        return (
                                            <GamePiece
                                                handleClick={(e) => handleSelect(`${row}${i}`, e)}
                                                opponent={true}
                                                hit={board.hits.includes(`${row}${i}`)}
                                                ship={isShip(`${row}${i}`, board.battleships)}
                                                key={uuidv4()}
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

    );
}

export default Opponent;