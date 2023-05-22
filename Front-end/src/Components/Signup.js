import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = ({showAlert}) => {
    
    const formStyle = {
        backgroundColor: "#f8f9fa",
        borderRadius: "3px", 
        boxShadow:"2px 2px 3px #b7b7b7",
        border: "1px solid #e5e5e5"
    }

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    // Hook to redirect the page (react-router-dom provides it ... obviously because it handles routes)
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault()

        if(credentials.password === credentials.cpassword){

            let response = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });
            response = await response.json()
            console.log(response)
            
            if(response.success === "True"){
                localStorage.setItem("token", response.token)
                navigate("/")
                showAlert({msg: "Congratulations! account created successfully", type: "success"})
            }
            else{
                showAlert({msg: response.error, type: "danger"})
            }
        }
        else{
            showAlert({msg: "Password and confirm password should be same !", type: "danger"});
        }
    }

    return (
        <div className="my-5 d-flex justify-content-center align-items-center ">
            <div className="w-75">
            <div className='container p-3 d-flex flex-column justify-content-center align items center'>
            <h2 >Signup to iNoteBook : </h2>
                <form className='p-3 my-2' style={formStyle} onSubmit={handleOnSubmit}>
                <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name : </label>
                        <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={handleOnChange} autoFocus required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address : </label>
                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={handleOnChange}  required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password : </label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleOnChange} required minLength={5}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm password : </label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={handleOnChange} required minLength={5}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Signup
