import React, {useState} from "react";
import '../style/Login.scss';

export const Login = () =>{
    const [state, setState] = useState({ fname: "",  password: "",   });

const handleChange = e => {
    setState ({
        //state,
         [e.target.name]: e.target.value,   })
}

   
    return(

    
        <div>
            <h2 >LOG IN </h2>
            <form>
            <div>
                <input type="text" placeholder="enter your name" value={state.fname} onChange={handleChange}/>
            </div>
            
            <div>
                <input type="password" placeholder="Enter your password"  value={state.password}/>
            </div>
            
            <div>
                    <button>Submit</button>
            </div>

            
            <div>
                <h4>Don't have account yet ?</h4>
                <button>Register</button>
            </div>

            </form>
             <h5>first : {state.fname} {state.password}</h5>
        </div>
    
    );
}
