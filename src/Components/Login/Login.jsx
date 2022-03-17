import React, {useState, useEffect} from "react";
import './Login.scss';
import { useHistory,Link, useNavigate } from "react-router-dom";
import { db } from "../../Logic/firebase";
import { auth } from "../../Wrappers/AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function Login ()
{
   const initialValues = {username:"", password:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    const handleChange = (e) => {
   console.log (e.target);
   const { name, value } = e.target;
    setFormValues({...formValues, [name]: value});

    console.log(formValues);
    };


  const handleSubmit = (e) => 
  {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
     
    signInWithEmailAndPassword(auth, e.email, e.password)
    console.log(e.email)
    .then((userCredential) => {
    // Signed in 
    
    console.log("good");
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    });
    
};
useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("../Home/Home");
  }, [user, loading]);


//  const logInWithEmailAndPassword = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }

 
    


// useEffect (() => {
//     console.log(formErrors);
//     if(Object.keys(formErrors).length === 0 && isSubmit){
//         console.log(formValues);
//     }
// },[formErrors]);

const validate = (values)=>{
    const errors = {};
   //const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if(!values.username){
        errors.username = "Username is required!";
    }
    if(!values.password){
        errors.password = "Password is required!";
    }else if (values.password.length < 6)
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
                <Link to ="../Register/Register"><button>Register</button></Link>
            </div>

            </form>
            
             
        </div>
    
    );
}