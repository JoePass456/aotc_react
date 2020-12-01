import React from 'react'

function Logout() {

    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("token");


    return (
        <div>
            <h3>You are now logged out</h3>
        </div>
    )
}

export default Logout
