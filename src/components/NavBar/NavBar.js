import React from 'react'
import {Link} from "react-router-dom"

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/games">Games</Link>                        
                        <Link className="nav-link active" aria-current="page" to="/genres">Genres</Link>
                        
                        
                        
                    </div>
                </div>
                <h1>Video-Game-Index-App</h1>
            </div>
            
        </nav>
    )
}

export default NavBar;
