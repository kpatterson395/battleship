import { Link } from "react-router-dom";

const UserModal = ({setUser}) => {
    return (
        <div className="modal-container">
            <div className='gameover-modal'>
                <h1>You're not logged in!</h1>
                <p>New User?  <Link to={'/register'}>Create an account!</Link></p>
                <p>Returning User? <Link to={'/login'}>Login</Link> </p>
                <button onClick={() => setUser('Guest')}>Play as guest</button>
            </div>
        </div>

    );
}

export default UserModal;