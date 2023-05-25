import { createContext, useState } from "react";

export const UserContext = createContext()


export const UserState = (props) => {
    const [user, setUser] = useState({ _id: "", name: "", email: "" })

    // Fetch current user 
    const fetchUser = async () => {
        // API call 

        try {
            let response = await fetch("http://localhost:8000/api/auth/getuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                }
            })
            response = await response.json()
            // Storing values in state variable is expected but the state variable resets after a page refresh,
            // We'll use localStorage with state to store the info 
            if (response.success === "True") {
                setUser({ _id: response.user._id, name: response.user.name, email: response.user.email })
                localStorage.setItem("username", response.user.name)
                localStorage.setItem("useremail", response.user.email)
            }

        } catch (err) {
            console.log("Error while fetching user info : ", err.message)
        }
    }

    return (
        <UserContext.Provider value={{ fetchUser, user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}