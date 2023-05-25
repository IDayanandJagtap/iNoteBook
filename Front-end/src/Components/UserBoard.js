import React, { useRef,  useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../ContextApi/userContext'
import { NoteContext } from '../ContextApi/noteContext'

const UserBoard = ({showAlert}) => {
    const {user, setUser} = useContext(UserContext)
    const {notes} = useContext(NoteContext)
    const navigate = useNavigate()
    const toggleBtn = useRef(null)
    
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userinfo")

        navigate("/login")
        showAlert({msg: "Logged out !", type: "info"})
        toggleBtn.current.click()

        setUser({ _id: "", name: "", email: "" })
    }

    useEffect(()=> {
        let name = localStorage.getItem("username")
        let email = localStorage.getItem("useremail")
        setUser({name:name, email:email})
        //eslint-disable-next-line
    }, [])

    return (
        <div>
            <button hidden className="btn btn-primary" ref={toggleBtn} type="button" id="openOffCanvas" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header d-flex align-items-center"  style={{padding: "8px 16px", borderBottom: "1px solid #b4b4b4"}}>
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Hello <br /> <p className="fs-6 fw-semibold text-secondary">{user.name}</p></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
               <div className="offcanvas-body d-flex flex-column justify-content-between mb-3" >
                    <div className="info">
                    <div className='d-flex align-items-center column-gap-3 my-1 py-2'><i className="fa-solid fa-user-tie fa-xl text-secondary"></i><div>{user.name}</div></div>
                        <div className='d-flex align-items-center column-gap-3 my-1 py-2'><i className="fa-solid fa-envelope fa-xl text-secondary"></i> <div>{user.email}</div></div>
                        <div className='d-flex align-items-center column-gap-3 my-1 py-2'><i className="fa-solid fa-newspaper fa-xl text-secondary"></i> <div>Total notes : {notes.length}</div></div>
                        <div className='d-flex align-items-center column-gap-3 my-1 py-2'><i className="fa-solid fa-folder-open fa-xl text-secondary"></i> <div>View all notes</div></div>
                    </div>
                    <div className="text-center pointer" role="button">
                        <span className="fw-semibold text-secondary" onClick={handleLogout}>Logout</span> &nbsp;<i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBoard
