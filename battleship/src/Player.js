import GamePiece from './GamePiece'
import { isShip } from "./helpers"
import { v4 as uuidv4 } from 'uuid';
import { letters } from './data';

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

export default Player;

