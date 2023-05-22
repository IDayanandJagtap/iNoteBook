import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({showAlert}) => {
    
    const formStyle = {
        backgroundColor: "#f8f9fa",
        borderRadius: "3px", 
        boxShadow:"2px 2px 3px #b7b7b7",
        border: "1px solid #e5e5e5"
    }

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    // Hook to redirect the page (react-router-dom provides it ... obviously because it handles routes)
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault()

        let response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        response = await response.json()
        console.log(response)

        if(response.success === "True"){
            localStorage.setItem("token", response.token)
            navigate("/")
            showAlert({msg: "Welcome back chief !", type: "success"})
        }
        else{
            showAlert({msg: "Please enter valid credentials !", type: "danger"})
        }
    }

    return (
        <div className="my-5 d-flex justify-content-center align-items-center ">
            <div className="w-75">
            <div className='container p-3 d-flex flex-column justify-content-center align items center'>
            <h2 >Please login to continue : </h2>
                <form className='p-3 my-2' style={formStyle} onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={handleOnChange} autoFocus required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleOnChange} minLength={5}  required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Login
