import GamePiece from './GamePiece'
import { isShip, color } from "../helpers/helpers"
import { v4 as uuidv4 } from 'uuid';
import { letters } from '../helpers/data';

const Player = ({ board }) => {

    return (
        <div>
            <h3>Player Board</h3>
            <div className='board'>
                {
                    letters.map((row) => {

                        return (
                            <div key={uuidv4()}>
                                {
                                    letters.map((letter, i) => {
                                        return (
                                            <GamePiece
                                                bgColor={color(board.hits.includes(`${row}${i}`), isShip(`${row}${i}`, board.battleships), false)}
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

export default Player;

