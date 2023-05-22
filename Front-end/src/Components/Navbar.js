import React from "react"
import{Link, useLocation, useNavigate} from "react-router-dom"

// React-router-dom provides a hook useLocation that returns a object with location details including pathname ... using it we can set active state of the navbar button(links).
// We have to use useEffect hook as well to get the current location on every new render


export default function Navbar({showAlert}) {
    let location = useLocation(); 
    const navigate = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
        showAlert({msg: "Logged out !", type: "success"})
    }

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

                    {!localStorage.getItem("token") ? 
                    <form className="d-flex" role="search">
                        <Link className="btn btn-outline-primary mx-1" to="/login" role="button" >Login</Link>
                        <Link className="btn btn-outline-primary mx-1" to="/signup" role="button" >Signup</Link>
                    </form>
                    : 
                    <button className="btn btn-outline-primary mx-1" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}