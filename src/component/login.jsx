import React, {useState, useEffect} from "react";
import '../style/Login.scss';
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () =>{
   const initialValues = {username:"", password:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

const handleChange = (e) => {
   console.log (e.target);
   const { name, value } = e.target;
    setFormValues({...formValues, [name]: value});

    console.log(formValues);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  
    // const auth = getAuth();
    //  signInWithEmailAndPassword(auth, e.email, e.password)
    //     .then((userCredential) => {
    //     // Signed in 
    //   const user = userCredential.user;
    //  // ...
    // })
    // .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // });
    
};

useEffect (() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
    }
},[formErrors]);

const validate = (values)=>{
    const errors = {};
   //const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if(!values.username){
        errors.username = "Username is required!";
    }
    if(!values.password){
        errors.password = "Password is required!";
    }else if (values.password.length < 8)
    {
        errors.password = "Password must be more than 8 caracters";
    }

    return errors;
};
    return(

        <div>
            {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="messageSucess">Signed in successfully</div>):
            (<pre>{JSON.stringify (formValues, undefined, 2)}</pre>)}

            
            <form  onSubmit={handleSubmit}> 
            <h2 >LOG IN </h2>
            
            <div>
                <p>{ formErrors.username}</p>
                <input type="text" placeholder="enter your username, please"  name ="username" value={formValues.username} onChange={handleChange}/>
            </div>
            
            <div>
            <p>{ formErrors.password}</p>
                <input type="password" placeholder="Enter your password" name ="password"  value={formValues.password} onChange={handleChange} />
            </div>
            
            <div>
                    <button>Submit</button>
            </div>

            
            <div>
                <h4>Don't have account yet ?</h4>
                <button>Register</button>
            </div>

            </form>
            
             
        </div>
    
    );
}


