import GamePiece from './GamePiece'
import { isShip, color } from "../helpers/helpers"
import { v4 as uuidv4 } from 'uuid';
import { letters } from '../helpers/data';

const Opponent = ({ board, addSelected, handleError }) => {

    const handleSelect = (selected, e) => {
        e.stopPropagation()
        if (board.hits.includes(selected)) {
            handleError("You've already selected that spot, try again!")
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
                                                bgColor={color(board.hits.includes(`${row}${i}`), isShip(`${row}${i}`, board.battleships), true)}
                                                handleClick={(e) => handleSelect(`${row}${i}`, e)}
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