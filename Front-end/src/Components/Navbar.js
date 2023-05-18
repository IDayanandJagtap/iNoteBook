import React, {useEffect} from "react"
import{Link, useLocation} from "react-router-dom"

// React-router-dom provides a hook useLocation that returns a object with location details including pathname ... using it we can set active state of the navbar button(links).
// We have to use useEffect hook as well to get the current location on every new render


export default function Navbar() {
    let location = useLocation(); 
    
    useEffect(()=>{
        //console.log(location.pathname)
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location==='/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location==='/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                        
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}