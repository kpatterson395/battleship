

const GamePiece = ({ handleClick, bgColor, mini }) => {

    return (
        <div className={`GamePiece ${mini}`} style={{ backgroundColor: bgColor }} onClick={handleClick}></div>
    );
}

export default GamePiece;