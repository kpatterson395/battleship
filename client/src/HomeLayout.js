import {  NavLink, Outlet } from "react-router-dom";


const HomeLayout = () => {
    return (

           <div className="home-layout">
            <nav>
                <header>
                    <NavLink className="navbar-link" to="/battleship">Battleship</NavLink>
                </header>
                <div>
                    <NavLink className="navbar-link" to="/register">Register</NavLink>
                    <NavLink className="navbar-link" to="/login">Login</NavLink>
                    <form className="logout-form" action="/api/logout" method="POST">
                        <button className="logout-btn">Logout</button>
                    </form>
                    
                </div>

            </nav>

            <main className="main-layout">
                <Outlet />
            </main>
        </div>
  
    )
}

export default HomeLayout