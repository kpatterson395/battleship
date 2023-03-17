import {  NavLink, Outlet } from "react-router-dom";


const HomeLayout = () => {
    return (

           <div className="home-layout">
            <nav>
                <header>
                    Battleship
                </header>
                <div>
                    <NavLink className="navbar-link" to="/register">Register</NavLink>
                    <NavLink className="navbar-link" to="/login">Login</NavLink>
                    <NavLink className="navbar-link" to="/logout">Logout</NavLink>
                </div>

            </nav>

            <main className="main-layout">
                <Outlet />
            </main>
        </div>
  
    )
}

export default HomeLayout