import GameOverModal from './GameOverModal'
import UserModal from "./UserModal"
import SelectBoard from './SelectBoard'

const ModalContainer = ({user,battleships,sunkPlayerCount, sunkOppCount, setPlayerSelection, handleError, reset}) => {
    return (
        <div className="modal-container">
            {(sunkPlayerCount.length === 5 || sunkOppCount.length === 5) &&
                
                <GameOverModal sunkPlayerCount={sunkPlayerCount} reset={reset} />
            }
            {!battleships.length && user && (
                <SelectBoard setSelection={setPlayerSelection} user={user} handleError={(message) => handleError(message)} />
            )}
            {!battleships.length && !user && (
                <UserModal />
            )}
        </div>
    )
}

export default ModalContainer;