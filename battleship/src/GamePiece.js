

const GamePiece = ({ hit, ship, opponent, handleClick }) => {

    const color = () => {
        if (hit && ship) {
            //red
            return '#f21b7c'
        } else if (hit) {
            //gray
            return '#757273'
        } else if (ship && !opponent) {
            //blue
            return '#6bb5fa'
        } else {
            return 'white'
        }
    }

    return (
        <div className="GamePiece" style={{ backgroundColor: color() }} onClick={handleClick}>

        </div>
    );
}

export default GamePiece;