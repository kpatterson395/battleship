const GameOverModal = ({ sunkPlayerCount, reset }) => {
    return (
        <div className="modal-container">
            <div className='gameover-modal'>
                <h2 className={sunkPlayerCount.length === 5 ? 'loser' : 'winner'}>
                    {sunkPlayerCount.length === 5 ? 'You lost...' : 'You won!'}
                </h2>
                <button onClick={reset}>Reset Game</button>
            </div>
        </div>

    );
}

export default GameOverModal;