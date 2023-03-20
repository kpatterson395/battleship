import { Link } from "react-router-dom";

const UserModal = ({setUser}) => {
    return (
        <div className="modal-container">
            <div className='gameover-modal'>
                <h1>Welcome to Battleship!</h1>
                <p>New User?  <Link to={'/register'}>Create an account!</Link></p>
                <p>Returning User? <Link to={'/login'}>Login</Link> </p>
                <button onClick={() => setUser({username: 'Guest'})}>Play as guest</button>
            </div>
        </div>

    );
}

export default UserModal;