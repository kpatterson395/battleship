const PlayerStats = ({user}) => {

  
    return (
        <div className="PlayerStats">
            <h3>{`${user.username}'s Stats:`}</h3>
            <p>Games Won: {user.won}</p>
            <p>Games Lost: {user.lost}</p>
        </div>
    )
}

export default PlayerStats