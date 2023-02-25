const Error = ({ message, display }) => {
    return (
        <div className={`error-popup ${display}`}>
            <h5>{message}</h5>
        </div>
    );
}

export default Error;