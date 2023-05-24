import React from 'react'

const Alert = ({alert}) => {
    
    return (
        alert && <div className="container my-2">
            <div className={"alert alert-"+alert.type} role="alert">
               {alert.msg}
            </div>
        </div>
    )
}

export default Alert
