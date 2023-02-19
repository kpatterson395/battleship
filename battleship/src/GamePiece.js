

const GamePiece = ({ hit, ship, opponent, handleClick }) => {

    const color = () => {
        if (hit && ship) {
            return 'red'
        } else if (hit) {
            return 'black'
        } else if (ship && !opponent) {
            return 'blue'
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