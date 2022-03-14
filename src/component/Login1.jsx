import { Register } from "./Register"
import React from "react"
import { Main } from "./Main"

export const Login1 = (props) => {
    return (
        <>
        <h1>Log in</h1>

        <div>
            <input type="text" id="username"/>
            <input type="text" id="password"/>
            <button id="login">Log In </button>

        </div>
            
        <div>
            <h4>Don't have an account yet?</h4>
            <button onClick={Register}>Register</button>

            <Main yyny= "juan"/>
        </div>
        </>

    )
}